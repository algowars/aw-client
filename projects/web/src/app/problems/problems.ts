import { Component } from '@angular/core';
import { LandingLayout } from '../shared/layouts/landing-layout/landing-layout';
import { ProblemsTable } from './problems-table/problems-table';
import { ProblemsStore } from './problems-store';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-problems',
  imports: [LandingLayout, ProblemsTable, Card],
  templateUrl: './problems.html',
  providers: [ProblemsStore],
})
export class Problems {}
