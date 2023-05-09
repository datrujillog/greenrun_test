GreenRun Backend Challenge

To launch the GreenRun application on a local environment, the following steps should be followed:

1. Copy the .env.example file to .env.
2. Complete the .env values to match your environment.
3. Build the Docker container using docker compose build.
4. Launch the application for the first time using docker compose up.
5. If not the first time launching, use docker compose start.
6. Enter the app container using docker exec -it greenrun /bin/sh.
7. Run yarn run install inside the container to install dependencies.
8. Create tables by running migrations with ./node_modules/.bin/knex migrate:up inside the container.
9. Seed the database by running seeders with ./node_modules/.bin/knex seed:run userSeeds inside the container.
10. Start the server by running yarn run start inside the container.
11. Access the app at http://172.21.0.5:3000/.
12. Use the credentials {"username": "johndoe", "password": "greenrun"} to log in.
Authentication on the API works with a header called "Authorization." To use the API, you must log in with the given credentials on '/login' and complete that header in all requests with a JSON Web Token (JWT).

The Swagger documentation for the API can be accessed by launching Swagger Editor and using either the swagger.json or the swagger.yaml file.

To execute tests, run yarn run jest inside the container.

To check Prettier formatting, run yarn run prettier:check, and to format the files, run yarn run prettier:run.

If you want to import the Postman collection, use the following link: https://www.getpostman.com/collections/35e0eae7b79f77624584. This will import the collection used to develop the GreenRun application.

Please note that only three tests were carried out due to time constraints, although the environment was developed with the intention of doing more tests. The code is available on GitHub at https://github.com/datrujillog/greenrun_test Two workflows are included in the repository: one for Prettier and one for the test suite.

The original plan was to include Swagger documentation with Swagger UI in the API, but it was found that hapi-swagger works with validation on the server.routes. Instead, custom validation messages with Boom and Joi were used on the Adapters layer. To serve Swagger documentation correctly, this layer would need to be removed, but then the Swagger UI in the API would lack payload information. Therefore, the Swagger Editor must be used with either both files on the root directory from this project: swagger.json or swagger.yaml.