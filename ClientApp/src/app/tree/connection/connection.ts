import { Character } from "../character/character";

export class Connection {
    from: string;
    to: string;
    title: string;
    xfrom: number;
    yfrom: number;
    xto: number;
    yto: number;

    constructor(
        from: Character,
        to: Character,
        title: string
    ) {
        this.from = from.id;
        this.to = to.id;
        this.title = title;
        this.xfrom = from.x;
        this.yfrom = from.y;
        this.xto = to.x;
        this.yto = to.y;
    }
}