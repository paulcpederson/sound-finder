![Sound Finder](https://cloud.githubusercontent.com/assets/1031758/12703095/c191c7ce-c7ee-11e5-9a49-8a8d0cea3a46.png)

# Sound Finder

> Find your kindred music spirits.

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

## Deploy

```
npm run deploy
```

Deploys site to soundfinder.io with [surge.sh](https://surge.sh/).