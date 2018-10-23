import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, hashHistory} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// <Route path="/dashboard" component={Dashboard} />
		// <Route path="/settings" component={Settings} />
		// <Route path="/analytics" component={Analytic} />
		// <IndexRoute component={MainApp} />

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Home from './components/Home.jsx';
import Entity from './components/Entity.jsx'
import ParentComponent from './components/UILayout/Parent.jsx';
import Login from './components/Login/Login';
import Onboarding from './components/Onboarding/Onboarding';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Profile from './components/Profile/Profile';
import ProfileEntity from './components/Profile/ProfileEntity';
import Landing from './components/Login/Landing';
import CreateSchema from './components/Schema/CreateSchema';
// import Verification from './components/Login/Verification';
import Registration from './components/Login/Registration';

ReactDOM.render(
	<MuiThemeProvider>
	<Router history ={hashHistory} >
	<Route path="/login" component={Login} />
	<Route path="/landing" component={Landing} />
	
	<Route path="/register" component={Registration} />	
	<Route path="/" component={ParentComponent}>
	<Route path="/entity" component={Entity} />
	<Route path="/myProfile" component={Profile} />
	<Route path="/onboarding" component={Onboarding} />
	<Route path="/createSchema" component={CreateSchema} />
	<Route path="/myProfileEntity" component={ProfileEntity} />
		<IndexRoute component={Home} />
		</Route>
	</Router>
	</MuiThemeProvider>,
 document.getElementById('mountapp'));