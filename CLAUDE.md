# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Action that installs mruby (a lightweight Ruby implementation) using ruby-build and adds it to the PATH. The action is written in TypeScript and compiled to JavaScript for distribution.

## Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Package the action for distribution (creates dist/index.js)
npm run package

# Run linting
npm run lint

# Run tests
npm test

# Run all checks (build, format, lint, package, test)
npm run all

# Format code
npm run format

# Check formatting
npm run format-check
```

## Architecture

The codebase follows the standard GitHub Action structure:

1. **Entry Point**: `src/main.ts` contains the main logic
   - Reads the `mruby-version` input from the action
   - Installs mruby to `~/.rubies/mruby-{version}`
   - Adds the mruby binary to PATH

2. **Distribution**: The TypeScript code is compiled and bundled into `dist/index.js` using ncc
   - The `dist/` directory must be committed to the repository
   - After making changes, always run `npm run build && npm run package` to update dist/

3. **Action Definition**: `action.yml` defines the action metadata and inputs

## Key Implementation Details

- Uses `ruby-build` (cloned from GitHub) to compile and install mruby from source
- Installation location: `~/.rubies/mruby-{version}/bin`
- Temporary files are stored in `RUNNER_TEMP` or system temp directory
- The action uses Node.js 20 runtime

## CI/CD Workflows

- **build-test**: Runs on PRs and main branch - builds and tests the action
- **check-dist**: Ensures the `dist/` directory is up-to-date with source changes
- **codeql-analysis**: Security scanning
- **dependabot-prs**: Auto-merges Dependabot PRs that pass tests

## ESLint Configuration

The project uses ESLint v9 with flat configuration (`eslint.config.mjs`). The configuration uses compatibility layers for TypeScript and Jest plugins.

## Testing

- Jest is configured for TypeScript tests
- Test files should be placed in `__tests__/` directory
- The main test verifies that the action can install mruby successfully