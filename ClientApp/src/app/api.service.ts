// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http"
// import { of, Observable } from "rxjs";
// import { catchError, map } from "rxjs/operators";
// import { Character } from "./tree/character/character";

// @Injectable()
// export class ApiService {
//     private url = "http://localhost:5000";

//     constructor(private http: HttpClient) { }

//     getCharacters(): Observable<Character[] | undefined> {
//         return this.http.get(`${this.url}/character`).pipe(map((data: any) => {
//             let toDoList = data;
            
//             return toDoList.map(function (c: any): Character {
//                 return new Character(c.id, c.name, c.imageSrc, c.nickname, c.description, c.shortDescription);
//             });
//         }),
//         catchError(err => {
//             console.log(err);
//             return of(undefined);
//         }))
//     }
// }