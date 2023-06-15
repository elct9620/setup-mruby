import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as cache from '@actions/cache'

async function run(): Promise<void> {
  try {
    const targetVersion: string = core.getInput('mruby-version')
    const cacheKey = `mruby-${targetVersion}`
    const prefix = path.join(os.homedir(), '.rubies', `mruby-${targetVersion}`)
    await cache.restoreCache([prefix], cacheKey)

    if (!fs.existsSync(`{$prefix}/bin/mruby`)) {
      await installWithRubyBuild(targetVersion, prefix)
      await cache.saveCache([prefix], cacheKey)
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
