import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '', 
        }
    }

    //username
    onChangeUsername(e) {
        this.setState({
            /*the target is the textbox and the value is the input in textbox */
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username, 
        }

        console.log(user)

        /** Sending data to the backend with axios:  */
        axios.post('http://localhost:5000/users/add', user)
            /**print the result */
            .then(res => console.log(res.data));

        /**instead of going back to the homepage, we will stay in this page 
         * and set another username to blank
         */
       this.setState({
           username:""
       })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}