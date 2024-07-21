# SCHEDULAR-APP
A task scheduling app built on the
[Nestjs](https://github.com/nestjs/nest) framework a [Nodejs](https://nodejs.org/docs/latest/api/) progressive framework.

## Setting Up the app
* clone the repo
* setup a rabbitmq service
* setup a redis service
* setup postgress database service
* setup a milling smtp client
### Setting up environmental variable
* create a .env file using the .env.example template
* populate the variables, with the values gotten from the services you set-up approprately
### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running the schedular service

```bash
# development
$ npm run start schedular-svc

# watch mode
$ npm run start:dev schedular-svc

# production mode
$ npm run start:prod schedular-svc
```

### Documentation
* [swagger](http://localhost:3000/api/doc)
* [postman](https://documenter.getpostman.com/view/23282509/2sA3kUHhsn)

## License

Nest is [MIT licensed](LICENSE).
