import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProblemsStore } from '../problems-store';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-problems-table',
  imports: [TableModule],
  templateUrl: './problems-table.html',
})
export class ProblemsTable {
  protected problemsStore = inject(ProblemsStore);
  cols: Column[] = [
    { field: 'title', header: 'Title' },
    { field: 'difficulty', header: 'Difficulty' },
    { field: 'tags', header: 'Tags' },
  ];
}
