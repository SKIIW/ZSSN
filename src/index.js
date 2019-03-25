var restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

// Mongoose Connection
mongoose.connect('mongodb+srv://skiiw:second75@cluster0-u8rhc.mongodb.net/test?retryWrites=true')
    .then(_ => {
        const server = restify.createServer({
            name: 'ZSSN',
            version: '1.0.0'
        })
        server.use(restify.plugins.bodyParser())

        // Users Schema 
        const userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            status: { type: String, default: "Survivor"},
            infectedReports: { type: Number, default: 0 },

            lastlocation:
            {
                longitude: { type: Number, required: true },
                latitude: { type: Number, required: true },
            },

            inventoryLocked: { type: Boolean, default: false},
            inventory: 
            {
                water: { type: Number, required: true },
                food: { type: Number, required: true },
                ammunition: { type: Number, required: true },
                medication: { type: Number, required: true }
            }
        })

        const User = mongoose.model('User', userSchema)

        // Create Users
        server.post('/users', (req, resp, next) => {
            console.log('POST Create Users', req.body)
            let user = new User(req.body)
            user.save().then(user => {
                resp.json(user)
            }).catch(error => {
                resp.status(400)
                resp.json({ message: error.message })
                return next()
            })
        })

        // List all Users
        server.get('/users', (req, resp, next) => {
            console.log('GET Users List');
            User.find().then(users => {
                console.log('GET /users', users)
                resp.json(users)
                return next()
            })
        })

        // Find User ID
        server.get('/users/:name', (req, resp, next) => {
            console.log('GET Find User ID');
            User.findById(req.params.name).then(user => {
                if (user) {
                    resp.json(user)
                }
                else {
                    resp.status(404)
                    resp.json({ message: 'not found' })
                }
                return next()
            })
        })

        // Update Last Location
        server.post('/users/lastlocation', (req, resp, next) => {
            console.log('POST Update LastLocation')
            console.log(req.body)
            User.findById(req.body.name).then(user => {

                if (req.body.location) {
                    user.lastlocation.longitude = req.body.lastlocation.longitude;
                    user.lastlocation.latitude = req.body.lastlocation.latitude;
                    user.save()
                    resp.json(user)
                }
                else {
                    resp.status(404)
                    resp.json({ message: 'not found' })
                }
                return next()
            })
        })

        // Reports infected users
        server.post('/users/infected', (req, resp, next) => {
            console.log('POST Report infected User')
            console.log(req.body)
            User.findById(req.body.name).then(user => {
                user.infectedReports++

                if (user.infectedReports >= 2) {

                    user.status = "Dangerous"
                }
                if (user.infectedReports >= 3) {

                    user.status = "Infected"
                    user.inventoryLocked = true
                    user.inventory.water = 0
                    user.inventory.food = 0
                    user.inventory.medication = 0
                    user.inventory.ammunition = 0
                }

                user.save()
                resp.json(user)

                return next()
            })
        })

        // Delete User
        server.del('/users', (req, resp, next) => {
            console.log('DELETE User Deleted')
            User.deleteOne({ _id: req.body.id }, function (error) {
                if (error) {
                    resp.status(400)
                    resp.json({ message: error.message })
                    return next()
                }
                resp.send('User was Deleted')
                return next()
            })
        })

// readPercentageOfNonSurvivors
app.route('/survivors/infected')
		.get(survivorController.readPercentageOfNonSurvivorsController);
exports.readPercentageOfNonSurvivors = function(req, res) {
	Survivor.count({}, function(err, totalCount) {
		if (err) res.send(err);
		var totalRegistered = totalCount;

		Survivor.count({inventoryLocked: true}, function (err, infectedCount) {
			if (err) res.send(err);
			var infectedRegistered = infectedCount;

			percentageOfInfected = ((infectedRegistered / totalRegistered) * 100 ).toFixed(2) + "%";

			res.json(percentageOfInfected);
		});
	});
};

// readPercentageOfSurvivors
app.route('/survivors/noninfected')
		.get(survivorController.readPercentageOfSurvivorsController);
exports.readPercentageOfSurvivors = function(req, res) {
	Survivor.count({}, function(err, totalCount) {
		if (err) res.send(err);
		var totalRegistered = totalCount;

		Survivor.count({inventoryLocked: false}, function (err, nonInfectedCount) {
			if (err) res.send(err);
			var nonInfectedRegistered = nonInfectedCount;

			percentageOfNonInfected = ((nonInfectedRegistered / totalRegistered) * 100 ).toFixed(2) + "%";

			res.json(percentageOfNonInfected);
		});
	});
};

        // Server start and message logging
        server.listen(3000, () => {
            console.log('Api listening on 3000');
        }, (e) => {
            console.log('error', e);
        });
    });