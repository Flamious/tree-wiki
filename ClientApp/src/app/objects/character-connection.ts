import { Character } from "./character";
import { Connection } from "./connection";

export class CharacterConnection {
    id: string;
    connectionWith: Character;
    connection: Connection

    constructor(id: string, connectionWith: Character, connection: Connection) {
        this.id = id;
        this.connectionWith = connectionWith;
        this.connection = connection;
    }
}