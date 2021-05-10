import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeownerNavbar from './components/HomeownerNavbar/HomeownerNavbar';
import Homepage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {

  const [activeUser, setActiveUser] = useState(null)
  
  return (
    <div className="App">
      <HashRouter>
        {/* <HomeownerNavbar/> */}
        <Switch>
          <Route exact path="/" >
            <HomeownerNavbar onLogout={() => setActiveUser(null)}/>
            <Homepage/></Route>
          {/* <Route exact path="/login"><LoginPage onLogin={user => setActiveUser(user)}/></Route>*/}
          <Route exact path="/signup">
            <HomeownerNavbar onLogout={() => setActiveUser(null)}/>
            <SignupPage onLogin={user => setActiveUser(user)}/></Route> 
          <Route path="/"><NotFoundPage/></Route>          
        </Switch>        
      </HashRouter>
    </div>
  );
}

export default App;
