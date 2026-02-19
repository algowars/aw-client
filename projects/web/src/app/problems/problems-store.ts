import { signalStore } from '@ngrx/signals';
import { Problem } from './problem';
import { withCallState, withPagination } from '@angular-architects/ngrx-toolkit';
import { withEntities } from '@ngrx/signals/entities';

export const ProblemsStore = signalStore(
  withEntities<Problem>(),
  withPagination<Problem>(),
  withCallState(),
);
