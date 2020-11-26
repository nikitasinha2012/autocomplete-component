import React from 'react';
import classes from './Toolbar.css';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <nav>
            <ul className={classes.Toolbaritems}>
                <li className={classes.ToolbarNavigationItem}>
                <a className={classes.ToolbarNavigationItemAnchor}>Account</a>
                </li>
                
            </ul>
        </nav>
    </header>
);

export default toolBar;