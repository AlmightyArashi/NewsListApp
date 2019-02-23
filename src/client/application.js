import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './state';
import HomePage from './pages/home-page';

class Application extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<HomePage></HomePage>
			</Provider>
		);
	}
}

render(<Application />, document.getElementById('app'));