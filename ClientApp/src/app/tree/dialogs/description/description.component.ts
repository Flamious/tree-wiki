import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/objects/character';
import { CharacterConnection } from 'src/app/objects/character-connection';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
    @Input() character: Character;
    @Input() connections: CharacterConnection[];
    @Output() close = new EventEmitter();
    
    onClose() {
      this.close.emit();
    }
}
