import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({ message, severity }) {
    const [open, setOpen] = React.useState(true);
    function handleClose(event, reason) {
        if (reason === "clickaway") {
        return;
        }
        setOpen(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
    }
