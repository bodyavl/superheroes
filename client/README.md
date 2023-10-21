#  Programming Blog client

At first run server using [specification](../server/README.md)

To run locally:

```
   $ npm install

   $ cp .env-example .env

   $ npm run dev
```

To run in docker:

```
   $ cp .env.example .env.prod

   $ docker build -t programming-blog-client-image .

   $ docker compose up -d
```
