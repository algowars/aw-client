import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcher;
  let fixture: ComponentFixture<ThemeSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode class on html', () => {
    const root = document.documentElement;
    root.classList.remove('p-dark');

    component.toggleDarkMode();
    expect(root.classList.contains('p-dark')).toBe(true);

    component.toggleDarkMode();
    expect(root.classList.contains('p-dark')).toBe(false);
  });
});
