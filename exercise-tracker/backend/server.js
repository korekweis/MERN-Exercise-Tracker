const express = require('express');
const cors = require('cors');

//helps to connect to the monggodb 
const mongoose = require('mongoose');

//so that we can have our variables in the .env file
require('dotenv').config();

//creating the express server
const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

//will get uri from the monggodb dashboard
const uri = process.env.ATLAS_URI;
/*starting the connection
    useNewUrlParser - since its a new connection string parser 
    use both whenever you are creating
    
    for the connection string to work, we have to set the environment
    of ATLAS_URI 
*/
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//if url/exercises, it will go to the exercisesRouter right away
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});