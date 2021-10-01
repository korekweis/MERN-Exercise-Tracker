//need since this is a route that we are creating
const router = require('express').Router();
//get the mongoose model that we created
let User = require('../models/user.model');

//first http get request 
router.route('/').get((req, res) => {
    /*.find() - gets all the users in the database 
    then it returns a promise and results are returned in json format
    */
    User.find()
        /*find the users and then res.json means return in json format and return 
        all the users found in the database*/
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*this is if a user is being added */
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });

    //always save the user
    newUser.save()
        //if saved, return a text in json format that user is added or else error
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;