## Leon's Back End Plan

### Packages to install:
(From W5D5 Hackathon)
- express
- pg
- dotenv
- nodemon

### Add script to package.json
(To enable use of ECMA Scripts)

    {
    "type": "module"
    }

### Folders/File set up
- db
    - scripts
        - index.js *(Database credentials as pool)*
        - users *(users table manipulation methods)*
            - create.js
            - drop.js
            - populate.js
            - truncate.js
        - recipes *(recipes table manipulation methods)*
            - create.js
            - drop.js
            - populate.js
            - truncate.js
- libs 
    - users
        - data.js *(Sample data)*
    - recipes
        - data.js *(Sample data)*
- models *(Functionality of requests)*
    - users.js
    - recipes.js
- routes
    - users.js
    - recipes.js 
- .env *(environment variables)*
- .gitignore
- app.js