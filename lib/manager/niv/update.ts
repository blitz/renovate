import { quote } from 'shlex';
import upath from 'upath';
import { getGlobalConfig } from '../../config/global';
import { ExecOptions, exec } from '../../util/exec';
import { readFile } from '../../util/fs';
import type { UpdateDependencyConfig } from '../types';

export default async function updateDependency({
  fileContent,
  upgrade,
}: UpdateDependencyConfig): Promise<string | null> {
  const { localDir } = getGlobalConfig();

  const cmd = `niv update -r ${quote(upgrade.newDigest)} ${quote(
    upgrade.depName
  )}`;

  const execOptions: ExecOptions = {
    // TODO We need a proper Docker container here.
    //
    //    docker: {
    //      image: '???',
    //    },
  };

  // TODO Missing try/catch
  await exec(cmd, execOptions);

  return readFile(upath.join(localDir, upgrade.packageFile), 'utf8');
}
