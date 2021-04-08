import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

const App = () => ( //only bracket because its only return that would be inside the function... only returns JSX
    <Router> 
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );

export default App;
