SHOW DATABASES;

CREATE DATABASE watch_credit_shop;

use watch_credit_shop;

DROP DATABASE watch_credit_shop;

show TABLEs

CREATE TABLE customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(255),
    creditBalance BIGINT
);

CREATE TABLE brand (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brandName VARCHAR(50)
);

CREATE TABLE model (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand_id BIGINT,
    modelName VARCHAR(50),
    type ENUM('smartwatch', 'mechanic', 'dress'),
    year DATE,
    basePrice DECIMAL(10, 2),
    description TEXT,
    FOREIGN KEY (brand_id) REFERENCES brand(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

CREATE TABLE extra_accessories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE watches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    model_id BIGINT,
    stockQuantity BIGINT,
    extra_access_id BIGINT,
    FOREIGN KEY (model_id) REFERENCES model(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
    FOREIGN KEY (extra_access_id) REFERENCES extra_accessories(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

CREATE TABLE credit_terms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    termDuration BIGINT,
    interestPercentage BIGINT
);

CREATE TABLE contract (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT,
    watch_id BIGINT,
    contractDate DATE,
    creditTerm BIGINT,
    initialPayment DECIMAL(10, 2),
    totalAmount BIGINT,
    monthlyPayment DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customer(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
    FOREIGN KEY (watch_id) REFERENCES watches(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
    FOREIGN KEY (creditTerm) REFERENCES credit_terms(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

CREATE TABLE payment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT,
    paymentDate DATE,
    amountPaid DECIMAL(10, 2),
    remainingBalance DECIMAL(10, 2),
    paymentType ENUM('card', 'cash', 'click'),
    FOREIGN KEY (contract_id) REFERENCES contract(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

-- ===================================================================

INSERT INTO customer (first_name, last_name, phone_number, email, address, creditBalance) VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', '123 Main St, Cityville', 5000),
('Jane', 'Smith', '0987654321', 'jane.smith@example.com', '456 Oak St, Townsville', 3000),
('Alice', 'Johnson', '1231231234', 'alice.johnson@example.com', '789 Pine St, Villageville', 7000),
('Bob', 'Brown', '3213214321', 'bob.brown@example.com', '135 Maple St, Hamletville', 4000),
('Charlie', 'Davis', '1112223333', 'charlie.davis@example.com', '246 Elm St, Boroughville', 6000),
('Eve', 'Wilson', '4445556666', 'eve.wilson@example.com', '357 Cedar St, Metropolis', 8000),
('Frank', 'Taylor', '7778889999', 'frank.taylor@example.com', '468 Birch St, Capital City', 2000),
('Grace', 'Miller', '2223334444', 'grace.miller@example.com', '579 Ash St, Cosmopolis', 9000),
('Hank', 'Anderson', '5556667777', 'hank.anderson@example.com', '680 Hickory St, Urbania', 10000),
('Ivy', 'Thomas', '8889990000', 'ivy.thomas@example.com', '791 Chestnut St, Ruralville', 1500);

INSERT INTO brand (brandName) VALUES
('Rolex'),
('Omega'),
('Tag Heuer'),
('Seiko'),
('Casio'),
('Fossil'),
('Tissot'),
('Citizen'),
('Swatch'),
('Breitling');

use watch_credit_shop

SELECT * FROM model

INSERT INTO model (brand_id, modelName, type, year, basePrice, description) VALUES
(1, 'Submariner', 'mechanic', '2022-01-01', 10000.00, 'Classic diver\'s watch'),
(2, 'Seamaster', 'mechanic', '2021-05-20', 8000.00, 'Luxury diver\'s watch'),
(3, 'Carrera', 'dress', '2023-02-15', 7000.00, 'Elegant chronograph'),
(4, 'Presage', 'dress', '2020-11-30', 3000.00, 'Classic mechanical watch'),
(5, 'G-Shock', 'smartwatch', '2023-07-10', 500.00, 'Rugged digital watch'),
(6, 'Gen 6', 'smartwatch', '2023-08-25', 300.00, 'Stylish smartwatch with health tracking'),
(7, 'Le Locle', 'dress', '2022-09-05', 1200.00, 'Sophisticated dress watch'),
(8, 'Eco-Drive', 'smartwatch', '2023-10-10', 400.00, 'Solar-powered smartwatch'),
(9, 'Big Bold', 'smartwatch', '2023-03-17', 200.00, 'Bold and colorful smartwatch'),
(10, 'Navitimer', 'mechanic', '2022-04-12', 9000.00, 'Iconic pilot\'s watch');

INSERT INTO watches (model_id, stockQuantity, extra_access_id) VALUES
(1, 50, 1),
(2, 30, 2),
(3, 20, 3),
(4, 40, 4),
(5, 100, 5),
(6, 80, 6),
(7, 25, 7),
(8, 60, 8),
(9, 90, 9),
(10, 10, 10);

INSERT INTO credit_terms (termDuration, interestPercentage) VALUES
(12, 5),
(24, 7),
(36, 10),
(48, 12),
(60, 15),
(6, 3),
(18, 8),
(30, 11),
(42, 13),
(54, 14);

INSERT INTO contract (customer_id, watch_id, contractDate, creditTerm, initialPayment, totalAmount, monthlyPayment) VALUES
(1, 1, '2024-01-01', 1, 2000.00, 10000.00, 667.00),
(2, 2, '2024-02-15', 2, 1600.00, 8000.00, 267.00),
(3, 3, '2024-03-10', 3, 1400.00, 7000.00, 156.00),
(4, 4, '2024-04-25', 4, 600.00, 3000.00, 50.00),
(5, 5, '2024-05-18', 5, 100.00, 500.00, 6.67),
(6, 6, '2024-06-30', 6, 90.00, 300.00, 4.17),
(7, 7, '2024-07-12', 7, 240.00, 1200.00, 66.67),
(8, 8, '2024-08-05', 8, 80.00, 400.00, 22.22),
(9, 9, '2024-09-19', 9, 40.00, 200.00, 11.11),
(10, 10, '2024-10-01', 10, 1800.00, 9000.00, 166.67);

INSERT INTO payment (contract_id, paymentDate, amountPaid, remainingBalance, paymentType) VALUES
(1, '2024-02-01', 667.00, 7333.00, 'card'),
(2, '2024-03-01', 267.00, 7466.00, 'cash'),
(3, '2024-04-01', 156.00, 6844.00, 'click'),
(4, '2024-05-01', 50.00, 2950.00, 'card'),
(5, '2024-06-01', 6.67, 473.33, 'cash'),
(6, '2024-07-01', 4.17, 295.83, 'click'),
(7, '2024-08-01', 66.67, 1066.66, 'card'),
(8, '2024-09-01', 22.22, 377.78, 'cash'),
(9, '2024-10-01', 11.11, 188.89, 'click'),
(10, '2024-11-01', 166.67, 8833.33, 'card');
CREATE TABLE extra_accessories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(100),
    price DECIMAL(10,2)
);

INSERT INTO extra_accessories (typeName, price) VALUES
('Leather Seats', 1200.00),
('Sunroof', 800.00),
('Navigation System', 1000.00),
('Bluetooth Connectivity', 300.00),
('Backup Camera', 400.00),
('Blind Spot Monitor', 500.00),
('Remote Start', 250.00),
('Premium Sound System', 600.00),
('Alloy Wheels', 700.00),
('Roof Rack', 350.00);

SELECT m.basePrice FROM model m
LEFT JOIN watches w ON m.id = w.model_id
LEFT JOIN contract c ON w.id = c.watch_id
WHERE w.id = 5

SELECT * FROM watches 


INSERT INTO contract (customer_id, watch_id, contractDate, creditTerm, initialPayment, totalAmount, monthlyPayment) VALUES
(1, 1, '2024-01-01', 4, 250.00, 1000.00, 250.00);


ALTER TABLE payment ADD COLUMN status ENUM('pending', 'expired') DEFAULT 'pending';

UPDATE payment
SET status = 'expired'
WHERE remainingBalance > 0 AND paymentDate < CURDATE();


INSERT INTO payment (contract_id, paymentDate, amountPaid, remainingBalance, paymentType) VALUES
(2, '2023-11-15', 500.00, 7500.00, 'cash')



SELECT * FROM PAYMENT




{
    "paymentDate": "2024-02-02",
    "paymentType": "cash"
}
