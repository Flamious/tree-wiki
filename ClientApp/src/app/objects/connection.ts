import { Character } from "./character";

export class Connection {
    from: string;
    to: string;
    title: string;

    constructor(
        from: Character,
        to: Character,
        title: string
    ) {
        this.from = from.id;
        this.to = to.id;
        this.title = title;
    }
}