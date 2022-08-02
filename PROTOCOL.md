# Protocol for node.js back end set up
Two tables for database: 'users' and 'recipes'

## PACKAGE INSTALLATION AND FOLDER/FILE SET UP
1. Ran terminal command `npm init` and configured app with standard settings: [npm/express](https://expressjs.com/en/starter/installing.html)

2. Ran terminal command  `npm install express` to install express middleware package (Created *node_modules* file): [npm/express](https://expressjs.com/en/starter/installing.html)

3. Created *.gitignore* file and added *node_modules*

4. Ran terminal command `npm install pg` to install node-postgress package: [pg](https://www.npmjs.com/package/pg)

5. Ran terminal command `npm install dotenv --save` to install dotenv as a package: [dotenv](https://www.npmjs.com/package/dotenv)

6. Created *.env* file to (later) add environment variables and added *.env* to *.gitignore*

7.  Ran terminal command `npm install --save-dev nodemon` to install nodemon: [nodemon](https://www.npmjs.com/package/nodemon)

8. Created *app.js* for main app file

9. Reconfigured `"main":` from `index.js` to `app.js` in *package.json*

10. Added scripts to run the server in *package.json*

        {
            "start": "node -r dotenv/config app.js",
            "dev": "nodemon -r dotenv/config app.js",
        }

11. Added `"type": "module"` into *package.json* 

        {
            "type": "module",
        }

12. Set up remaining folders/files (`brown`) - See *PLAN.md*
    - `db`
        - `index.js` *(Database credentials as pool)*
        - `scripts`
            - `users` *(users table manipulation methods)*
                - `create.js`
                - `drop.js`
                - `populate.js`
                - `truncate.js`
            - `recipes` *(recipes table manipulation methods)*
                - `create.js`
                - `drop.js`
                - `populate.js`
                - `truncate.js`
    - `libs `
        - `data.js` *(Sample data)*
        - `recipesData.js` *(Sample data)*
    - `models` *(Functionality of requests)*
        - `users.js`
        - `recipes.js`
    - `routes`
        - `users.js`
        - `recipes.js `
    - .env *(environment variables)*
    - .gitignore
    - app.js

## CONFIGURATION OF *app.js*