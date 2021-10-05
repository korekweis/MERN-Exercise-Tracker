import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * File has 2 components: 
 * Exercise - function react component
 * Exercise List - class component
 */

/*this is the first component: implemented as a function react component
- doesn't have a state and lifecycle components

- this is usually placed in a separate file but since it's small we can place it in the same file*/
const Exercise = props => (
    //the props are the props passed on from exerciseList()
    <tr>
        {/**this will return a row of the table */}
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        {/**Since the date includes the date and full timezone, we just want access 
        to the date part. */}
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

//this is the second component: implemented as a class component 
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
            }).catch((error) => {
                console.log(error);
            })
    }

    /** For deleting the exercise */
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+ id)
            .then(res => console.log(res.data));
        this.setState({
            //we will return all the elements that doesn't have the exercise_element_id that is being passed
            //it is el._id since seen on monggoDB it shows _id for the element
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        if (this.state.exercises) {
            return this.state.exercises.map(currentExercise => {
                return <Exercise exercise = {currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
            })
        } else {
            return null;
        }
    }


    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}