import React, { Component } from 'react';
import axios from '../../../../axios';

class RoleDelete extends Component {
    state = {
        loadedRole : null
    }

    componentDidUpdate () {
        console.log(this.state.id);
        if(this.props.id) {
            
            if( !this.state.loadedRole ||(this.state.loadedRole && this.state.loadedRole !== this.props.id)){
                axios.put('/posts/' + this.props.id)
                .then( response => {
                    this.setState({ loadedRole : response.data});
                });
            }
        }
    }

    
    deleteRoleHandler = () => {
        axios.post('/roles/' + this.props.id )
        .then(response => {
            console.log(response);
            this.setState({loadedRole : response.data});
        });
        this.props.history.goBack();

    }

    render(){
        let roles = null;
       
        roles = (
            <button onClick = {this.deleteRoleHandler}>Delete</button>
            );
        
        return roles;
    }
}

export default RoleDelete;