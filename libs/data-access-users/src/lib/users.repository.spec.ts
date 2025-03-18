import { TestBed } from '@angular/core/testing';
import { UsersRepository } from './users.repository';
import { firstValueFrom } from 'rxjs';
import '@angular/compiler';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersRepository]
    });
    repository = TestBed.inject(UsersRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return mock users', async () => {
    const users = await firstValueFrom(repository.getUsers());

    expect(users).toHaveLength(2);
    expect(users[0].id).toBe('1');
    expect(users[0].name).toBe('John Doe');
    expect(users[0].email).toBe('john.doe@example.com');
    expect(users[0].active).toBe(true);
    
    expect(users[1].id).toBe('2');
    expect(users[1].name).toBe('Jane Doe');
    expect(users[1].email).toBe('jane.doe@example.com');
    expect(users[1].active).toBe(false);
  });

  it('should return an Observable of User[]', () => {
    const usersObservable = repository.getUsers();
    expect(usersObservable).toBeTruthy();
    
    // Subscribe to verify the type
    usersObservable.subscribe(users => {
      expect(Array.isArray(users)).toBe(true);
      if (users.length > 0) {
        const user = users[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('active');
      }
    });
  });
}); 