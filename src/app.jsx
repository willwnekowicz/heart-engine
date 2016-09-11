import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import AppBar from '../node_modules/material-ui/AppBar';
import Sidebar from './sidebar';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <div>
				<AppBar
					title="Title"
				/>
				<div className={styles.hero}>
				</div>
				<div className={styles.sidebar}>
					<List>
						<ListItem primaryText="/beat" />
						<ListItem primaryText="/bpm" />
						<ListItem primaryText="/variability" />
						<ListItem primaryText="/nervous" />
						<ListItem primaryText="/scared" />
						<ListItem primaryText="/dead" />
					</List>
				</div>
				<div className={styles.main}>
					<EndpointSection />
					<EndpointSection />
					<EndpointSection />
				</div>
      </div>
    )
  }
}

class EndpointSection extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h1>/beat</h1>
				<p>Global bootstrap css import works too as you can see on the following button.</p>
				<CodeSnippet />
				<CodeSnippet />
			</div>
		)
	}
}

class CodeSnippet extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.codeSnippet}>
				<pre><code>
					My pre-formatted code
					here.
				</code></pre>
			</div>
		)
	}
}
