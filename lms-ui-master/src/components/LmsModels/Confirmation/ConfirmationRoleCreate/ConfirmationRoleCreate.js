import React from 'react';
import Aux from '../../../../hoc/Aux';

const confirmationRoleCreate = (props) => {
    return (
        <Aux>
            <p>Would you like to assign privileges ?</p>
            <button onClick={props.assignLater}>ASSIGN LATER</button>
            <button>ASSIGN NOW</button>
        </Aux>
    );
};

export default confirmationRoleCreate;