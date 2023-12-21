import React, { useState, useContext } from "react";
import { ProductContext } from "../pages/Landing";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


const Header = () => {
    const {message, setMessage} = useContext(ProductContext)

    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);

    return (
        <>
            <div className="header-title">
                <Typography className="title">Alert Analysis</Typography>
                <div className="header-button">
                    <Button className="btn btn-sm" variant="outlined" color="secondary" onClick={toggleShow}>
                        Help
                    </Button>
                    <Button className="btn btn-sm" variant="outlined" color="secondary" onClick={() => setMessage([])}>
                        Clear Chat
                    </Button>
                </div>
            </div>
            <Dialog open={centredModal} onClose={toggleShow} fullWidth maxWidth="md">
                <DialogTitle>Modal title</DialogTitle>
                <DialogContent>
                    <p>Users have to input your requirements more detail.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleShow} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Header;