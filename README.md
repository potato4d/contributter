# Contributter

![Screen Shot 2019-08-12 at 19 56 40](https://user-images.githubusercontent.com/6993514/62860507-564b3400-bd3b-11e9-8443-cc411e5fe7b8.png")

## For development

At first:

```sh
yarn
```

### web

```sh
yarn
yarn tailwind:web  # precompile css
yarn serve:web
```

### functions

```sh
cd functions
```

## For production build

### web

```sh
cd web
yarn
yarn build
yarn export
cd ../
yarn firebase deploy --only hosting
```

### functions

```sh
yarn firebase deploy --only functions
```
