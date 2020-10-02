# myWebTools

Google Oauth2.0


 SET UP

First clone the repository to your system and in terminal call the command npm i to install all the essential dependencies.

TO set up database make an account on mongoDB cloud and create a cluster with a project and replace the empty string of dbURI of config/key.js with your mongodb connection string.
Now we are connected with the database.

To connect with google oauth2.0 api go to developer console google and create a project with enabling google plus api. Use clientID and clientSecret in config/key.js.

Use any string in session:key to secure the user login details.

