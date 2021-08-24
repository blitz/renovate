import { logger } from '../../logger';
import type { ManagerConfig, PackageFile } from '../types';

// TODO Change all warns to debug/trace.

export default async function extractPackageFile(
  _content: string,
  fileName: string,
  config: ManagerConfig
): Promise<PackageFile | null> {
  logger.warn(`niv.extractPackageFile(${fileName})`);

  return null;
}
