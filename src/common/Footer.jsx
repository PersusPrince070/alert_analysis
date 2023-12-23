import React, { useContext, useState, useRef } from "react";
import { ProductContext } from "../pages/Landing";
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const validFileTypes = [
    'text/plain',
    // 'application/pdf',
    // 'application/msword',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const isValidFileType = (file) => {
    return validFileTypes.includes(file.type) || validFileTypes.some(type => file.name.endsWith(type.substring(type.lastIndexOf("/") + 1)));
};

const Footer = () => {
    const [query, setQuery] = useState("")
    const { message, setMessage } = useContext(ProductContext)
    const data = { query }
    const clickButtonRef = useRef(null);
    const [fileContent, setFileContent] = useState("");

    const handleSendMessage = async () => {
        if (query.trim() !== "") {
            setMessage(message => [
                ...message,
                {
                    user: "User",
                    text: query
                },
                {
                    user: "Bot",
                    text: "Loading..."
                }
            ])
            try {
                const res = await fetch('http://localhost:8000/chat', {
                    method: "POST",
                    body: JSON.stringify(data)
                })
        
                if (res.ok) {
                    setQuery("")
                    const response = await res.json()
                    setMessage(message => [
                        ...message.filter(
                            (item) => item.text !== "Loading..."
                        ),
                        {
                            user: "BOT",
                            text: response.message
                        }
                    ])
                }
            }
            catch(error) {
                setQuery("")
                setMessage(message => [
                    ...message.filter(
                        (item) => item.text !== "Loading..."
                    ),
                    {
                        user: "BOT",
                        text: error.message + ". Please ask again in more detail."
                    }
                ])
            }
            setMessage(
                (message) => message.filter(
                    (item) => item.text !== "LOADING"
                )
            )
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            clickButtonRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && isValidFileType(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {    
                const text = e.target.result;
                setQuery((prevQuery) => prevQuery + text);
            };
            reader.readAsText(file);
            
        } else {
            alert('Only text files are allowed.');
            event.target.value = '';
        }
    };

    return (
        <div className="footer-container">
            <TextField
                value={ query }
                className="form-control"
                type="text"
                onKeyDown={ handleKeyDown }
                onChange={ (e) => setQuery(e.target.value) }
                placeholder="Ask any question about your purpose: "
                multiline
                fullWidth
                maxRows={ 5 }
                InputProps={ {
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton component="label">
                                <CloudUploadIcon />
                                <VisuallyHiddenInput
                                    id="fileInput"
                                    type="file"
                                    accept=".txt"
                                    onChange={ handleFileChange }
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                } }
            />
            <Button
                variant="contained"
                size="large"
                endIcon={ <SendIcon /> }
                onClick={ handleSendMessage }
                ref={ clickButtonRef }
            >
                ASK
            </Button>
        </div>
    )
}

export default Footer;