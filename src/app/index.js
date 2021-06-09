import React from 'react';
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
// import api from '../api/'
import Signin from '../components/pages/signin/Signin';
import NavComp from '../components/navComp/NavComp'
import MainPage from '../components/pages/main/MainPage';
import SelectedPost from '../components/pages/main/SelectedPost'
import Settings from '../components/pages/settings/Settings'
import Signup from '../components/pages/signup/Signup'
class App extends React.Component {
 

  
  render() {
    
      const user = localStorage.getItem('user')
    
    
    return (
        
      
        <Router>
            
        
      <div >
          <Switch>
        <Route exact path='/'  component={Signin}/>
        <Route path="/register" component={Signup}/>
        <Route path='/feed'  component={() =><NavComp content={<MainPage user={user}/>} user={user} active="active" titlu="main"/>}/>
        <Route path='/editselectedpost'  component={() =><NavComp content={<SelectedPost currentUserId={user._id}/>} user={user} active="active" titlu="main"/>}/>
          
        
        
        
        <Route path='/settings'   component={() =><NavComp content={<Settings user={user}/>} user={user} active="active" titlu="settings"/>} />
        
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
