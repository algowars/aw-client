import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Auth0Store } from './auth/auth0-store';
import { UserStore } from './user/user-store';
import { MessageService } from 'primeng/api';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, ToastModule],
      providers: [
        provideRouter([]),
        { provide: Auth0Store, useValue: {} },
        { provide: UserStore, useValue: {} },
        { provide: MessageService, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
