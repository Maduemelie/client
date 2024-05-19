import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Box,
  // IconButton,
  Button,
  Container,
} from '@mui/material';
// import { Send as SendIcon } from '@mui/icons-material';

interface Message {
  message: string;
  sender: string;
  timestamp: string;
}

const ChatContainer = ({ socket }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [faq, setFaq] = useState<string[]>([]);
  const [timestamp, setTimestamp] = useState('');
  const [sender, setSender] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    console.log('ChatContainer mounted');
    console.log('Socket instance:', socket);

    if (socket) {
      socket.on('Welcome-Message', (data: any) => {
        console.log(data, 'data from server');
        if (data.message && data.faq && data.timestamp) {
          setWelcomeMessage(data.message);
          setFaq(data.faq);
          setTimestamp(data.timestamp);
          setSender(data.sender);
        }
      });
    } else {
      console.log('Socket instance not found');
    }
    socket.on('message', (data: any) => {
      console.log(data, 'message received from server');
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket?.off('Welcome-Message');
      socket?.off('message');
    };
  }, [socket]);

  const handleFaqButtonClick = (faqItem: string) => {
    const messageData: Message = {
      message: faqItem,
      sender: user.firstName,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    if (socket) {
      console.log('Sending message:', messageData);
      socket.emit('message', messageData);
    }

    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const sendMessage = async () => {
    if (currentMessage.trim()) {
      const messageData: any = {
        message: currentMessage,
        sender: user.firstName,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      if (socket) {
        console.log('Sending message:', messageData);
        socket.emit('message', messageData);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: currentMessage,
          sender: user.firstName,
          timestamp: messageData.timestamp,
        },
      ]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container>
      <Box sx={{ maxHeight: '500px', width: '100%', overflowY: 'auto', p: 2 }}>
        <img
          src={require('../asset/Frame 1618868422.png')}
          alt="logo"
          style={
            {
              // position: 'absolute',
              // top: 0,
              // left: 0,
              // width: '120.38px',
              // height: '42px',
              // gap: '9px',
              // opacity: 0,
            }
          }
        />

        {welcomeMessage && (
          <>
            <Typography
              sx={{
                position: 'relative',
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: '0 10px 10px 10px ',
                marginBottom: '8px',
                backgroundColor: 'white', // Primary color
                color: '#666666', // Text color changed to white
                textAlign: 'left',
                wordWrap: 'break-word',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{sender}</span>:{' '}
              {welcomeMessage}
              <div className="clip__top__left"></div>
            </Typography>

            {faq.map((faqItem, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  mt: 1,
                  mr: 1,
                  color: '#666666',
                  borderColor: '#9C2D7A', // Primary color
                  '&:hover': {
                    borderColor: '#f7e3ed',
                  },
                  '&:focus': {
                    borderColor: '#f7e3ed',
                  },
                }}
                onClick={() => handleFaqButtonClick(faqItem)}
              >
                {faqItem}
              </Button>
            ))}

            <Typography sx={{ fontSize: '0.8rem' }}>{timestamp}</Typography>
          </>
        )}

        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius:
                msg?.sender === 'Dandys Bot'
                  ? '0 10px 10px 10px'
                  : '10px 0px 10px 10px ',
              marginBottom: '15px',
              backgroundColor: msg.sender === 'Dandys Bot' ? 'white' : 'white',
              color: '#666666',
              textAlign: 'left',
              float: msg.sender === 'Dandys Bot' ? 'left' : 'right',
              clear: 'both',
              wordWrap: 'break-word',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {msg?.sender !== 'Dandys Bot' ? (
              <div className="clip__top__right"></div>
            ) : (
              <div className="clip__top__left"></div>
            )}

            <Typography dangerouslySetInnerHTML={{ __html: msg.message }} />
            <Typography sx={{ fontSize: '0.7rem' }}>{timestamp}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message"
          variant="outlined"
          sx={{
            mb: 1,
            flex: 1,
            backgroundColor: '#fff',
            width: '332px',
            height: '54px',
            borderRadius: '10px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#EFEFEF',
              },
              '&:hover fieldset': {
                borderColor: '#EFEFEF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#EFEFEF',
              },
            },
          }}
          onKeyPress={handleKeyPress} // Trigger sendMessage on Enter key press
        />
        <Button
          sx={{
            ml: 1,
            width: '79px',
            height: '54px',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            backgroundColor: '#9C2D7A',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#9C2D7A',
            },
            '&:focus': {
              backgroundColor: '#9C2D7A',
            },
          }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatContainer;
