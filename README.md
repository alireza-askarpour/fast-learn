# Fastlearn Backend

The online learning application built using Node.js, Express, Mongoose


## Index
+ [Features](#features)
+ [Installation](#installation)
+ [Documents](#documents)

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Authenticates via using [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken).
+ Uses [MongoDB](https://github.com/mongodb/mongo) and [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.

## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/FastLearn-ir/fastlearn-backend.git
	$ cd fastlearn-backend
	```
2. Install Dependencies

	```
	$ npm install
	```

3. configure .env file
    ```
      PORT = 8000

      BASE_URL = http://localhost:8000
      MONGO_URI = mongodb://127.0.0.1:27017/express-store

      ACCESS_TOKEN_SECRET_KEY = 032AF2E4B0C670B6348A604B13FD074FCE77D6C8A6FF6A8361820DFFF87A600A
      REFRESH_TOKEN_SECRET_KEY = 42757476C1B4429E823B36F26BE7F4460570E3ED9182710923D0939365584FD7

    ```
3. Start the application

	```bash
    # development mode
    $ npm run dev

    # production mode
    $ npm start
	```
Your app should now be running on [localhost:8000](http://localhost:8000/).


# Documents<a name="documents"></a>

### swagger-ui
- http://localhost:{port}/docs

![Swagger](https://i.ibb.co/0hNx1bd/screencapture-localhost-4000-docs-2023-04-04-09-40-21-1.png)
