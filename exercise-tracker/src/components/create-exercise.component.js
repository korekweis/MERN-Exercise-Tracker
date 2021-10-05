import React, { Component } from 'react';
/**when you use datepicker always np
 * npm install react-datepicker
 */
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
    //create constructor firsr 
    constructor(props) {
        super(props);

        /** We want to make sure that the this.something refers to the class 
         * so we have to create some vars to connect the functions
         */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        /*state is how you create variables in react
        When you update the state, you update the page with 
        the new values
        */
        this.state = {
            username: '',
            description: '', 
            duration: 0, 
            date: new Date(), 
            users: []
        }
    }

    /** will be called before everything is loaded to the page */
    componentDidMount() {
        //use a test user first 
        /*this.setState({
            users: ['test user'], 
            username: 'test user'
        })*/

        /** We will get through axios now */
        axios.get('http://localhost:5000/users/')
            .then(response => {
                //check if there is atleast one user in the database
                if (response.data.length > 0) {
                    this.setState({
                        /** map all the users and display the usernames */
                        users: response.data.map(user => user.username), 
                        /** set the username to the first user in the database */
                        username: response.data[0].username
                    })
                }
            })
    }

    //username
    onChangeUsername(e) {
        this.setState({
            /*the target is the textbox and the value is the input in textbox */
            username: e.target.value
        });
    }

    //description
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    //duration
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    /*date -> date will be passed since the program will use a calendar 
    and the date used will be the date being passed as param*/
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    //when the form is submitted 
    onSubmit(e) {
        //prevent the default html submit behavior to take place 
        e.preventDefault();

        const exercise = {
            //set everything 
            username: this.state.username, 
            description: this.state.description, 
            duration: this.state.duration, 
            date: this.state.date
        }

        console.log(exercise)

        /** Connecting to the backend with axios */
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        /** once an exercise has been made we want to bring the user 
         * back to the homepage
         */
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {/**CHECK WHAT IS <select ref="userInput"> */}
                        <select ref="userInput"
                        required 
                        className="form-control"
                        value={this.state.username}
                        /** onChange -> whenever you will change the selection */
                        onChange={this.onChangeUsername}>
                            {
                                /**this.state.users -> array of all users in the database and it will map */
                                this.state.users.map(function(user) {
                                    return <option
                                    key={user} 
                                    /*key and value is user*/
                                    value={user}> 
                                    {/** user will also be the text being displayed */}
                                    {user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input 
                                type="text"
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}