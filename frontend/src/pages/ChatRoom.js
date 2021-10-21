import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, List, Avatar, Typography, Space } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import axios from 'axios';

const { Text } = Typography;

// Determine socket URL based on environment
const ENDPOINT = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5115';
let socket;

const ChatRoom = () => {
  const { id: room } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/api/chat/messages/${room}`);
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();

    // Setup Socket.io
    socket = io(ENDPOINT);
    socket.emit('join', room);

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('message', { room, sender: username, text: message });
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', marginBottom: '20px' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item style={{ borderBottom: 'none', padding: '8px 0' }}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: msg.sender === username ? '#1890ff' : '#87d068' }} />}
                title={<Text strong>{msg.sender}</Text>}
                description={
                  <div style={{
                    background: msg.sender === username ? '#e6f7ff' : '#f6ffed',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    maxWidth: '80%'
                  }}>
                    <Text>{msg.text}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Space direction="horizontal" style={{ width: '100%' }}>
          <Input
            addonBefore="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '150px' }}
          />
          <Input.Search
            placeholder="Type a message..."
            enterButton={<Button type="primary" icon={<SendOutlined />}>Send</Button>}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSearch={(val, e) => sendMessage(e)}
            size="large"
          />
        </Space>
      </div>
    </div>
  );
};

export default ChatRoom;
