# CPBaja Parts Management

## Style Checking

### Prettier and ESLint for JavaScript
Install Prettier and ESLint onto npm in the `frontend` directory:
`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier lint-staged`
The following options are changed from default for:
- `"tabWidth": 2`: Make tabs 2 spaces.
- `"printWidth: 120`: Limit lines to 120 characters.
- `"bracketSpacing": false`: Brackets are not surrounded by spaces.
- `"jsxBracketSameLine": true`: JSX elements are closed on their last line rather than the line after.

Enable `formatOnSave` in your editor of choice.  Below are the settings to put into `.vscode/settings.json` for VSCode:
```json
{
    "editor.defaultFormatter": null,
    "editor.formatOnSave": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
Some addtional guidence can be found [here](https://thomaslombart.com/setup-eslint-prettier-react/).

### Pep8 for Python
Add the python path to your editor, if not already set and enable style checking for Pep8 (using `pylint` by default).  In VSCode the following command will do:
`Python: Enable Linter`

This line can be added to `.vscode/settings.json` for VSCode:
```json
{
    "python.pythonPath": "path/to/my/python",
    "python.linting.Enabled": true,
    "python.linting.lintOnSave": true
}
```

