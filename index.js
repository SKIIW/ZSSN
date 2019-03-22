var restify = require('restify');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://skiiw:second75@cluster0-u8rhc.mongodb.net/test?retryWrites=true')
    .then(_ => {
        const server = restify.createServer({
            name: 'ZSSN',
            version: 'alpha'
        })

        server.use(restify.plugins.bodyParser())

        const userSchema = new moongose.Schema({
            name: { type: String, required: true },
            id: { type: Number },
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            longitude: { type: Number, required: true },
            latitude: { type: Number, required: true },
            flag: { type: Number, required: true }
        })

        const User = mongoose.model('User', userSchema)

        server.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.jason(users)
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

        server.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                resp.json(user)
            }).catch(error => {
                resp.status(400)
                resp.json({ message: error.message })
            })
        })

        server.listen(3000, () => {
            console.log('Api listening on 3000')
        }, (e) => {
            console.log('error', e)
        })
    })