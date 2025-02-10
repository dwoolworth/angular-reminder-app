
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const data = {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "Admin"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "role": "User"
      },
      {
        "id": 3,
        "name": "William Johnson",
        "email": "williamjohnson@example.com",
        "role": "User"
      },
      {
        "id": 4,
        "name": "Alicia Brown",
        "email": "aliciabrown@example.com",
        "role": "User"
      },
      {
        "id": 5,
        "name": "Ethan Davis",
        "email": "ethandavis@example.com",
        "role": "Admin"
      }
    ]
  }

@Injectable({providedIn: 'root'})
export class UserService {

    users = signal(data.users);

    constructor(private httpClient: HttpClient) { }
}