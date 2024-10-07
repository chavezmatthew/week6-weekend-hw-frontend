CREATE DATABASE ecom;

USE ecom;

CREATE TABLE customer (
id INT AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR(75) NOT NULL,
email VARCHAR(150) NULL
);

CREATE TABLE orders (id INT AUTO_INCREMENT PRIMARY KEY,
order_date DATE NOT NULL,
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customer(id)
);


ALTER TABLE customer ADD (phone VARCHAR(16), address VARCHAR(150));

ALTER TABLE customer ADD phone VARCHAR(16);

ALTER TABLE customer 
ADD address VARCHAR(150);


ALTER TABLE customer 
DROP COLUMN address;

SELECT * FROM order_products;

DELETE FROM order_products WHERE order_id = 14;
DELETE FROM orders WHERE id = 14;

ALTER TABLE customer_account MODIFY password_hash VARCHAR(255);

ALTER TABLE products
ADD COLUMN stock_level INT NOT NULL DEFAULT 0;

ALTER TABLE orders
ADD COLUMN status VARCHAR(50) DEFAULT 'Pending',
ADD COLUMN shipment_details VARCHAR(255),
ADD COLUMN expected_delivery_date DATE;

ALTER TABLE orders
ADD total_price FLOAT DEFAULT 0.0 NOT NULL;


ALTER TABLE order_products ADD COLUMN quantity INT NOT NULL DEFAULT 1;

ALTER TABLE products
ADD COLUMN name VARCHAR(255);  

ALTER TABLE orders ADD COLUMN items JSON;

SELECT * FROM order_products WHERE order_id = 55;

ALTER TABLE order_products ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

SHOW CREATE TABLE order_products;

ALTER TABLE order_products DROP PRIMARY KEY;

ALTER TABLE order_products DROP PRIMARY KEY;

SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'order_products';

ALTER TABLE order_products DROP FOREIGN KEY order_products_ibfk_1;
ALTER TABLE order_products DROP FOREIGN KEY order_products_ibfk_2;

ALTER TABLE order_products DROP PRIMARY KEY;

ALTER TABLE order_products ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST;

ALTER TABLE order_products 
ADD CONSTRAINT order_products_ibfk_1 
FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE order_products 
ADD CONSTRAINT order_products_ibfk_2 
FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE order_products DROP FOREIGN KEY order_products_ibfk_1;

ALTER TABLE order_products 
ADD CONSTRAINT order_products_ibfk_1 
FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE;