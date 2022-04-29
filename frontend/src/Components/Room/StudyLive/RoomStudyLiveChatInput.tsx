import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, useTheme, InputBase, styled } from '@mui/material';
import { Send } from '@mui/icons-material';

const SendBtn = styled(Button)(({ theme }) => ({
  background: theme.palette.icon,
  color: theme.palette.main,
  '&:hover': {
    background: theme.palette.icon + '90',
  },
}));

function RoomStudyLiveChatInput() {
  const theme = useTheme();
  const session = useSelector((state: any) => state.openvidu.session);
  const { profileImg } = useSelector((state: any) => state.account);
  const [message, setMessage] = useState<string>('');

  const sendChat = () => {
    session.signal({
      data: JSON.stringify({ message: message, profileImg: profileImg }),
      to: [],
      type: 'chat',
    });
    setMessage('');
  };

  const sendChatByKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="align_center">
      <div style={{ background: theme.palette.icon, marginRight: '1vw', borderRadius: '3px' }}>
        <InputBase
          sx={{ flex: 1, p: 0.3 }}
          onChange={handleChange}
          value={message}
          onKeyPress={sendChatByKeyboard}
        />
      </div>
      <SendBtn onClick={sendChat}>
        <Send />
      </SendBtn>
    </div>
  );
}

export default RoomStudyLiveChatInput;
