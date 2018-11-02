# night-owl-bakery

This repository contains the Night Owl Bakery on-demand work app.


## Installation

1. Install `node.js>=8.0.0` and `npm>=3.0.0`.
2. Clone this repository:
   `git clone git@github.com:aspyrx/night-owl-bakery.git`
3. Go to the repository's root: `cd night-owl-bakery`
4. Install `node.js` dependencies: `npm install`


## Usage

```sh
npm start -- [config]
```

The configuration can be either a JSON file or a JavaScript module that exports
the configuration object. See documentation for more details.


## Development

### File hierarchy

- `doc/`: Generated documentation.
    - `lib/`: Server source documentation.
    - `src/`: Frontend app source documentation.
- `dist/`: Generated frontend app build.
- `lib/`: Server implementation.
    - `index.js`: Server entry point.
    - `<other files/dirs>`: Supporting implementation.
- `loaders/`: `webpack` loaders.
- `public/`: Frontend app assets not generated by the build.
- `src/`: Frontend app implementation.
    - `index.html`: Template index page.
    - `definitions.less`: Shared LESS styling definitions.
    - `index.js`: Main app entry point.
    - `<Component>/`: React component.
        - `index.less`: LESS styling.
        - `index.js`: Component implementation.
        - `<other files>.js`: Supporting implementation.
- `vendor/`: Vendored code.
- `build.js`: Frontend app build script.
- `.eslintrc.json`: ESLint configuration.
- `.jsdoc.json`: JSDoc configuration.
- `package.json`: `node.js` package configuration.
- `package-lock.json`: Generated `npm` package manifest.
- `postcss.config.js`: `postcss` configuration.
- `.tern-project`: `ternjs` configuration.
- `webpack.config.base.js`: Base `webpack` configuration.
- `webpack.config.js`: Development `webpack` configuration.
- `webpack.config.production.js`: Production `webpack` configuration.

### Scripts

To run development scripts, use `npm run <script>`. Available scripts include:

- `doc-lib`: Generates documentation for `lib/` into `doc/lib`.
- `doc-src`: Generates documentation for `src/` into `doc/src`.
- `dev`: Starts a live-reloading development server.
- `dist`: Performs a single production build into `dist/`.
- `lint`: Lints the codebase.
