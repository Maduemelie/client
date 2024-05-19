// LandingPage.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useSocket } from './SocketContext';

const LandingPage = ({ socket, onLogin }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (userName.trim()) {
      socket.emit('Login-User', {
        user: { id: socket.id, firstName: userName, lastName: '' },
      });
      onLogin(userName, () => {
        navigate('/chat');
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <TextField
        onChange={(e) => setUserName(e.target.value)}
        name="userName"
        type="text"
        label="Name"
        variant="outlined"
        required
        value={userName}
        placeholder="Enter your name"
        InputLabelProps={{ style: { color: 'grey' } }}
        sx={{
          width: '300px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f6d8e0',
            },
            '&:hover fieldset': {
              borderColor: '#f6d8e0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f6d8e0',
            },
          },
        }}
      />
      <Button
        sx={{
          mt: 1,
          mr: 1,
          color: 'grey', // Set the text color to grey
          backgroundColor: '#f7e3ed', // Set the border color
          '&:hover': {
            backgroundColor: '#fcdaea', // Change border color on hover
          },
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        Enter Chat
      </Button>
    </Box>
  );
};

export default LandingPage;
