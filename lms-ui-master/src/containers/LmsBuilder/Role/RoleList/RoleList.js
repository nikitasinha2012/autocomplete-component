import React, { Component } from 'react';
import classes from './RoleList.css';
import axios from '../../../../axios';
import RoleView from '../../../../components/LmsModels/RoleModels/RoleView/RoleView';
import RoleDelete from '../../../../containers/LmsBuilder/Role/RoleDelete/RoleDelete';
import UpdateRole from '../../../../components/LmsModels/RoleModels/UpdateRole/UpdateRole';
import { withRouter } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import StateIconActive from '../../../../components/Ui/IconImages/StateIcons/StateIconActive/StateIconActive';
import StateIconInactive from '../../../../components/Ui/IconImages/StateIcons/StateIconInactive/StateIconInactive';
import Modal from '../../../../components/Ui/Modal/Modal';
import ConfirmationRoleDisable from '../../../../components/LmsModels/Confirmation/ConfirmationRoleDisable/ConfirmationRoleDisable';
import Button from '../../../../components/Ui/Button/Button';

class RoleList extends Component {
    state = {
        checkedRoles: {
            id: {
                value: ''
            },
        },
        roles: [],
        roleStatus: null,
        selectedRoleId : null,
        isRoleActive: false,
        roleUpdateConfirm: false,
        roleDeleteConfirm: false,
        selectedDisableRoleId: null
    }

    roleSelectedId = [];

    componentDidMount () {
        axios.get('/roles')
        .then( response => {
            console.log(response.data);
            //const roles = response.data;
            this.setState({roles: response.data});
             
        })
        .catch(error => {
            console.log(error);
            //this.setState({error: true});
        });;
        
    }

    roleSelectHandler = (roleId) => {
        //console.log(roleId);
        axios.post('/roles/' + roleId + "/active")
            .then(response => {
                console.log(response);
            });
            this.props.history.push('/role-view');
    }

    roleUpdateHandler = (roleId) => {
        //console.log(this.props);
        //this.props.history.push('/role-update');
        this.setState({
            selectedRoleId: roleId,
            roleUpdateConfirm: true
        });
    }

    roleMultipleSelectHandler = (roleId) => {
        console.log(roleId);
        //const roleSelectedId = [];
        let Index = this.roleSelectedId.findIndex(obj => obj === roleId);
        if(Index === -1) {
            this.roleSelectedId.push(roleId);
        } else {
            this.roleSelectedId.splice(Index , 1);
        }
        console.log(this.roleSelectedId);
        // for(let fromElementIdentifier in this.state.checkedRoles) {
        //     roleSelectedId[fromElementIdentifier] = this.state.checkedRoles[fromElementIdentifier].value;
        // } 
        // console.log(roleSelectedId); 
    }

    onDeleteRoleHandler = () => {
        let dataRoleId = [];
        for(let SelectedRole of this.roleSelectedId) {
            dataRoleId.push({'id': SelectedRole});
        }
        console.log('asdasd',dataRoleId);
        axios.post('/roles/disableMultiple' ,dataRoleId)
        .then( response => {
            console.log('delete multiple',response);
        });
    }

    isRoleDeleteConfirm = (roleId) => {
        this.setState({
            roleDeleteConfirm: true,
            selectedDisableRoleId: roleId
        });
    }

    isRoleDeleteCancel = () => {
        this.setState({
            roleDeleteConfirm: false
        });
    }

    updateModal  = (state) => {
        debugger;
        this.setState({roleUpdateConfirm:state});
    }
    
    
    render() {

        // const roleActive = this.state.roleStatus.map(role => {
        //    if(role.status === 'active') {
        //        return <StateIconActive key={role.id} />
        //    } 
        //    else {
        //        return <StateIconInactive key={role.id} />
        //    }
        // });

        const roles = this.state.roles.map(role => {
            return <RoleView 
            key = {role.id}
            name={role.name}
            description={role.description}
            status={role.status}
            clickedDelete={() => this.isRoleDeleteConfirm(role.id)}
            clickedUpdate={() => this.roleUpdateHandler(role.id)}
            roleChecked={() => this.roleMultipleSelectHandler(role.id) }
             />
             
        });
        
        return(
            <Aux>
                <div>
                    {/* <div className = {classes.RoleListheading}>
                        <p>List Of Roles</p> 
                        <button onClick= {this.onDeleteRoleHandler}>Disable Selected</button> 
                    </div>
                    <div className={classes.RoleList}>
                        <div className = {classes.RoleList_container_table}>
                            <table className={classes.RoleList_container}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>State</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr> 
                                </thead>
                                <tbody> 
                                    {roles}
                                </tbody>
                            </table>
                        </div>    
                    </div> */}
                    <div className = {classes.RoleListheading}>
                        <p>List Of Roles</p> 
                        <button onClick= {this.onDeleteRoleHandler}>Disable Selected</button> 
                    </div>


                    <div className={classes.tableMainContainer}>
                    <div className= {classes.tableArea}>
                        <table className= {classes.responsiveTable} >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>State</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td><input type="checkbox" />  Jill</td>
                                    <td>Smith</td>
                                    <td>50</td>
                                    <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </td>
                                </tr> */}
                                {roles}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
                <Modal show={this.state.roleUpdateConfirm}>
                    <UpdateRole updateModal={()=>this.updateModal()} id={this.state.selectedRoleId} />
                </Modal>
                <Modal show={this.state.roleDeleteConfirm}>
                    <ConfirmationRoleDisable disableRole={()=> this.roleSelectHandler()} />
                </Modal>
            </Aux>
        ); 
    }
}

export default withRouter(RoleList);