var restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect('mongodb+srv://skiiw:second75@cluster0-u8rhc.mongodb.net/test?retryWrites=true')
    .then(_ => {
        const server = restify.createServer({
            name: 'ZSSN',
            version: 'alpha'
        });

        server.use(restify.plugins.bodyParser())

        const userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            id: { type: Number },
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            location:
            {
                longitude: { type: Number },
                latitude: { type: Number },
            },
            report: { type: Number, default: 0 },
            flag: { type: Boolean, default: false }
        })

        const User = mongoose.model('User', userSchema)


        server.get('/users', (req, resp, next) => {
            console.log('GET /users');
            User.find().then(users => {
                console.log('GET /users', users)
                resp.json(users)
                return next()
            })
        })

        server.get('/users/:id', (req, resp, next) => {

            User.findById(req.params.id).then(user => {
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

        server.post('/users/location', (req, resp, next) => {
            console.log('location')
            console.log(req.body)
            User.findById(req.body.id).then(user => {

                if (req.body.location) {
                    user.location.longitude = req.body.location.longitude;
                    user.location.latitude = req.body.location.latitude;
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

        server.post('/users/report-contamination', (req, resp, next) => {
            console.log('report-contamination')
            console.log(req.body)
            User.findById(req.body.id).then(user => {
                user.report++

                if (user.report >= 3) {
                    user.flag = true
                }
                user.save()
                resp.json(user)

                return next()
            })
        })

        server.post('/users', (req, resp, next) => {
            console.log('POST /users', req.body)
            let user = new User(req.body)
            user.save().then(user => {
                resp.json(user)
            }).catch(error => {
                resp.status(400)
                resp.json({ message: error.message })
            })
        })
        server.del('/users', (req, resp, next) => {
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

        server.listen(3000, () => {
            console.log('Api listening on 3000');
        }, (e) => {
            console.log('error', e);
        });
    });