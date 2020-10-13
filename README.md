#  Tracking System for Ventilators

# Built With
* Node js
* MongoDB
* Postman api

# Files
* config.js
* index.js
* middleware.js
* server.js

# TEST THE REST API
* Run the index.js in cmd using below command:
  > nodemon index.js
* Then open the postman
* To login go to POST >>localhost:100/login/
* Enter the username and password in json format. Here default username = 'username' and password = 'password'. Then copy the JWT token given by the server
* Add the token to the headers with key as Authorization and value as *bearer $token*.
* After Successful login we can fetch details using following commands:
    >To get the list of all hospitals details use  GET >>localhost:3000/hospital

    > To get the list of all ventilator details use  GET >>localhost:3000/ventilator

    > To Search Ventilator by status use  POST >>localhost:3000/searchventilatorstatus

    > To Search By Hospital name use POST >>localhost:3000/searchhospitalname

    > To Update the Ventilator detail use PUT >>localhost:3000/updateventilator

    > To add Add the Ventilator details use POST >>localhost:3000/addventilator

    > To Add the Hospital details use POST >>localhost:3000/addhospital

    > To Delete the ventilator details use DELETE >>localhost:3000//delete
