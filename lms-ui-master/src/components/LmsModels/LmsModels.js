import React from 'react';
import classes from './LmsModels.css';
//import RoleView from './RoleModels/RoleView/RoleView';
import RoleList from '../../containers/LmsBuilder/Role/RoleList/RoleList'
import RoleCreate from '../../containers/LmsBuilder/Role/RoleCreate/RoleCreate';
import { Route, Switch } from 'react-router-dom';

const lmsModels = (props) => {
    console.log(props);
    return (
        <div className = {classes.LmsModels}>
            <Switch>
                    <Route path = "/role-view" exact component = {RoleList} />
                    <Route path = "/role-create" component = {RoleCreate} />
            </Switch>
        </div>
    );
        
};

export default lmsModels;