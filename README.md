# Project "Difference generator"

[![Maintainability](https://api.codeclimate.com/v1/badges/5e1c144ca79bb5641319/maintainability)](https://codeclimate.com/github/deputatov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5e1c144ca79bb5641319/test_coverage)](https://codeclimate.com/github/deputatov/frontend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.org/deputatov/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/deputatov/frontend-project-lvl2)

Project [frontend-project-lvl2](https://ru.hexlet.io/professions/frontend/projects/46)

Mentor [Kirill Mokevnin](https://ru.hexlet.io/u/mokevnin)

In project developed application **gendiff** that finds differences in configuration files

Supported input formats:

* json
* yml
* ini

Output formatters:

* plain text
* pretty
* json

## Install

To use gendiff as an application install it globally:

```
$ sudo npm i -g frontend-project-lvl2-deputatovn
```

<p align="center"> <img width=auto height=auto src="gif/install.gif"> </p>

## Usage

## CLI

```
$ gendiff [options] <file1> <file2>
```
Options:

```
-V, --version        output the version number
-f, --format [type]  Output format
-h, --help           output usage information
```
## Examples

### Compare json files

```
$ gendiff file1.json file2.json
```

<p align="center"> <img width=auto height=auto src="gif/jsonflat.gif"> </p>

### Compare yaml files

```
$ gendiff file1.yml file2.yml
```

<p align="center"> <img width=auto height=auto src="gif/ymlflat.gif"> </p>

### Compare ini files

```
$ gendiff file1.ini file2.ini
```

<p align="center"> <img width=auto height=auto src="gif/iniflat.gif"> </p>

### Pretty output (default)

```
$ gendiff file1.json file2.json
```

<p align="center"> <img width=auto height=auto src="gif/prettyoutput.gif"> </p>

### Plain output

```
$ gendiff -f plain file1.json file2.json
```

<p align="center"> <img width=auto height=auto src="gif/plainoutput.gif"> </p>

### JSON output

```
$ gendiff -f json file1.json file2.json
```

<p align="center"> <img width=auto height=auto src="gif/jsonoutput.gif"> </p>