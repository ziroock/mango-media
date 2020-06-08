import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Home = () => <h2>Home</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Login = () => <h2>Login</h2>;

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/login" component={Login}/>
            </div>
        </BrowserRouter>
    </div>
  );
};

export default App;
