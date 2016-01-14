# isomorphic-startkit

This's isomorphic project using nodejs, express, reactjs and react-router.

The data flow pattern of this using redux, and connecting state and props using react-redux.

### What we've done :

* Isomorphic rendering 
* Babel6 for ES6 & ES2015
* React - Redux
* React-router for routing
* Webpack for bundling
* Editing hot-reload
* Only one node server process (no hot-middleware)
* Css modules for local css 
* Json-LD for meta information

### ENV

* node.js 4.2.4 (LTS)
* npm 3+  
* Express 4.13.3
* React 0.14+
* Redux
* React-router 1.0.3
* Babel 6
* React-transform-hmr
* Webpack
* css-module-require-hook
* jsonld
* jquery

**note: object.assaign has error with npm2 + babel 6**

## Install module
```bash
$ npm install
```

##Run dev in all os
```bash
$ npm run dev
```

##Run server in all os
```bash
$ npm start
```

##build bundle file
```bash
$ npm build
```

if webpack watcher is not work, please run this command
```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
