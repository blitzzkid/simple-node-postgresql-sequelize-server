## Prerequisite

- PostgreSQL installed and running
- A database with name `test-db-1` is created (Currently the database connection string is hard-coded in the sequelize.js file. If you use a different database, you need to customise the connection string in that file.)

## Run

```
npm run install
node index.js
```

Then you can import the Insomnia data file (named `insomnia_requests.json) and test the APIs.
