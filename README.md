# Test for Dream Job on Quantum Team

## API Server (Back-end)
The application level architecture for this API utilizes a controller based approach to contain the logic for all endpoints. Javascript decorators in controllers are used by TSOA (the api framework) to generate swagger documentation. The middleware.ts contains all the middleware logic for this application 

TODO: Migrate to loopback.io instead of TSOA if there is time

### Postman Collections
TODO: add collections and provide link 

### OpenAPI Definition (Swagger)
TODO: implement and provide a link 

## Database (Database)
While the _Pokemon_ data appears to be consistently structured currently (which would favor a SQL pattern), _Pokemons_ have a tendency to evolve and change given the unpredictable nature of super powers. Therefore, I have chosen a document db (ie: Mongo) so that I will have more agility when it comes to mutating the data structure as the project matures. I will take care to build typed interfaces for my data models so as to twart against data inconsistencies at scale. In general, when implemented properly, in the long-run a document DB can be used to more easily achieve performance at scale if the data structure is normalized and flattened as much as possible. 

## UI (Front-end)
TODO: create angular with carbon components 

## Tests
TODO: TDD, Mocha, Chain, How to run...

## Deployment 
TODO: Docker container / serverless


