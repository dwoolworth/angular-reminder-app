import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";

export interface UserResponse {
  users: User[];
}

@Injectable({ providedIn: "root" })
export class UserService {
  users = signal([] as User[]);

  constructor(private httpClient: HttpClient) {}

  findUserByEmail(email: string): User | undefined {
    return undefined;
  }

  create(user: User) {
    return this.httpClient.post("user", user);
  }

  findAll(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`user`);
  }

  findUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`user/${id}`);
  }

  update(user: User) {
    return this.httpClient.put(`user/${user._id}`, user);
  }

  delete(id: string) {
    return this.httpClient.delete(`user/${id}`);
  }

  loadAllUsers() {
    this.findAll().subscribe((data) => {
      this.users.set(data.users);
    })
  }
}
