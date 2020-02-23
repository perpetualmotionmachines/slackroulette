import React from 'react';
import ChatContainer from './ChatsContainer.jsx'
import Header from './Header.jsx'

const App = () => {
  return (
    <React.Fragment>
    <h1>Hello</h1>
    <div>
      <Header />
    </div>
    <div>
    <ChatContainer />
  </div>
</React.Fragment>
  );
};

export default App;
