import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { Character } from './character/character';
import { CharacterComponent } from './character/character.component';
import { Connection } from './connection/connection';
import 'leader-line';
declare var LeaderLine: any;

@Component({
  selector: 'tree-wiki',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit {
  @ViewChildren(CharacterComponent) characterCards: QueryList<CharacterComponent>;
  position: { x: number, y: number } = { x: 0, y: 0 };
  lines: any[] = [];
  selectedCharacter: Character = null;
  characters: Character[] = [
    new Character(
      '1', 'name-1csocdojcoisdjciosdjcojdiosj',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-1', 'ss',
      's',
      500, 0
    ),
    new Character(
      '21', 'name-2',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-2', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 500, 500
    ),
    new Character(
      '12', 'name-3',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
      'nick-3', 'kdjndksvndksnvdskjnsdnvkjn', 'dsiojcdiojcdoidsj', 50, 500
    )];
  connections: Connection[] = [new Connection(
    this.characters[0],
    this.characters[2],
    'check'
  ), new Connection(
    this.characters[1],
    this.characters[2],
    'check2'
  )];

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
  }

  unselectCharacter() {
    this.selectedCharacter = null;
  }


  ngAfterViewInit(): void {
    this.connections.forEach((connection, connectionIndex) => {
      let from: CharacterComponent = null;
      let to: CharacterComponent = null;

      this.characterCards.forEach((card, cardIndex)=> {
        if(card.character.id === connection.from) {
          from = card;
        }

        if(card.character.id === connection.to) {
          to = card;
        }
      })
      console.log(from.cardElement.nativeElement, to.cardElement.nativeElement);
      const line = new LeaderLine(
        from.cardElement.nativeElement,
        to.cardElement.nativeElement, 
        { 
          color: 'black', 
          size: 2,
          startPlug: 'behind',
          endPlug: 'behind'
        }
      );
      this.lines.push(line);
      console.log(line);
    });
  }

  onCharacterCardDrag(cardInfo: { id: string, x: number, y: number }) {
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

    console.log('parent x: ' + x, 'parent y ' + y)

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
}
