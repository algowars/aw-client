import { TestBed } from '@angular/core/testing';
import { AccountSetupStore } from './account-setup-store';
import { UserService } from '../../user/user-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AccountSetupStore', () => {
  let mockUserService: { createAccount: ReturnType<typeof vi.fn> };
  let mockMessageService: { add: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockUserService = {
      createAccount: vi.fn().mockReturnValue(of('success')),
    };

    mockMessageService = {
      add: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AccountSetupStore,
        { provide: UserService, useValue: mockUserService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should be created', () => {
    const store = TestBed.inject(AccountSetupStore);
    expect(store).toBeTruthy();
  });

  describe('createAccount', () => {
    it('should set loading state when createAccount is called', () => {
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(mockUserService.createAccount).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should clear previous error when createAccount is called', () => {
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(store.error()).toBeNull();
    });

    it('should show success message and navigate to dashboard on successful account creation', () => {
      mockUserService.createAccount.mockReturnValue(of('success'));
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(mockMessageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Account Created',
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should set error and show error message on HttpErrorResponse', () => {
      const errorResponse = new HttpErrorResponse({
        error: { message: 'Username already taken' },
        status: 400,
        statusText: 'Bad Request',
      });
      mockUserService.createAccount.mockReturnValue(throwError(() => errorResponse));
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(store.error()).toEqual('Username already taken');
      expect(store.hasError()).toBe(true);
      expect(mockMessageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Account Creation Failed',
        detail: 'Username already taken',
      });
    });

    it('should show default error message when HttpErrorResponse has no message', () => {
      const errorResponse = new HttpErrorResponse({
        error: {},
        status: 500,
        statusText: 'Internal Server Error',
      });
      mockUserService.createAccount.mockReturnValue(throwError(() => errorResponse));
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(mockMessageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Account Creation Failed',
        detail: 'An unknown error occurred.',
      });
    });

    it('should set error for non-HttpErrorResponse errors', () => {
      const genericError = new Error('Network error');
      mockUserService.createAccount.mockReturnValue(throwError(() => genericError));
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(store.error()).toBeTruthy();
      expect(store.hasError()).toBe(true);
    });
  });

  describe('hasError', () => {
    it('should return false when there is no error', () => {
      const store = TestBed.inject(AccountSetupStore);

      expect(store.hasError()).toBe(false);
    });

    it('should return true when there is an error', () => {
      const errorResponse = new HttpErrorResponse({
        error: { message: 'Error' },
        status: 400,
        statusText: 'Bad Request',
      });
      mockUserService.createAccount.mockReturnValue(throwError(() => errorResponse));
      const store = TestBed.inject(AccountSetupStore);

      store.createAccount({ username: 'testuser' });

      expect(store.hasError()).toBe(true);
    });
  });
});
