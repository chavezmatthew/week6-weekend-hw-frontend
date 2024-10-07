# Frontend Ecommerce Application Overview

## About

This is a frontend Ecommerce application designed to interact with the backend of an ecommerce platform. Users can perform various actions such as viewing products, tracking their orders, logging in and signing up. The application provides an intuitive user interface for browsing products and managing customer accounts.

## Setup

1. **Open VS Code**
   - Clone the repository: [GitHub link](https://github.com/chavezmatthew/week6-weekend-hw-frontend.git)

2. **Set up a virtual environment (optional, if using Node Version Manager - NVM):**
   - Ensure you have Node.js installed. You can check by running `node -v` in your terminal.
   - If using NVM, you can install the required Node.js version using:
     ```bash
     nvm install <version>
     ```

3. **Install dependencies:**
   - Navigate to the project directory ecommerce-project.
   - Install the required packages:
     ```bash
     npm install
     ```

## Running the Application

4. **Start the React application:**
   - Run the application using:
     ```bash
     npm start
     ```
   - The application will open in your default web browser, usually at [http://localhost:3000](http://localhost:3000).

## Using Postman

5. **To interact with the backend API:**
   - Use Postman to test the API endpoints. Refer to the backend README for the list of available endpoints.
   - You can import the Postman collection using the `postman_collection` file.

## Accessing Web Pages

6. **Navigate through the application:**
   - Access the main pages directly via your web browser and by using the navigation links.

---

### Notes:
- Ensure your backend server is running before accessing the frontend application to allow proper interaction with the APIs.
- Adjust URLs (e.g., `localhost:3000`) as per your setup or deployment environment.
- For any issues related to dependencies, refer to the `package.json` for scripts and libraries used.

### Additional Features
- This application is built using React Hooks and React Router for navigation.
- Consider setting up a state management solution like Redux or Context API if required for larger state management.