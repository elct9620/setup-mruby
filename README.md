# Setup mruby Action
[![build-test](https://github.com/elct9620/setup-mruby/actions/workflows/test.yml/badge.svg)](https://github.com/elct9620/setup-mruby/actions/workflows/test.yml)

This action use ruby-build to install mruby and adds it to the PATH.

## Usage

```
name: My workflow
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: elct9620/setup-mruby@main
      with:
        mruby-version: '3.2.0' # Not needed with a .ruby-version file
    - run: mrbc app.rb
```
