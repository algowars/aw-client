import { LanguageVersion } from './language-version';

export interface Language {
  id: number;
  name: string;
  versions: LanguageVersion[];
}
