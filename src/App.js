import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeownerNavbar from './components/HomeownerNavbar/HomeownerNavbar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Homepage from './pages/HomePage/HomePage';
import TenantsPage from './pages/TenantsPage/TenantsPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ActiveUserContext from './shared/ActiveUserContext'
import BackendDataService from './utils/BackendDataService';

function App() {

  const [activeUser, setActiveUser] = useState(BackendDataService.loadActiveUser());
  
  return (
    <ActiveUserContext.Provider value={activeUser}>
      <div className="App">
        <HashRouter>
          <HomeownerNavbar onLogout={() => setActiveUser(null)}/>
          <Switch>
            <Route exact path="/"><Homepage onLogin={user => setActiveUser(user)} /></Route>
            <Route exact path="/tenants"><TenantsPage/></Route>
            <Route exact path="/signup"><SignupPage onLogin={user => setActiveUser(user)}/></Route> 
            <Route exact path="/dashboard"><DashboardPage/></Route>
            <Route exact path="/messages"><MessagesPage/></Route>
            <Route path="/"><NotFoundPage/></Route>          
          </Switch>        
        </HashRouter>
      </div>
    </ActiveUserContext.Provider>
  );
}

export default App;
