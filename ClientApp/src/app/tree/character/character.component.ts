import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Character } from 'src/app/objects/character';

@Component({
  selector: 'character-card',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {
  @Input() character: Character;
  @Input() parentPosition: {x: number, y: number};
  @Input() selected: boolean = false;
  @Output() choose = new EventEmitter<Character>();
  @Output() drag = new EventEmitter();

  dragging: boolean = false;
  @ViewChild('characterCard', {read: ElementRef}) cardElement: ElementRef;
  
  public handleDragStart(): void {
    this.dragging = true;
  }
  
  onClick() {
    if (this.dragging) {
      this.dragging = false;
      return
    }
    
    this.choose.emit(this.character);
  }

  onDragMoved(event: any) {
    this.drag.emit();
  }

  onDragEnded(event: any) {
    const element = event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    const parentPosition = this.getPosition(element);

    const x = (boundingClientRect.x - parentPosition.left - this.parentPosition.x);
    const y = (boundingClientRect.y - parentPosition.top - this.parentPosition.y);

    this.character.x += Math.floor(x);
    this.character.y += Math.floor(y);

    event.source._dragRef.reset();
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }
}
