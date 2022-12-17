export class NewCharacter {
    characterName: string;
    description: string;
    file: any;

    constructor(
        characterName: string,
        description: string,
        file: string,
    ) {
        this.characterName = characterName;
        this.description = description;
        this.file = file;
    }
}