import React from 'react';
import Aux from '../../../../hoc/Aux';
import Button from '../../../Ui/Button/Button';

const confirmationRoleDisable = (props) => {
    return (
        <Aux>
            <p>Are you Sure you want to disable this field from the table?</p>
            <Button btnType="Cancel" clicked={props.cancelRole}>Cancel</Button>
            <Button btnType="Disable" clicked={props.disableRole}>Disable</Button>
        </Aux>
    );
};

export default confirmationRoleDisable;