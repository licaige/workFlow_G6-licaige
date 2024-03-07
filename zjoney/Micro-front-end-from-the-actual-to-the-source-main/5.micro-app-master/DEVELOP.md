# develop

### clone & run project
```bash
git clone https://github.com/micro-zoe/micro-app.git

cd micro-app

// install dependencies
yarn bootstrap 

// run project
yarn start
```

The base application `main-react16` is started by default, the sub applications started are: react16, react17, vue2, vue3, angular11, vite.

If you want to start the `main-vue2` base application, you can run: 

```bash
yarn start:main-vue2
```

### run alone
`yarn start` will start 8 applications at the same time by default, which may cause the system to get stuck. It is recommended to run some applications separately to get a better development experience.

1、run main program
```
yarn build:watch
```

2、enter the base application and start
```
cd dev/main-react16/

yarn start
```

3、enter a sub application and start it
```
cd dev/children/react16

yarn start
```

If you want to start more sub applications, you can continue to enter their directory and start.
