import React from 'react';
import classes from './SideBar.css';
import SideBarList from '../../../containers/NavigationList/SideBarList/SideBarList';

const sideBar = (props) => {
    return (
        <div className = {classes.SideBar}>
            <SideBarList />
        </div>
    );
};

export default sideBar;