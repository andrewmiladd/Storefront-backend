# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- http://localhost:3000/store/products [GET]
- Response: All products will be displayed.
- http://localhost:3000/store/products/:id [GET]
Response: The selected product will show by the entered ID.
- http://localhost:3000/store/products [POST] [token required]
- Response: the created product will be displayed in the response


#### Users
- http://localhost:3000/store/users [GET] [token required]
- Response: getting all the users from the database.
- http://localhost:3000/store/users/:id [GET] [token required]
- Response: get the selected user with ID.
- http://localhost:3000/store/users [POST] [token required]
- Response: return the created user in a response.
 http://localhost:3000/store/users/authenticate [POST] [token required]
- Response: Check if the user is entering the right email and password.


#### Orders
- http://localhost:3000/store/orders [GET] (args: user id)[token required]
- Response: GET all the orders from the database
- http://localhost:3000/store/orders/:userID [GET]
- Response: Get the order selected by the user ID.
- http://localhost:3000/store/orders [POST]
- Response: To create an order and return the order as response.


# Tables
#### Product
-  id: SERIAL PRIMARY KEY
- name: VARCHAR(30)
- price: INTEGER

#### User
- id: SERIAL PRIMARY KEY 
- firstName: VARCHAR(150)
- lastName: VARCHAR(150)
- email: VARCHAR(50)
- password: VARCHAR(150)

#### Orders
- id: SERIAL PRIMARY KEY
- id of each product in the order:bigint REFERENCES products(id)
- quantity of each product in the order:INTEGER
- user_id: bigint REFERENCES users(id)
- status of order (active or complete):VARCHAR(60)

# Order_product
- order_id :BIGINT REFERENCES orders(id)
- product_id :BIGINT REFERENCES products(id)
- quantity :INTEGER
- id : SERIAL PRIMARY KEY

-------------------------------------------------------------------------------

