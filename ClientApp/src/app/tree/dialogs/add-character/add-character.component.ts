import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/objects/character';
import { CharacterConnection } from 'src/app/objects/character-connection';
import { NewCharacter } from 'src/app/objects/new-character';
import { Connection } from '../../../objects/connection';


@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent {
  @Input() selectedCharacter: Character;
    @Output() close = new EventEmitter();
    @Output() admit = new EventEmitter<NewCharacter>();

    characterName: string = null;
    description: string = '';
    file: any = null;
    fileUrl: any = null;

    onAdmit() {
      this.admit.emit(new NewCharacter(this.characterName, this.description, this.file));
      this.close.emit();
    }

    onClose() {
      this.close.emit();
    }

    onUpload(event: any, fileUpload: any) {
      this.file = event.files[0];
      fileUpload.clear();

      let reader = new FileReader();
      reader.readAsDataURL(this.file);

      reader.onload = (_) => {
        this.fileUrl = reader.result;
      }
    }
}
