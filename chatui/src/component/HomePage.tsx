import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material';

const HomePage = () => {
  
  const handleClick = () => {
    window.location.href = '/login';
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      <Button
        sx={{
          mt: 1,
          mr: 1,
          color: 'grey', // Set the text color to grey
          borderColor: '#fcdaea', // Set the border color
          '&:hover': {
            borderColor: '#f7e3ed', // Change border color on hover
          },
          '&:focus': {
            borderColor: '#f7e3ed', // Change border color on focus
          },
        }}
        variant="outlined"
        startIcon={<ChatBubbleOutlineIcon />}
        onClick={handleClick}
      >
        Chat With Us
      </Button>
    </div>
  );
};

export default HomePage;
