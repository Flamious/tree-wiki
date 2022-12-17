import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/objects/character';
import { CharacterConnection } from 'src/app/objects/character-connection';
import { Connection } from '../../../objects/connection';


@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent {
  get availableCharacters() {
    let characters: Character[] = [];
    this.characters.map(c => {
      if(c.id === this.selectedCharacter.id) {
        return;
      }

      if(!this.selectedCharacterConnections.find(cn => cn.connectionWith.id === c.id)) {
        characters.push(c);
      }
    })

    return characters;
  }
    @Input() selectedCharacter: Character;
    @Input() characters: Character[];
    @Input() selectedCharacterConnections: CharacterConnection[];
    @Output() admit = new EventEmitter<Connection>();
    @Output() close = new EventEmitter();

    characterTo: Character = null;
    title: string = '';

    onAdmit() {
      this.admit.emit(new Connection(null, this.selectedCharacter.id, this.characterTo.id, this.title));
      this.close.emit();
    }

    onClose() {
      this.close.emit();
    }
}
