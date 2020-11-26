import React, { Component } from 'react';
import axios from '../../../../axios';
import UpdateRole from '../../../../components/LmsModels/RoleModels/UpdateRole/UpdateRole';
import Input from '../../../../components/Ui/Input/Input';

class RoleUpdate extends Component {

    state = {
        roleForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Role Name'
                },
                value: ''
            },
            description : {
                elementType: 'textarea',
                elementConfig: {
                    rows: '4',
                    placeholder: 'Role Description'
                },
                value: ''
            }
        } , 
    }


    componentDidUpdate () {
        if(this.props.id) {
            axios.put('/roles' + this.props.id)
            .then(response => {
                console.log(response);
            });
        }
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.roleForm) {
            formElementsArray.push({
                id: key,
                config: this.state.roleForm[key]
            });
        }
        let formRole = (
            <form onSubmit={this.roleDataHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed = {(event) => this.roleInputChangedHandler(event, formElement.id)} />
                ))}
            </form>
        );

        return(
            <div>
            <h1>Add a Role</h1>
            {formRole}
        </div>
            
        );
    }
}

export default RoleUpdate;