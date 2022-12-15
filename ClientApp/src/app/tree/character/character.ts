export class Character {
    id: string;
    name: string;
    imageSrc: string;
    nickname: string;
    description: string;
    shortDescription: string;
    x: number;
    y: number;

    constructor(id: string, name: string, imageSrc: string, nickname: string, description: string, shortDescription: string, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.imageSrc = imageSrc;
        this.nickname = nickname;
        this.description = description;
        this.shortDescription = shortDescription;
        this.x = x;
        this.y = y;
    }
}