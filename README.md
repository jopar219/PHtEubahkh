# README

Coding challege for gumroad.

View live version here: https://gumroad-challenge.onrender.com

![Screenshots](https://github.com/jopar219/PHtEubahkh/assets/6307954/f47df34e-e850-484a-9adb-1b1ee2dfacdc)

## Features
* Uploading Books
* I'm Feeling Lucky
* Ask question
* Endpoint for Similar questions

## Running locally

You need to have postresql with the [pgvector](https://github.com/pgvector/pgvector) plugin installed.

You should also add a `.env` file like:
```
RAILS_ENV=development
DB_USER=user
DB_PASS=123
DB_HOST=localhost
OPENAI_ACCESS_TOKEN=
```
Then, inside the directory run:
```
bin/dev
```

## Architecture
The project is build as an SPA with react connected to a rails backend.

Postgres was used due to it's vector similarity plugins.

The react code can be found under `app/assets/javascript/`.

rails is used to create the RESTful API that communicates via JSON with the frontend.

These are the routes exposed:

* `GET /api/books`
* `GET /api/books/:id`
* `POST /api/books/`
* `GET /api/books/:id/questions/similar`
* `GET /api/books/:id/questions/random`

There are three resources:
* **Book**: Includes some book metadata such as cover images, urls, etc.
* **Page**: Each page is transformed to embeddings via OpenAI's embedding's API. We store the embeddings here.
* **Question**: Questions are stored here for the I'm lucky feature and future recommended questions feature.

## Improvements
If I were to make it again, I would improve on the following:
* More consistent handling of rails parameters and responses
* Use a mature frontend library to interface with the backend instead of creating a custom solution
* Not use css-modules since they make it hard to override styles from parent components
* Better error handling
* Automatic camelization of rails responses
* Add automated testing
* Reevaluate the stack used. There seems to be a bit of friction when using a rails/react stack

## What would I do differently
* Had I decided to use tailwind instead of css-modules I would've probably finished 5 hours earlier.
This is because there is more support for tailwind in rails and its better integrated in the assets pipeline.

## Things I would keep the same
* Using postresql, pgvector, and the neighbor gem was definitely the right decision. Using them probably saved me hours of work.

