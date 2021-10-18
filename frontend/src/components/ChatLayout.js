import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Space } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, Route, Switch } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const mockRooms = [
  { _id: '1', name: 'General', description: 'General discussion' },
  { _id: '2', name: 'Random', description: 'Random talks' },
  { _id: '3', name: 'Tech', description: 'Technology and programming' },
];

const Placeholder = ({ title }) => (
  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <MessageOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
    <Title level={3} style={{ color: '#8c8c8c' }}>{title}</Title>
  </div>
);

const ChatLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

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

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.ItemGroup key="g1" title={!collapsed && "Public Rooms"}>
            {mockRooms.map(room => (
              <Menu.Item key={room._id} icon={<MessageOutlined />}>
                <Link to={`/room/${room._id}`}>{room.name}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
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
            <Route path="/room/:id" component={() => <Placeholder title="Chat interface coming soon" />} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatLayout;
