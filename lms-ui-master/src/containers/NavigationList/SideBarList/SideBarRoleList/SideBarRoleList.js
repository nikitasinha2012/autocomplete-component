import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import RoleList from '../../../LmsBuilder/LmsBuilder';
import classess from './SideBarRoleList.css';

class SideBarRoleList extends Component {
    render() {
        return (
            <div className = {classess.rolemanagement }>
                <p >Role Management</p>
            <ul>
                <li><div className = {classess.SideBarRoleList}>
                    </div><Link to={{
                    pathname: '/role-create'
                }}>Create Role</Link></li>
                <li>
                <div className = {classess.SideBarRoleList}>
                    </div>
                    <Link to="/role-view">View Role</Link></li>
            </ul>
            </div>
        );
    }
}

export default SideBarRoleList;