# Storefront Backend Project

this project is used to create orders,users and produucts. Not only create, but also to see them (GETing them)

server port = 3000,
db port = 5432,
to run the server = yarn start || npm run start

---------------------------------------------------------------------------------
# scripts to run

"test": "set NODE_ENV=test&& db-migrate up --env test && tsc && jasmine && db-migrate reset": to beging your testing for your application.
"dev": "nodemon src/server.ts": To start your server and to begin to make requests or posting data.
    --------------------------------------------------------------------------------------
# packages to install for the project 
    "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "express": "^4.17.3",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.15",
    "pg": "^8.5.1"
  
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.13",
    "@types/jasmine": "^3.6.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/pg": "^7.14.7",
    "dotenv": "^16.0.0",
    "jasmine": "^3.6.4",
    "jasmine-spec-reporter": "^6.0.0",
    "jasmine-ts": "^0.3.0",
    "ts-node": "^10.7.0",
    "tsc-watch": "^4.2.9",
    "typescript": "^4.6.3"
  }
}
----------------------------------------------------------------------------------
After running your server , you should http://localhost:3000/ wich is the main route:
http://localhost:3000/store/users: to access all users methods
http://localhost:3000/store/users/:id : with the get method, should return the selected user
http://localhost:3000/store/products: to access all products methods
http://localhost:3000/store/users/:id : with the get method, should return the selected product
http://localhost:3000/store/orders: to acess all orders methods (geting them all || post an order)
http://localhost:3000/store/orders/userId : with the get method, should return the selected order of the selected user.


------------------------------------------------------------------------------------
# Database setup installation
CREATE USER postgres WITH PASSWORD '1234';

CREATE DATABASE store;
CREATE DATABASE test;

GRANT ALL PRIVILLEGES ON DATABASE store TO postgres;
GRANT ALL PRIVILLEGES ON DATABASE test TO postgres;
[ by : Andrew Milad ]
