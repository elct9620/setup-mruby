import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {fileURLToPath} from 'url'
import {expect, test} from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MRUBY-VERSION'] = '3.1.0'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  const res = cp.execFileSync(np, [ip], options).toString()
  expect(res).toContain('mruby-3.1.0')
})
