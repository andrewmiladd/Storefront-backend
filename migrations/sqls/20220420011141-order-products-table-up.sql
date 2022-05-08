/* Replace with your SQL commands */
CREATE TABLE order_product(order_id BIGINT REFERENCES orders(id), product_id BIGINT REFERENCES products(id),quantity integer,id SERIAL PRIMARY KEY);