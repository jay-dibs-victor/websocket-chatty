import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const Placeholder = ({ title }) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Title level={2}>{title}</Title>
    <p>Component implementation in progress...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ color: 'white', margin: 0 }}>Chatly</Title>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 16 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={() => <Placeholder title="Chat Interface" />} />
              <Route path="/rooms" component={() => <Placeholder title="Room List" />} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
