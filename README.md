# ZSSN - Zombie Survival Social Network

## System Dependencies
- Node.js
- Mongodb
- Postman

## System setup
- On terminal digit **npm install**
- On Postman import the file **ZSSN.postman_collection.json**

## System start
- Run the command **npm start**

## System follow-up
After the system is started, open Postman to reach the endpoints.

## System endpoints

Add users to the database

method: **POST** (create)
endpoint: /users
input fields:

	{
		name: Henrique,
		age: 18,
		gender: Male,
		lastlocation:
	    		{
	      		longitude: -20.010101,
			latitude: 20.010101
	    	},
		inventory:
	    		{
	     		water: 10,
			food: 10,
			medication: 10,
			ammunition: 10
	    	}
	}
  
Upon create Users, the system will set:

	{
		id: 5c987fb63df5394610e0f819,
		inventoryLocked: false,
		infectedReports: 0,
		status: "Survivor"
	}
  
Update survivor location

method: **POST** (update)
endpoint: /users/laslocation
input fields:

	{
		id: 5c987fb63df5394610e0f819,
		lastlocation:
			{
			longitude: -22.020202,
			latitude: -25.050505
		}
	}
	
Flag survivor as infected

method: **POST** (update)
endpoint: /users/infected
input fields:

	{
		id:"5c987fb63df5394610e0f819"
	}
  
After flagging the survivor as infected, the system will increment in infectedReports:

	{
		name: Henrique,
		age: 18,
		id: 5c987fb63df5394610e0f819,
		gender: Male,
		lastlocation: 
			{
			longitude: -22.020202,
			latitude: -25.050505
		},
		inventory:
			{
			water: 10,
			food: 10,
			medication: 10,
			ammunition: 10,
		},
		inventoryLocked: false,
		infectedReports: 1
	}
  
- If the user would have 2 infectedReports your status will be changed to "Dangerous"
- After 3 infectedReports, the "inventoryLocked" will be set to true and your status will be changed to "Dangerous".

### The users can be deleted through the DELETE request

method: **DELETE**
endpoint: /users
input fields:

	{
		id: 5c987fb63df5394610e0f819
	}
	
### The users can be find by ID, just put the id after users/ in the URL

method: **GET**
endpoint: /users
input fields:

#### URL: localhost:3000/users/5c987fb63df5394610e0f819

## Development
- Trade itens
- Porcentage Users: infected and non infected
