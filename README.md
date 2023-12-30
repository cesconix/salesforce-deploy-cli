> :warning: **Archived Repository:** This project is no longer maintained and is kept here for archival purposes only. Please note that the code may be outdated and no longer functional.

# Salesforce Deploy CLI

> cartridges deploy made easy

[![build status](https://travis-ci.com/cesconix/salesforce-deploy-cli.svg)](https://travis-ci.com/cesconix/salesforce-deploy-cli) 
[![npm version](https://img.shields.io/npm/v/salesforce-deploy-cli.svg)](https://www.npmjs.com/package/salesforce-deploy-cli)
[![dependencies](https://img.shields.io/david/cesconix/salesforce-deploy-cli.svg)](https://david-dm.org/cesconix/salesforce-deploy-cli)
[![devDependencies](https://img.shields.io/david/dev/cesconix/salesforce-deploy-cli.svg)](https://david-dm.org/cesconix/salesforce-deploy-cli?type=dev)
[![vulnerabilities](https://snyk.io/test/github/cesconix/salesforce-deploy-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cesconix/salesforce-deploy-cli?targetFile=package.json)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

CLI to deploy cartridges on a Salesforce Commerce Cloud instance.

## Quick Overview

<img src="https://raw.githubusercontent.com/cesconix/salesforce-deploy-cli/master/screencast.svg?sanitize=true" width='600'>

## Installation

```bash
npm install -g salesforce-deploy-cli
```

## Usage

```
Usage: salesforce-deploy [options]

Options:
  --hostname, -h      Hostname of the SFCC instance                   [required]
  --username, -u      Business Manager username for instance          [required]
  --password, -p      Business Manager password for instance          [required]
  --cartridges, -c    Paths to cartridges folder to deploy    [array] [required]
  --code-version, -v  Name of the code version to deploy              [required]
  --force, -f         Remove code version before deploy         [default: false]
  --help              Show help                                        [boolean]
  --version           Show version number                              [boolean]
```

### Example - Deploy cartridges from a single folder

```bash
$ salesforce-deploy \
  --hostname 'dev01-realm-customer.demandware.net' \
  --username 'bm_user' \
  --password 'bm_pass' \
  --cartridges './cartridges/project_1' \
  --code-version 'v1.0.0-rc.0' 
```

### Example - Deploy cartridges from multi folder

```bash
$ salesforce-deploy \
  --hostname 'dev01-realm-customer.demandware.net' \
  --username 'bm_user' \
  --password 'bm_pass' \
  --cartridges './cartridges/project_1' \
  --cartridges './cartridges/project_2:**/{cart,checkout}/**' \
  --cartridges './cartridges/project_3:**/{adyen}/**' \
  --code-version 'v1.0.0-rc.0'
  --force
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT. Copyright (C) 2019 [Francesco Pasqua](https://www.linkedin.com/in/cesconix).
