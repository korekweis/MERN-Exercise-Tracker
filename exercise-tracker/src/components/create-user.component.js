import React, { Component } from 'react';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                <p>You are on the Create User component</p>
            </div>
        )
    }
}