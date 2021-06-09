<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center"><a href="https://nestjs.com">NestJS</a> + <a href="https://auth0.com">Auth0</a> = :heart:</p>

## Description

A template for using [Auth0](https://auth0.com) with the
[Nest](https://github.com/nestjs/nest) framework. To start, either fork this
repository or run

```bash
$ git clone --depth 1 https://github.com/le0dime/nestjs-auth0-login.git
```

## Setup

You'll need to populate a `.env` file with Auth0 configuration environemt
details. This file should **never** be committed for obvious reasons (hence the
reason it's `.gitignore`-d).

```dotenv
AUTH0_DOMAIN={your Auth0 domain}
AUTH0_CLIENT_ID={the Auth0 client ID for your app}
AUTH0_CLIENT_SECRET={the Auth0 client secret for your app}
AUTH0_AUDIENCE={http://localhost:3000 or your production domain accordingly}
AUTH0_CONNECTION={your Auth0 database name configured to your client}
```

A template `.env` file can be found at [`.env.example`](.env.example).

You may also like to remove all the irrelevant metadata from the `package.json`,
such as the `repository`, `homepage`, `bugs`, and `description` fields.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Explanation

### Authentication logic

This template nest app uses the [jwks-rsa](https://ghub.io/jwks-rsa) package
along with [passport-jwt](https://ghub.io/passport-jwt) and
[@nestjs/passport](https://ghub.io/@nestjs/passport) for authentication. All
authentication logic is in the [`/src/controllers/auth`](src/controllers/auth/)
submodule.

```
src/controllers/auth/
├── auth.module.ts
├── auth.controller.ts
└── jwt.strategy.ts
```

The [`JwtStrategy`](src/controllers/auth/jwt.strategy.ts) injectable contains
all the core functionality, where the constructor sets up core token validation
using the [jwks-rsa](https://ghub.io/jwks) library. All the Auth0 configuration
for this is done in the [`.env`](.env.example) file using
[@nestjs/config](https://ghub.io/@nestjs/config) (see [above](#Setup))

`AuthModule` is imported by [`AppModule`](src/app.module.ts), and protected
routes are decorated with `@UseGuards(AuthGuard('jwt'))` in
[`AppController`](src/app.controller.ts) and
[`UserController`](src/controllers/user/user.controller.ts).

### How to get JWT token

- Go to `auth/login` on your browser
- Login or sign up
- You will get a response with an access_token that will expire in 24 hours
- Include that token as header for any endpoint that requires authorization

## More info

See the [Nest documentation](https://docs.nestjs.com).

## License

This project is [MIT licensed](LICENSE).
