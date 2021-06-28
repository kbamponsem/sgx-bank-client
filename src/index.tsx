import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { routes } from './routes';
ReactDOM.render(
	<Router>

		<React.StrictMode>
			<Switch>
				{
					routes.map(({ path, Component }, i) => {
						return <Route exact={true} key={i} path={path} render={() => (<Component />)} />
					}
					)
				}
			</Switch>
		</React.StrictMode>
	</Router>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
