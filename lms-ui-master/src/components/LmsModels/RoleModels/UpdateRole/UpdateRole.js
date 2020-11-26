import React, { Component } from 'react';
import RoleUpdate from '../../../../containers/LmsBuilder/Role/RoleUpdate/RoleUpdate';
import axios from '../../../../axios';
import Input from '../../../Ui/Input/Input';
import Aux from '../../../../hoc/Aux';
import Button from '../../../Ui/Button/Button';

class UpdateRole extends Component {

    state = { 
        name: '',
        description: '',
        loadedRole: null
    }



    componentDidUpdate () {
        if(this.props.id) {
            if ( !this.state.loadedRole || (this.state.loadedRole && this.state.loadedRole.id !== +this.props.id) ) {
            axios.get('/roles/' + this.props.id)
            .then(response => {
                console.log(response);
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    loadedRole: response.data });
            });
        }
        }
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    uploadRoleHandler = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            description: this.state.description
        };
        console.log(data);
        axios.put('/roles/'+ this.props.id, data)
        .then(response => {
            this.setState({
                name: response.name,
                description: response.description,
                
            });
        });
        this.props.updateModal(false)
    }



    render() {

        // const formElementsArray = [];
        // for ( let key in this.state.roleForm) {
        //     formElementsArray.push({
        //         id: key,
        //         config: this.state.roleForm[key],
        //         //value: key //this.state.loadedRole[name]
        //     });
        // }

        let roleUpdate='' ;
        if (this.state.loadedRole) {
            roleUpdate = (
            <div>
                <h1>Modify Role</h1>
                <form>
                    <input type='text' 
                        value={this.state.name} 
                        onChange={this.onChangeName} />
                    <textarea 
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                    <Button btnType="Cancel">Cancel</Button>
                    <Button btnType="Save" clicked={this.uploadRoleHandler}>Save</Button>
                </form>
            
        </div>
    
            );
        }
        return roleUpdate;
    }
    
}

export default UpdateRole;