import React from 'react'
import Button from '@material-ui/core/Button';

function Popup(props) {
    return (props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner">
                {props.children}
            </div>
        </div>
    ): "";
}

export default Popup
