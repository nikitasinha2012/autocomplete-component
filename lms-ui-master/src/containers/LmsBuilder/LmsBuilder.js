import React, { Component } from 'react';
//import RoleList from './Role/RoleList/RoleList';
// import Layout from '../../hoc/Layout/Layout';
import Aux from '../../hoc/Aux';
import LmsModels from '../../components/LmsModels/LmsModels';
import RoleCreate from '../LmsBuilder/Role/RoleCreate/RoleCreate';
import { Route, Switch } from 'react-router-dom';
import RoleUpdate from '../LmsBuilder/Role/RoleUpdate/RoleUpdate';
import RoleList from '../LmsBuilder/Role/RoleList/RoleList';
import UpdateRole from '../../components/LmsModels/RoleModels/UpdateRole/UpdateRole';

class LmsBuilder extends Component {
    render() {
        return (

          <LmsModels />

        );
    }
}

export default LmsBuilder;