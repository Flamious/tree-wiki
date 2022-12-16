import { Character } from "./character";
import { Connection } from "./connection";

export class CharacterConnection {
    connectionWith: Character;
    connection: Connection

    constructor(connectionWith: Character, connection: Connection) {
        this.connectionWith = connectionWith;
        this.connection = connection;
    }
}