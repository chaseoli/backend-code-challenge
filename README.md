![https://github.com/chaseoli/backend-code-challenge/actions](https://github.com/chaseoli/backend-code-challenge/workflows/cicd/badge.svg?branch=master)

# Test for Dream Job on Quantum Team

## Getting Started

```bash

# IMPORTANT! Get the "dev.env" file from a team member and paste it into the ./api directory. This file contains development secrets to run the application locally.

# Install global dependencies (first time only)
npm i -g tsoa js-yaml typescript @angular/cli

# Install project dependencies (first time only)
cd api && npm i

# start up the server and the ui
npm start

# Done! Go to http://localhost:4200

# NOTE: if using vscode you can also use launch.json configs
```

# Architecture

## API Server (Back-end)

The application level architecture for this API utilizes a controller based approach to contain the logic for all endpoints. Javascript decorators in controllers are used by TSOA (the api framework) to generate swagger documentation. The middleware.ts contains all the middleware logic for this application

TODO: Migrate to loopback.io instead of TSOA if there is time

### Postman Collections

TODO: add collections and provide link

### OpenAPI Definition (Swagger)

TODO: implement and provide a link

## Database

<img src="screenshots/dbBattle.jpg" width="500" />

While the _Pokemon_ data appears to be consistently structured currently (which is good for a SQL pattern), _Pokemons_ have a tendency to evolve and change given the unpredictable nature of super powers. Therefore, I have chosen a document db (ie: Mongo) so that I will have more agility in the long-run when it comes to mutating the data structure as the project matures over time. I will take care to build typed interfaces for my data models so as to thwart against data inconsistencies at scale. In general, when implemented properly, it has been my experience the a document DB can be used to more easily achieve performance at scale if the data structure is normalized and flattened as much as possible. Furthermore, using MongoDB Atlas, I can get up and running quickly with a highly available DB cluster and not have to worry about about db hosting, for free!

### Mutating state with ***Favorites*** field
The challenge in data modeling is balancing performance with the needs of the application. The more efficient your data retrieval pattern the better your performance at scale. We could choose to simply add a favorites *boolean* field to each Pokemon object and we would be done. However, there are some problems with this approach when considering the future of this application. Specifically, It is unlikely that my favorite pokemon are everyone's favorite pokemon. If we continue to mutate the Pokemon object directly, each Pokemon record would start to get very large if we had to track favorites by user with each pokemon record. Eventually, the application queries would stall at scale. Also there is a separation of concern issue. What if we want to add more pokemon in the future? If we took the aggregated approach we would need to ask all our users if the new pokemon is one of their favorites in order for our data to complete. This is unreasonable. Therefore, a better approach would be to create a users profile collection which tracks favorites separate from the pokemon data themselves, along with other user specific concerns. You might ask yourself, but doesn't this duplicate or make my dataset larger? Sometimes, yes. When designing data models, it is not enough to consider the easiest way to represent a single record, instead always consider the application usage of the data and how it may be impacted by future queries, updates, and processing. 

NOTE: I decided to take this a step further and add a authentication mechanism to allow logged-in users to track their favorites.

## UI (Front-end)

TODO: create angular with carbon components, as a bonus to visualize the data if there is time
TODO: include a giphy animation of ui and how it works

## Tests

TODO: TDD, Mocha, Chain, How to run?...

## Deployment

TODO: Docker container / serverless

# Deployment

# Hosting


# Secret Manager

