# CPBaja Parts Management

[![CP Baja Parts-Management CI](https://github.com/CPBaja/Parts-Management/actions/workflows/test.yml/badge.svg?branch=develop)](https://github.com/CPBaja/Parts-Management/actions/workflows/test.yml)

## Overview

This repository contains the Parts Management software for Cal Poly's Baja SAE team. It features a user-friendly UI for team members to add, edit, and monitor the parts they need to purchase or manufacture for the Baja car. The software holds information about a part's subsystem, subassembly, status, priority, stock, cad, and much more. This software is currently in alpha and unreleased.

Click [here](https://app.diagrams.net/#G1WEWmdwzENLEppVEkaEy2EwxNCejGHRiK) to view the UI prototype.

## Development Environment Setup

Follow these steps to set up the development environment.

1. Clone this repository.
2. Install node.js from this [link](https://nodejs.org/en/download/).
   We do not use node.js but we do use npm (node package manager).
3. In the frontend directory, run the following command to install frontend dependencies:

   `npm install`

4. In the backend directory, run the following command to install backend dependencies:

   `pip install -r requirements.txt`

5. In the backend directory, add the `.env` file to access the database.
   Retrieve this file from a team member who maintains this code.

For more detailed instructions, see the backend and frontend readme files.

- Click [here](https://github.com/CPBaja/Parts-Management/tree/main/backend) to view the backend source and readme file.
- Click [here](https://github.com/CPBaja/Parts-Management/tree/main/frontend) to view the frontend source and readme file.

## Style Checking

### PyCodeStyle and PyLint for Python

To install PyCodeStyle, run the following command:  
`pip install pycodestyle`

In your editor of choice, add the python path and enable linting.
For VSCode, open the command palette (`Ctrl+Shift+P`) and select the **Python: Enable Linting** command.

Alternatively, for VSCode, add the following to `.vscode/settings.json`:

```json
{
  "python.pythonPath": "<path>",
  "python.linting.Enabled": true,
  "python.linting.lintOnSave": true
}
```

Replace `path` with the python path.

### Prettier and ESLint for JavaScript

This setup is inspired by [this tutorial](https://thomaslombart.com/setup-eslint-prettier-react/). Please follow the link for further guidance.

To install ESLint and Prettier, run the following command in the `frontend` directory:  
`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged`

The following Prettier options are modified from their default value:
| Option | Description |
| ------ | ----------- |
| `"jsxBracketSameLine": true` | Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). |
| `"endOfLine": "auto"` | Maintain existing line endings (mixed values within one file are normalized by looking at what’s used after the first line). |

### Format on Save

In your editor of choice, enable format on save.
For VSCode, add the following to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": null,
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
