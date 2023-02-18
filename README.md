## React-Express-app

# INTRODUCTION

This React project has a functional login page, based on Token Storage that expires 15 minutes after logging in.

Once the user is logged in correctly (i.e. credentials: { email: "user1@veridas.com", password: 1234 } ), 
the token is created and the user can access to the main page.

The main page has access to the Users and Students. That change according to the role from the logged user:
	
	+ Admin role ( can see Users and Students ) 
	{
		email: "user1@veridas.com",
		password: 1234 
	}
	
	+ Teacher role ( can see Students ) 
	{ 
		email: "user2@veridas.com",
		password: 5678
	}

The Users / Students that appear on the layout are displayed by data that is loaded in the backend ( Express.js ). Because of
that, is required to initialize the backend before the frontend. I will show the steps now!

# STARTING THE APP

In order to start this app properly, We need to run the framework that manage the frontend (ViteJS):

First: Booting the backend

  In the main project folder, type in the console

    cd src/express_project

    npm install

    npm run start-services

    npm run start dev
    
  Note: You can restore the default values in the Users, Teachers and Students database by typing the following command lines:
  	
	npm run unseed
	
	npm run seed

Second: Booting the Frontend
  1. If you are located in the console, go to the main project folder and type:

    npm install

    npm run dev
    
    
 The console will display the url to connect so you can start interacting with the app



