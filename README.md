# Sound Finder

> Find your kindred music spirits.

The goal is to allow soundcloud users to find other users that have similar taste in music. Obviously not in production yet. Stay posted.

## Routes

| Url | Description                                   |
| --- | --------------------------------------------- |
| `/` | page with a input so you can enter a username |
| `/:user/` | page with info about a user, and users similar to them |
| `/:user/play/` | page with a player for that users favorites |

## Install

```
npm install
```

Installs all dependencies.

## Develop

```
npm start
```

Uses [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/) to build JavaScript, compiles SASS with [node-sass](https://github.com/sass/node-sass#usage-1), minifies images that have changed with [imagemin-newer](https://github.com/paulcpederson/imagemin-newer/), and runs a local server with [live-server](https://www.npmjs.com/package/live-server).

## Test

```
npm test
```

For now, tests whether js complies with [Standard](https://github.com/feross/standard).

## Deploy to Surge

```
npm run deploy
```

## Tech Stack

Uses [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/) for JavaScript. SASS is handled with [node-sass](https://github.com/sass/node-sass#usage-1). All tasks are handled with npm scripts. To learn more, go read [this](http://paulcpederson.com/articles/npm-run/).