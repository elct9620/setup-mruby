import * as os from 'os'
import * as path from 'path'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as toolCache from '@actions/tool-cache'

const TOOLNAME = 'mruby'

async function run(): Promise<void> {
  try {
    let prefix

    const targetVersion: string = core.getInput('mruby-version')
    const cachedPath = toolCache.find(TOOLNAME, targetVersion)
    if (cachedPath) {
      prefix = cachedPath
    } else {
      prefix = path.join(os.homedir(), '.rubies', `mruby-${targetVersion}`)

      await installWithRubyBuild(targetVersion, prefix)
      await toolCache.cacheDir(prefix, TOOLNAME, targetVersion)
    }

    core.addPath(`${prefix}/bin`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function installWithRubyBuild(
  version: string,
  prefix: string
): Promise<void> {
  const tmp = process.env['RUNNER_TEMP'] || os.tmpdir()
  const rubyBuildDir = path.join(tmp, 'ruby-build-for-setup-mruby')
  core.info('Setup ruby-build ...')
  await exec.exec('git', [
    'clone',
    'https://github.com/rbenv/ruby-build.git',
    rubyBuildDir
  ])

  core.info(`Install mruby-${version} ...`)
  await exec.exec(`${rubyBuildDir}/bin/ruby-build`, [
    `mruby-${version}`,
    prefix
  ])

  core.info(`Cleanup ruby-build ...`)
  await io.rmRF(rubyBuildDir)
}

run()
