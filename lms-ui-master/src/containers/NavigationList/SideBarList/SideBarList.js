import React, { Component } from 'react';
import SideBarRoleList from './SideBarRoleList/SideBarRoleList';

class SideBarList extends Component {
    render() {
        return (
            <div>
                <p>Dashboard</p>
                <SideBarRoleList />
            </div>
        );
    }
}

export default SideBarList;