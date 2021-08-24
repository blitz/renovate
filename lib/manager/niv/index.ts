import * as gitVersioning from '../../versioning/git';

export { default as extractPackageFile } from './extract';

export const defaultConfig = {
  enabled: true,
  versioning: gitVersioning.id,
  fileMatch: ['(^|/)nix/sources.json$'],
};
