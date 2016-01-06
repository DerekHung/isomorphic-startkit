# isomorphic-startkit

This's isomorphic project using nodejs, express, reactjs and react-router.

The data flow pattern of this using redux, and connecting state and props using react-redux.

## Install module
```bash
$ npm install
```

##Run dev in mac or linux
```bash
$ npm run dev
```

##Run dev in windows
```bash
$ npm run wdev
```

##Run production in  mac or linux
```bash
$ npm run start
```

##Run production in windows
```bash
$ npm run wstart
```
##build bundle file
```bash
$ npm build
```

if webpack watcher is not work, please run this command
```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
