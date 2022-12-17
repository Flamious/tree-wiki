import { Character } from "./character";

export class Connection {
    id: string;
    from: string;
    to: string;
    title: string;

    constructor(
        id: string,
        from: string,
        to: string,
        title: string
    ) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.title = title;
    }
}