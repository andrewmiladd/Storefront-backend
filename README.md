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
