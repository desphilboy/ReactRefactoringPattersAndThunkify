import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from '../../redux';
import Wellcome from '../wellcome';
import Details from '../details';

export const App = () => (
	<Provider store={store}>
		<Router>
			<Route exact path="/">
				<Wellcome />
			</Route>
			<Route path="/profile" component={Details} />
		</Router>
	</Provider>
);
