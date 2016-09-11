import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './theme'

render(
	<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
		<App/>
	</MuiThemeProvider>, document.querySelector("#app"));
