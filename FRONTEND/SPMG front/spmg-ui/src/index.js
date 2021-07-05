import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
// bibliotecas


import './index.css';
//css's

import App from './pages/home/App';
import adm from './pages/consultas/consultas';
import notfound from './pages/notfound/notfound'
//paginas

import reportWebVitals from './reportWebVitals';

const routing = (

  <Router> 
    <div>
      <Switch>

        <Route exact path="/" component={App}  />{/*Home */}
        <Route path="/adm" component={adm}  />{/*Consultas */}
        <Route  exact path="/notfound" component={notfound}  />{/*not found */}

       <Redirect to = "/notfound"/>  {/* redireciona pra not found  */}


      </Switch>
    </div>
  </Router>

)

ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
