import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { Connection } from '../objects/connection';
import 'leader-line';
import { Character } from '../objects/character';
import { CharacterConnection } from '../objects/character-connection';
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
  lines: any[] = [];
  selectedCharacter: Character = null;
  selectedCharacterConnections: CharacterConnection[] = null;
  characters: Character[] = [
    new Character(
      '1', 'name-1csocdojcoisdjciosdjcojdiosj',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-1', 'ss',
      's',
      500 + 2500, 0 + 2500
    ),
    new Character(
      '21', 'name-2',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-2', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 500 + 2500, 500 + 2500
    ),
    new Character(
      '12', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj\n\n\n\n\n\n\n\n\n\n\n\ndsiojcdiojcdoidsjdsiojcdiojcdoidsj\n\n\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj\ndsiojcdiojcdoidsj', 50 + 2500, 500 + 2500
    ),
    new Character(
      '1233', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 100 + 2500, 200 + 2500
    ),
    new Character(
      '1244', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 200 + 2500, 100 + 2500
    ),
    new Character(
      '1255', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 300 + 2500, 300 + 2500
    ),
    new Character(
      '1266', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 600 + 2500, 800 + 2500
    )];
  connections: Connection[] = [new Connection(
    this.characters[2],
    this.characters[0],
    'check'
  ), new Connection(
    this.characters[2],
    this.characters[1],
    'check2'
  ), new Connection(
    this.characters[2],
    this.characters[3],
    'check2'
  ), new Connection(
    this.characters[2],
    this.characters[4],
    'check2'
  ), new Connection(
    this.characters[2],
    this.characters[5],
    'check2'
  ), new Connection(
    this.characters[2],
    this.characters[6],
    'check2'
  ), new Connection(
    this.characters[0],
    this.characters[3],
    'check2'
  ), new Connection(
    this.characters[3],
    this.characters[0],
    'check2'
  )];

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
    this.buildLines();
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
        this.selectedCharacterConnections.push(new CharacterConnection(this.characters.find(x => x.id === c.to), c));
      }
    });
  }

  addConnection(connection: Connection) {
    this.connections.push(connection);
    this.setSeletedCharacterConnections();
    
    this.buildLines();
  }
}
