import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import AppBar from '../node_modules/material-ui/AppBar';
import Sidebar from './sidebar';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { StickyContainer, Sticky } from 'react-sticky';

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
				<StickyContainer>
					<div className={styles.sidebar}>
							<Menu />
					</div>
					<div className={styles.main}>
						<EndpointSection name="beat" />
						<EndpointSection name="bpm" />
						<EndpointSection name="variability" />
						<EndpointSection name="nervous" />
						<EndpointSection name="scared" />
						<EndpointSection name="dead" />
					</div>
				</StickyContainer>
			</div>
    )
  }
}

class Menu extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Sticky className={styles.menu}>
				<MenuItem name="beat" />
				<MenuItem name="bpm" />
				<MenuItem name="variability" />
				<MenuItem name="nervous" />
				<MenuItem name="scared" />
				<MenuItem name="dead" />
			</Sticky>
		)
	}
}

class MenuItem extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.menuItem}>
				<a href={'#' + this.props.name}>/{this.props.name}</a>
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
			<div className={styles.endpointSection}>
				<a id={this.props.name}></a>
				<h1>/{this.props.name}</h1>
				<p>Global bootstrap css import works too as you can see on the following button.</p>
				<Endpoint />
			</div>
		)
	}
}

class Endpoint extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	toggleView() {
		this.setState({open: !this.state.open})
	}

	render() {
		return (
			<div>
				<div className={styles.endpoint}
						 onClick={() => {this.toggleView()}}
				>
					GET /beat
				</div>
				{ this.state.open ?
					<div>
						<CodeSnippet />
						<CodeSnippet />
					</div>
					: null
				}
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
