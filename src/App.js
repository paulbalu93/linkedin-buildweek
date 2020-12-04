import './App.css';
import Profile from './components/Profile';
import OtherProfiles from './components/OtherProfiles'
import Newsfeed from './components/Newsfeed';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <Route path='/me' exact component={Profile} />
        <Route path='/profile/:id' exact component={OtherProfiles} />
        <Route path='/' exact component={Newsfeed} />
      </Router>
  );
}

export default App;
