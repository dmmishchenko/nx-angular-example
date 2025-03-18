import { delay, Observable, of } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  getUsers(): Observable<User[]> {
    return getMockUsers();
  }
}

function getMockUsers(): Observable<User[]> {
  return of([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', active: true },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', active: false },
  ]).pipe(delay(2000));
}
