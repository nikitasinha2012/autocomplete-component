import React from 'react';
import classes from './RoleView.css';

const role = (props) => (
    
                    <tr className={classes.Role_container_header}>
                        <td><input type="checkbox" onChange={props.roleChecked}/></td>
                        
                        <td>{props.name}</td>
                        <td>{props.description}</td>
                        <td>{props.status}</td>
                        <td>
                            <button onClick={props.clickedDelete}>Delete</button>
                        </td>
                        <td>
                            <button onClick={props.clickedUpdate}>Update</button>
                        </td>
                    </tr>
                   
);

export default role;