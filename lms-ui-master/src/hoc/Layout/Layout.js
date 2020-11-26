import React from 'react';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = ( props ) => (
        <Aux>
            <Toolbar />
            <SideBar />
            

            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
        
);

export default layout;