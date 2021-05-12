# CPBaja Parts Management

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
| `"printWidth: 120` | Specify a line length of 120 for the printer to wrap on. |
| `"bracketSpacing": false` | Do not print spaces between brackets in object literals. |
| `"jsxBracketSameLine": true` | Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). |

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
