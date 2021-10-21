import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Space } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ChatRoom from '../pages/ChatRoom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Placeholder = ({ title }) => (
  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <MessageOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
    <Title level={3} style={{ color: '#8c8c8c' }}>{title}</Title>
  </div>
);

const ChatLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get('/api/chat/rooms');
        setRooms(data.length > 0 ? data : [
          { _id: '1', name: 'General', description: 'General discussion' },
          { _id: '2', name: 'Random', description: 'Random talks' },
          { _id: '3', name: 'Tech', description: 'Technology and programming' },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const menuItems = [
    {
      key: 'g1',
      label: !collapsed && "Public Rooms",
      type: 'group',
      children: rooms.map(room => ({
        key: room._id,
        icon: <MessageOutlined />,
        label: <Link to={`/room/${room._id}`}>{room.name}</Link>,
      })),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={250}>
        <div style={{ height: '32px', margin: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>{collapsed ? 'C' : 'Chatly'}</Title>
        </div>
        
        <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'center' }}>
          {!collapsed && (
            <Button type="primary" icon={<PlusOutlined />} block>
              New Room
            </Button>
          )}
        </div>

        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={menuItems}
        />
      </Sider>
      
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
          <Space>
            <Title level={4} style={{ margin: 0, lineHeight: '64px' }}>Select a Room</Title>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
          <Switch>
            <Route exact path="/" component={() => <Placeholder title="Select a room to start chatting" />} />
            <Route path="/room/:id" component={ChatRoom} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatLayout;
