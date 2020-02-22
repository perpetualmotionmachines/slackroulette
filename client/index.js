import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
// import SignUp from './components/SignUp.jsx';
// import Login from './components/Login.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './stylesheets/tonyStyles.css';

const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));


//Add these routes once merged with Clara and Noah's code

// <Route path="/signup">
// <SignUp />
// </Route>
// <Route path="/login">
// <Login />
// </Route>
