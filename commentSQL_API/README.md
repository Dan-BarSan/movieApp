# commentSQL_API

This API has been built to handle and exchange information between the webApp an a local DataBase.


## Details


1. This API is build for a specific test purpose, meaning that the connection is set for a local Databa ( build in MS SQL Server Managment Studio). However the connection string could be changed in order to connecto to any other DB.

2. There is an internal handler that will get the information from the WebApp and decide the type of request that has been made, it will change that data and translate it into a query that can be accepted for the DB. This adds a new layer of security for the webApp.

3. All the CRUD actions have been tested through Swagger. There's no issue found.


## Project Status

The commnetSQL_API is working as intended.

Finished.