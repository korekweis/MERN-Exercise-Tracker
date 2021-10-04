import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            //create an empty array of exercises first
            exercises: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                //setting the list of exercises to the exercises in the database
                this.setState({ exercises: response.data });
            })
    }


    render() {
        return (
            <div>
                <p>You are on the Exercises List component</p>
            </div>
        )
    }
}