import * as datasourceGitRefs from '../../datasource/git-refs';
import { logger } from '../../logger';
import type { ManagerConfig, PackageDependency, PackageFile } from '../types';

// TODO Change all warns to debug/trace.

export default async function extractPackageFile(
  content: string,
  fileName: string,
  config: ManagerConfig
): Promise<PackageFile | null> {
  logger.warn(`niv.extractPackageFile(${fileName})`);
  logger.warn(`${content}`);

  const nivContent = JSON.parse(content);

  const deps: PackageDependency[] = Object.keys(nivContent).map((depName) => {
    const dep = nivContent[depName];

    // TODO This only works for Github dependencies tracking branches, but niv can also
    // track releases and non-Github git repos.
    return {
      depName,
      // TODO Should we ask the Github API what the right URL is? How does niv do it?
      lookupName: `https://github.com/${dep.owner}/${dep.repo}.git`,
      currentValue: dep.branch,
      currentDigest: dep.rev,
    };
  });

  return {
    deps,
    datasource: datasourceGitRefs.id,
  };
}
