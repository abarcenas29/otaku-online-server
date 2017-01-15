# Otaku Online

This is the server side of the otaku online marketplace. This is encompases the api endpoints to be called by the front end app.

## Technology Used
* Node JS - core
* Express JS - HTTP server
* db-migrate - migration tool.
* Postgres - RDBMS. More features and has Array and JSON search which reduces unecessary relations.
* clusterJS - Spreading the workload across all threads [Info](https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/)

## Coding Technology
* ES6 Babel
* Standard JS

## Technical Notes
* You need to get the uuid generator to make uuid (not built in apparently) [Install Postgres-contrib](https://www.postgresql.org/download/linux/redhat/), [instructions](http://stackoverflow.com/questions/12505158/generating-a-uuid-in-postgres-for-insert-statement/12505220#12505220)

## Migration Setup
1. `npm install -g pg` for postgres driver
2. Get your postgresql url it should be in this format `pg://username:password@hostname/dbname` put it in your `.env` folder.