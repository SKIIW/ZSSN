# ZSSN - Zombie Survival Social Network

##System setup##
npm install

##System start##
On a Terminal, run the command mongod;
Go to the zssn folder and open it in a Terminal;
Run npm start;

##System follow-up##
After the system is started, open Postman to reach the endpoints.

##System endpoints##

Add users to the database

method: POST (create)
endpoint: /users
input fields:

	{
		name: Henrique,
		age: 18,
		gender: Male,
		lastLocation:
    {
      longitude: -20.000000,
		  latitude: 20.000000
    },
		inventory
    {
      water: 10,
		  food: 10,
		  medication: 10,
		  ammunition: 10
    },
	}
  
Upon create Users, the system will set:

	{
		"inventoryLocked": false,
		"infectedReports": 0
	}
  
Update survivor location

method: POST (update)
endpoint: /users/laslocation
input fields:

	{
		name: Arthur,
		lastLocation.longitude: -16.682199,
		lastLocation.latitude: -49.2795521,
	}
Flag survivor as infected

method: PUT (update)
endpoint: /flag/infection
input fields:

	{
		name: Henrique
	}
  
After flagging the survivor as infected, the system will increment in infectedReports:

	{
		name: "Henrique",
		age: 18,
		gender: "Male",
		"lastLocation": {
			"longitude": -20.010101,
			"latitude": 20.010101
		},
		"inventory": ["Water", "Food", "Ammunition"],
		"inventoryLocked": false,
		"infectedReports": 1
	}
  
After 3 flags, the "inventoryLocked" will be set to true, starting that the survivor is infected.
