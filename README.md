# Contributter

<img width="822" alt="Screen Shot 2019-08-12 at 19 56 40" src="https://user-images.githubusercontent.com/6993514/62860507-564b3400-bd3b-11e9-8443-cc411e5fe7b8.png">

## For development

At first

```shell
$ yarn
```

### web

```shell
$ yarn
$ yarn tailwind:web # precompile css
$ yarn serve:web
```

### functions

```shell
$ cd functions
```

## For production build

### web

```shell
$ cd web
$ yarn
$ yarn build
$ yarn export
$ cd ../
$ yarn firebase deploy --only hosting
```

### functions

```shell
$ yarn firebase deploy --only functions
```

