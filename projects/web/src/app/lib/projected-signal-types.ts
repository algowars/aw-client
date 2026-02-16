import { WritableSignal } from '@angular/core';

export type ProjectedSignal<T> = WritableSignal<T>;

export interface ProjectedSignalOptions<T> {
  computation: () => T;
  update: (value: T) => void;
}
