import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { Connection } from '../objects/connection';
import 'leader-line';
import { Character } from '../objects/character';
import { CharacterConnection } from '../objects/character-connection';
import { ApiService } from '../api.service';
import { NewCharacter } from '../objects/new-character';
import { Work } from '../objects/work';
declare var LeaderLine: any;

@Component({
  selector: 'tree-wiki',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit {

  @ViewChildren(CharacterComponent) characterCards: QueryList<CharacterComponent>;
  position: { x: number, y: number } = { x: 0, y: 0 };
  isCharacterInfoOpened: boolean = false;
  isNewConnectionOpened: boolean = false;
  isNewCharacterOpened: boolean = false;
  lines: any[] = [];
  selectedWork: Work = null;
  selectedCharacter: Character = null;
  selectedCharacterConnections: CharacterConnection[] = null;
  works: Work[] = [];
  connections: Connection[] = [];
  characters: Character[] = [];
  
  constructor(private apiService: ApiService) { }
  selectCharacter(character: Character) {
    if (this.selectedCharacter && this.selectedCharacter.id === character.id) {
      this.unselectCharacter();
      return;
    }

    this.selectedCharacter = character;

    this.setSeletedCharacterConnections();

    this.buildLines();
  }

  unselectCharacter() {
    this.selectedCharacter = null;
    this.selectedCharacterConnections = null;

    this.buildLines();
  }

  openCharacterInfo() {
    this.isCharacterInfoOpened = true;
  }

  closeCharacterInfo() {
    this.isCharacterInfoOpened = false;
  }

  openAddNewConnection() {
    this.isNewConnectionOpened = true;
  }

  closeAddNewConnection() {
    this.isNewConnectionOpened = false;
  }

  openAddNewCharacter() {
    this.isNewCharacterOpened = true;
  }

  closeAddNewCharacter() {
    this.isNewCharacterOpened = false;
  }

  buildLines() {
    this.lines.forEach((line) => {
      line.remove();
    })
    this.lines = [];
    const selectedCharacterId = this.selectedCharacter ? this.selectedCharacter.id : null;

    if (selectedCharacterId) {
      this.connections.sort((a, b) => {
        return a.from === selectedCharacterId ? 1 : -1;
      })
    }
    this.connections.forEach((connection, connectionIndex) => {
      let from: CharacterComponent = null;
      let to: CharacterComponent = null;
      const selected: boolean = connection.from === selectedCharacterId;

      this.characterCards.forEach((card, cardIndex) => {
        if (card.character.id === connection.from) {
          from = card;
        }

        if (card.character.id === connection.to) {
          to = card;
        }
      })

      const line = new LeaderLine(
        from.cardElement.nativeElement,
        to.cardElement.nativeElement,
        {
          color: selected ? 'black' : 'lightgray',
          outlineColor: 'white',
          outlineSize: 1,
          size: 4,
          startPlug: 'behind',
          endPlug: selected ? 'arrow3' : 'behind',
          middleLabel: selected ? connection.title : false
        }
      );

      line.outline = true
      this.lines.push(line);
    });
  }

  ngAfterViewInit(): void {
    this.apiService.getWorks().subscribe((result) => {
      if(result !== undefined) {
        this.works = result;
        if(result.length > 0) {
          this.selectedWork = this.works[0];
          this.selectWork(this.selectedWork);
        }
      }
    });

    this.characterCards.changes.subscribe(_ => {
      this.buildLines();
    })
  }

  selectWork(work: Work) {
    if (!work) {
      this.connections = [];
      this.selectedCharacter = null;
      this.characters = [];
      return;
    }

    this.apiService.getCharacters(work.id).subscribe((result) => {
      if(result !== undefined) {
        this.apiService.getConnections(work.id).subscribe((connections) => {
          if(connections !== undefined) {
            this.connections = connections;
            this.selectedCharacter = null;
            this.characters = result;
          }
        });
      }
    });
  }

  onCharacterCardDrag() {
    this.lines.forEach((element, index) => {
      element.position();
    });
  }

  onDragMoved(event: any) {
    this.lines.forEach((element, index) => {
      element.position();
    });
  }

  onDragEnded(event: any) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);

    let x = (boundingClientRect.x - parentPosition.left);
    let y = (boundingClientRect.y - parentPosition.top);

    this.position.x = x;
    this.position.y = y;

    this.lines.forEach((element, index) => {
      element.position();
    });
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  isSelected(id: string) {
    return this.selectedCharacter ? this.selectedCharacter.id === id : false;
  }

  setSeletedCharacterConnections() {
    this.selectedCharacterConnections = [];

    this.connections.map(c => {
      if (c.from === this.selectedCharacter.id) {
        this.selectedCharacterConnections.push(new CharacterConnection(c.id, this.characters.find(x => x.id === c.to), c));
      }
    });
  }

  addConnection(connection: Connection) {
    this.apiService.addConnection(connection, this.selectedWork.id).subscribe((result) => {
      if(result !== undefined) {
        this.connections = result;
        this.buildLines();
        this.setSeletedCharacterConnections();
      }
    });
  }

  deleteConnection(connection: CharacterConnection) {
    if (confirm('Удалить выбранную связь?')) {
      this.apiService.deleteConnection(connection.id, this.selectedWork.id).subscribe((result) => {
        if(result !== undefined) {
          this.connections = result;
          this.buildLines();
          this.setSeletedCharacterConnections();
        }
      });
    }
  }

  addCharacter(character: NewCharacter) {
    this.apiService.addCharacter(
        character.file, 
        character.characterName, 
        character.description, 
        2500 - this.position.x,
        2500 - this.position.y,
        this.selectedWork.id
      ).subscribe((result) => {
      if(result !== undefined) {
        this.characters = result;
      }
    });
  }

  deleteCharacter(character: Character) {
    if (confirm('Удалить выбранного персонажа?')) {
      this.selectedCharacter = null;
      this.selectedCharacterConnections = [];
  
      this.apiService.deleteCharacter(character.id, this.selectedWork.id).subscribe((char_result) => {
          if(char_result !== undefined) {
            this.selectedCharacterConnections = [];
            this.apiService.getConnections(this.selectedWork.id).subscribe((result) => {
              if(result !== undefined) {
  
                this.connections = result;
                this.characters = char_result;
              }
            });
          }
      });
    }
  }

  openNextWork() {
    if (this.works.length === 0) {
      return;
    }

    let index = this.works.findIndex(w => this.selectedWork.id === w.id);
    if (index !== -1 && index < this.works.length - 1) {
      this.selectedWork = this.works[index + 1];
      this.selectWork(this.selectedWork);
    }
  }

  openPreviousWork() {
    if (this.works.length === 0) {
      return;
    }

    let index = this.works.findIndex(w => this.selectedWork.id === w.id);
    if (index !== -1 && index > 0) {
      this.selectedWork = this.works[index - 1];
      this.selectWork(this.selectedWork);
    }
  }

  addWork() {
    var title = prompt('Введите название нового дерева', '');
    if(title) {
      this.apiService.addWork(title).subscribe((result) => {
        if(result !== undefined) {
          this.works = result;
          if(result.length > 0) {
            this.selectedWork = this.works[this.works.length - 1];
            this.selectWork(this.selectedWork);
          }
        }
      });
    }
  }

  deleteWork() {
    if(!this.selectedWork) {
      return;
    }

    if (confirm('Удалить текущее дерево?')) {
      this.apiService.deleteWork(this.selectedWork.id).subscribe((result) => {
        if(result !== undefined) {
          this.works = result;
          if(result.length > 0) {
            this.selectedWork = this.works[0];
            this.selectWork(this.selectedWork);
          } else {
            this.selectedWork = null;
            this.selectWork(null);
          }
        }
      });
    }
  }

  isNextAvailable() {
    if (this.works.length === 0) {
      return false;
    }

    let index = this.works.findIndex(w => this.selectedWork.id === w.id);
    return index !== -1 && index < this.works.length - 1;
  }

  isPreviousAvailable() {
    if (this.works.length === 0) {
      return false;
    }

    let index = this.works.findIndex(w => this.selectedWork.id === w.id);
    return index !== -1 && index > 0;
  }
}
