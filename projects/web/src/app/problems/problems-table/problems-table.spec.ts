import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsTable } from './problems-table';

describe('ProblemsTable', () => {
  let component: ProblemsTable;
  let fixture: ComponentFixture<ProblemsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
