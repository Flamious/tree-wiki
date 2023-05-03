export class Work {
    id: string;
    title: string;
    next: string;
    previous: string;

    constructor(
        id: string,
        title: string,
        next: string,
        previous: string
    ) {
        this.id = id;
        this.title = title;
        this.next = next;
        this.previous = previous;
    }
}