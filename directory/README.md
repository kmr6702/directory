How to Run the System locally:

Prerequisites
*Before running the system, ensure the following is installed
-Node.js 
-PostgreSQL

Setting up the system locally:
1. Clone the repository
 https://github.com/kmr6702/directory.git

2. Use npm to install all dependencies
 npm install 

3. Set up PostgreSQL database
 Open PostgreSQL terminal 
 Create a new database ex: CREATE DATABASE customers;
 Add a table by running the following SQL command:

        CREATE TABLE customers (
            id SERIAL PRIMARY KEY,
            customer_name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            company_name VARCHAR(255),
            phone VARCHAR(255),
            profile_picture_url TEXT,
            contract_start_date DATE,
            contract_end_date DATE
        );
 In server.js replace username, database, and password with your information 

4. Start the system 
 Navigate into the back-end folder 
 Run `node server.js`
 Navigate into the directory folder with `cd directory`
 Run `npm start`



Base Functionality
The system allows:
- Adding customers
- Deleting customers
- viewing customers

The system validates:
- the format of the phone number
- the format of the email
- the entire form is fill out, apart from the profile picture

The tech stack for this system is:
-Front-end
    -React
    -Axios
-Back-end
    -Node.js + Express.js
    -PostgreSQL

Added Functionality 
- I added the ability to modify a customer entry as an easy way to fix mistakes without deleting and rentering the customer
- I used react-datepicker at the method of entering contract dates so there was little possibilty of user mishap when adding in dates in terms of formating
