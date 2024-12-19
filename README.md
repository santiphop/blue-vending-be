## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# with docker
$ docker compose up

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API

Open [http://localhost:4001/docs](http://localhost:4001/docs) with your browser to see Swagger API document,

or try with Visual Studio Code's REST Client in files `src/controllers/v1/<controller-name>/<controller-name>.http`