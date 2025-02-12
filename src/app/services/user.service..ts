import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

const users: User[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    roles: ["subscriber"],
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    roles: ["subscriber"],
  },
  {
    _id: "3",
    firstName: "William",
    lastName: "Johnson",
    email: "williamjohnson@example.com",
    roles: ["subscriber"],
  },
];

@Injectable({ providedIn: "root" })
export class UserService {
  users = signal(users);

  constructor(private httpClient: HttpClient) {}

  findUserByEmail(email: string): User | undefined {
    return users.find((user) => user.email === email);
  }
}
