# MovieApp

This project intends to simulate a web application where the user is able to search any given movie by typing a tittle name (response includes Series and Videogames). After find the specific movie. the user will be able to see details of any given movie, locate the IMDB link for further details and leave a comment for that specific tittle.


## Details


1. To get all the information of any given movie the app will connect to 'http://www.omdbapi.com/', this external API will provide all the required information such as: actors, release date, director, awards, etc.
The app will provide a basic connection to a local database for test purposes. The local DB will handle all the data for the comments section. To do this task, there is a second API called commentSQL_API. That API is located inside this Git.

2. Since this is a WebApp devoloped for testing purposes, the default connection and port must be set to 'http://localhost:4200'.

3. Just for the same reason as above, the comment API must be set to this default connection and port 'https://localhost:7033/'.

4. To clarify points 3 & 4, the connections and permits between the WebApp and the API are set to use those specific ports.


## Project Status

The WebApp will load a default view with the catalog for "Avatar", all the coincidences will be shown on Cards. Clicking on this cards will load the details section that contains the movie information. At the end of the page there is a section to load all the related comments.

Error: In order to get access to any list of comments, the webApp needs to send a request to the comment API. However the data seems to be undefined at the moment of execution.

There are some folders and files in queue to be deleted. These files were used for testing and learning purpouses. Once the WebApp gets completly integrated, a code cleanup will be executed. In the mean time please ignore the folders with "*-entry" and the files related to Firebase usage. 
