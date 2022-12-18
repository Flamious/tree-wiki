import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { Connection } from '../objects/connection';
import 'leader-line';
import { Character } from '../objects/character';
import { CharacterConnection } from '../objects/character-connection';
import { ApiService } from '../api.service';
import { NewCharacter } from '../objects/new-character';
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
  selectedCharacter: Character = null;
  selectedCharacterConnections: CharacterConnection[] = null;
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
    this.apiService.getCharacters().subscribe((result) => {
      if(result !== undefined) {
        this.characters = result;
        this.apiService.getConnections().subscribe((result) => {
          if(result !== undefined) {
            this.connections = result;
            this.buildLines();
          }
        });
      }
    });

    this.characterCards.changes.subscribe(_ => {
      this.buildLines();
    })
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
    this.apiService.addConnection(connection).subscribe((result) => {
      if(result !== undefined) {
        this.connections = result;
        this.buildLines();
        this.setSeletedCharacterConnections();
      }
    });
  }

  deleteConnection(connection: CharacterConnection) {
    this.apiService.deleteConnection(connection.id).subscribe((result) => {
      if(result !== undefined) {
        this.connections = result;
        this.buildLines();
        this.setSeletedCharacterConnections();
      }
    });
  }

  addCharacter(character: NewCharacter) {
    this.apiService.addCharacter(
        character.file, 
        character.characterName, 
        character.description, 
        2500 - this.position.x,
        2500 - this.position.y
      ).subscribe((result) => {
      if(result !== undefined) {
        this.characters = result;
      }
    });
  }

  deleteCharacter(character: Character) {
    this.selectedCharacter = null;
    this.selectedCharacterConnections = [];

  this.apiService.deleteCharacter(character.id).subscribe((char_result) => {
      if(char_result !== undefined) {
        this.selectedCharacterConnections = [];
        this.apiService.getConnections().subscribe((result) => {
          if(result !== undefined) {

            this.connections = result;
            this.characters = char_result;
          }
        });
      }
    });
  }
}
