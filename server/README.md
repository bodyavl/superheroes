## Installation

```bash
$ pnpm install
```

## Database setup

```bash
$ docker-compose up -d
```

## Running the app

```bash
# set up .env
cp .env.example .env

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
