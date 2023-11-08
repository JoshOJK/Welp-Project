# Welp Group Project

Original Yelp: https://www.yelp.com/

Creators: Josh Krienke: https://github.com/JoshOJK , Stephen Sy: https://github.com/srsy12 , Gino Farfaglia: https://github.com/JustAMan22

Demo Link: https://welp-project.onrender.com

## Features

- User authentication and registration
- Search for businesses by name, category, and price
- View business details, including reviews and ratings
- Add, edit, and delete reviews
- Add, edit, and delete restaurants if creator

- ## Usage

1. Register for a new account or log in if you already have one.
2. Use the search bar to find businesses based on name, category, or price.
3. Click on a business to view detailed information, reviews, and ratings.
4. Add your own review or edit/delete existing ones.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ``` 

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

Languages used: 
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)


