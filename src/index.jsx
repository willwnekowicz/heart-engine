import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import './signup'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './theme'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
	<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
		<App/>
	</MuiThemeProvider>, document.querySelector("#app"));
