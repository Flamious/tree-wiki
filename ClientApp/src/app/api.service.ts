import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { of, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Character } from "./objects/character";
import { Connection } from "./objects/connection";
import { Work } from "./objects/work";

export const url = "https://localhost:44390"

@Injectable()
export class ApiService {
    private url = url;
    constructor(private http: HttpClient) { }

    getCharacters(work: string): Observable<Character[] | undefined> {
        return this.http.get(`${this.url}/character/${work}`).pipe(map((data: any) => {
            let characters = data;
            
            return characters.map(function (c: any): Character {
                return new Character(
                    c.id, c.name, 
                    url + '/Images/' + c.imageSrc, 
                    c.nickname, 
                    c.description, 
                    c.shortDescription, 
                    c.x, 
                    c.y
                );
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    changeCharacterPosition(id: string, x: number, y: number): void {
       this.http.put(`${this.url}/character/${id}/position?x=${x}&y=${y}`, {}).subscribe();
    }

    addCharacter(file: any, name: string, description: string, x: number, y: number, work: string): Observable<Character[] | undefined> {
        const formData = new FormData();
        formData.append('imageFile', file, file.name);
        formData.append('name', name);
        formData.append('shortDescription', description);
        formData.append('x', `${x}`);
        formData.append('y', `${y}`);

        return this.http.post(`${this.url}/character/${work}`, formData).pipe(map((data: any) => {
            let characters = data;
            
            return characters.map(function (c: any): Character {
                return new Character(
                    c.id, c.name, 
                    url + '/Images/' + c.imageSrc, 
                    c.nickname, 
                    c.description, 
                    c.shortDescription, 
                    c.x, 
                    c.y
                );
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    deleteCharacter(id: string, work: string): Observable<Character[] | undefined> {
        return this.http.delete(`${this.url}/character/${work}/${id}`).pipe(map((data: any) => {
            let characters = data;
            
            return characters.map(function (c: any): Character {
                return new Character(
                    c.id, c.name, 
                    url + '/Images/' + c.imageSrc, 
                    c.nickname, 
                    c.description, 
                    c.shortDescription, 
                    c.x, 
                    c.y
                );
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    getConnections(work: string): Observable<Connection[] | undefined> {
        return this.http.get(`${this.url}/connection/${work}`).pipe(map((data: any) => {
            let connections = data;
            
            return connections.map(function (c: any): Connection {
                return new Connection(c.id, c.from, c.to, c.title);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    addConnection(connection: Connection, work: string): Observable<Connection[] | undefined> {
        const from = `from=${connection.from}`;
        const to = `to=${connection.to}`;
        const title = `title=${connection.title}`;
        return this.http.post(`${this.url}/connection/${work}?${from}&${to}&${title}`, {}).pipe(map((data: any) => {
            let connections = data;
            
            return connections.map(function (c: any): Connection {
                return new Connection(c.id, c.from, c.to, c.title);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    deleteConnection(id: string, work: string): Observable<Connection[] | undefined> {
        return this.http.delete(`${this.url}/connection/${work}/${id}`).pipe(map((data: any) => {
            let connections = data;
            
            return connections.map(function (c: any): Connection {
                return new Connection(c.id, c.from, c.to, c.title);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    getWorks(): Observable<Work[] | undefined> {
        return this.http.get(`${this.url}/work`).pipe(map((data: any) => {
            let works = data;
            
            return works.map(function (c: any): Work {
                return new Work(c.id, c.title, c.next, c.previous);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    addWork(title: string): Observable<Work[] | undefined> {
        return this.http.post(`${this.url}/work?title=${title}`, {}).pipe(map((data: any) => {
            let works = data;
            
            return works.map(function (c: any): Work {
                return new Work(c.id, c.title, c.next, c.previous);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }

    deleteWork(id: string): Observable<Work[] | undefined> {
        return this.http.delete(`${this.url}/work/${id}`).pipe(map((data: any) => {
            let works = data;
            
            return works.map(function (c: any): Work {
                return new Work(c.id, c.title, c.next, c.previous);
            });
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        }))
    }
}