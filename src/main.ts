import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const targetVersion: string = core.getInput('mruby-version')
    core.debug(`Install mruby-${targetVersion} ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
