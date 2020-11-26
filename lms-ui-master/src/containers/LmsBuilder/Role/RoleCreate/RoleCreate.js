import React, { Component } from 'react';
import axios from '../../../../axios';
import Input from '../../../../components/Ui/Input/Input';
import classes from './RoleCreate.css';
import Modal from '../../../../components/Ui/Modal/Modal';
import Aux from '../../../../hoc/Aux';
import ConfirmationRoleCreate from '../../../../components/LmsModels/Confirmation/ConfirmationRoleCreate/ConfirmationRoleCreate';
import Button from '../../../../components/Ui/Button/Button';

class RoleCreate extends Component {
    state = {
        roleForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description : {
                elementType: 'textarea',
                elementConfig: {
                    rows: '4',
                    placeholder: 'Description of the role'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        } , 
        formIsValid: false,
        roleCreateConfirm: false
    }
   
    roleDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let fromElementIdentifier in this.state.roleForm) {
            formData[fromElementIdentifier] = this.state.roleForm[fromElementIdentifier].value;
        }    
        //console.log(formData);
    axios.post('/roles', formData)
        
        .then(response => {
           
            //console.log(response);
            this.setState( { roleForm: response.data } );
        });
        this.props.history.replace('/role-view');
    }

    checkValidity (value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    roleInputChangedHandler = (event, roleInputIdentifier) => {
        // console.log(event.target.value);
        const updatedRoleForm = {
            ...this.state.roleForm
        };

       const updatedRoleFormElement = {
           ...updatedRoleForm[roleInputIdentifier]
       }; 

       updatedRoleFormElement.value = event.target.value;
       updatedRoleFormElement.valid = this.checkValidity(updatedRoleFormElement.value, updatedRoleFormElement.validation);
       updatedRoleFormElement.touched = true;
       updatedRoleForm[roleInputIdentifier] = updatedRoleFormElement;
       console.log(updatedRoleFormElement);

       let formIsValid = true;
       for(let roleInputIdentifier in updatedRoleForm) {
           formIsValid = updatedRoleForm[roleInputIdentifier].valid && formIsValid;
       }
       
       this.setState({roleForm: updatedRoleForm, formIsValid: formIsValid});
    }

    roleCreateConfirmHandler = (event) => {
        event.preventDefault();
        this.setState({roleCreateConfirm: true});
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
            <form onSubmit = {this.roleCreateConfirmHandler}>
                {/* onSubmit={this.roleDataHandler} */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.valid}
                        touched = {formElement.config.touched}
                        changed = {(event) => this.roleInputChangedHandler(event, formElement.id)} />
                ))}
                <div className={classes.RoleCreateBtn}>
                <Button btnType="Cancel">Cancel</Button>
                <Button btnType="Save" disabled={!this.state.formIsValid}>Save</Button>
                
                </div>
                
            </form>
        );

        return (
            <Aux>
            <Modal show={this.state.roleCreateConfirm}>
                <ConfirmationRoleCreate assignLater = {this.roleDataHandler} />
            </Modal>
            <div className = {classes.RoleCreatecontainer}>
            <div className = {classes.RoleCreate}>
                <div className = {classes.RoleCreateheader}>CREATE</div>
                {formRole}
            </div>
            </div>
           
            </Aux>

        );
    }
}

export default RoleCreate;