import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import AppBar from '../node_modules/material-ui/AppBar';
import Sidebar from './sidebar';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { StickyContainer, Sticky } from 'react-sticky';
import LineChartItem from './linechart'

import HeartEngine from './heartengine'

const DEVICE_ID = 'octopicorn'
const DEVICE_NAME = 'openbci'


export default class App extends React.Component {
  render() {
    return (
      <div>
				<div className={styles.hero}>
					<div className={styles.header}>
						heart engine
					</div>
					<div className={styles.graphics}>
						<div className={styles.heroCharacter}></div>
						<div className={styles.heroHeart}></div>
					</div>
					<div className={styles.heroDescription}>
						Augment your game with heart data
					</div>
					<div className={styles.heroSignup}>
						<div className="createsend-button" data-listid="r/30/409/0FC/6FD71765C4993641">
						</div>
					</div>
				</div>
				<StickyContainer>
					<div className={styles.sidebar}>
							<Menu />
					</div>
					<div className={styles.main}>
						<EndpointSection name="beat"
														 demo={<BeatDemo />}
														 description="A message is emitted on every heart beat."
						/>
						<EndpointSection name="bpm"
														 demo={<BpmDemo />}
														 description="A message is sent every 3 heart beats extrapolating the rate of beats per minute."
						/>
						<EndpointSection name="nervous"
														 demo={<NervousDemo />}
						/>
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
				<MenuItem name="nervous" />
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
				<a href={'#' + this.props.name}>{this.props.name}</a>
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
				<Endpoint {...this.props} />
			</div>
		)
	}
}

class Endpoint extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true
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
					<h1>{this.props.name}</h1>
				</div>
				{ this.state.open ?
					<div className={styles.endpointDetails}>
						<p>{this.props.description}</p>
						<div className={styles.codeWrapper}>
							<Request metric={this.props.name} />
							<Response metric={this.props.name} />
						</div>
						{this.props.demo}
					</div>
					: null
				}
			</div>
		)
	}
}

class Request extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.codeSnippet}>
				<div className={styles.codeSnippetTitle}>Request</div>
				<div className={styles.codeSnippetDetails}>
					<pre><code>
						{JSON.stringify({
							"type": "subscription",
							"deviceName": "openbci",
							"deviceId": "octopicorn",
							"metric": this.props.metric
						}, null, 2) }
					</code></pre>
				</div>
			</div>
		)
	}
}

class Response extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let value = this.props.value || 1;
		return (
			<div className={styles.codeSnippet}>
				<div className={styles.codeSnippetTitle}>Response</div>
				<div className={styles.codeSnippetDetails}>
				<pre><code>
					{JSON.stringify({
						"channel_0": 1,
						"deviceName": "openbci",
						"deviceId": "octopicorn",
						"metric": this.props.metric
					}, null, 2) }
				</code></pre>
			</div>
			</div>
		)
	}
}

@HeartEngine()
class BeatDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showHeart: false,
			timeout: null
		}
	}

	componentWillMount() {
		let { stream } = this.props;
		let params = {
			deviceId: DEVICE_ID,
			deviceName: DEVICE_NAME,
		}
		stream.subscribe('beat', params, this.onBeat)
	}

	componentWillUnmount() {
		clearTimeout(this.state.timout);
	}

	onBeat = () => {
		let self = this;
		this.setState({showHeart: true})
		this.state.timout = setTimeout(() => {
			self.setState({showHeart: false})
		}, 250)
	}

	render() {
		return (
			<div className={styles.demo}>
				{ this.state.showHeart ?
					<div className={styles.heart}></div>
					: null}
			</div>
		)
	}
}

@HeartEngine()
class BpmDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			bpm: 86,
		}
	}

	componentWillMount() {
		let { stream } = this.props;
		let params = {
			deviceId: DEVICE_ID,
			deviceName: DEVICE_NAME,
		}
		stream.subscribe('bpm', params, this.onBpm)
	}

	componentWillUnmount() {
		clearTimeout(this.state.timout);
	}

	onBpm = (msg) => {
		this.setState({bpm: msg['channel_0']})
	}

	render() {
		return (
			<div className={styles.demo}>
				<div className={styles.bpm}>
					{ this.state.bpm } <span className={styles.bpmUnits}>bpm</span>
				</div>
			</div>
		)
	}
}

@HeartEngine()
class NervousDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nervous: true,
		}
	}

	componentWillMount() {
		let { stream } = this.props;
		let params = {
			deviceId: DEVICE_ID,
			deviceName: DEVICE_NAME,
		}
		stream.subscribe('nervous', params, this.onNervous)
	}

	componentWillUnmount() {
	}

	onNervous = (msg) => {

	}

	render() {
		return (
			<div className={styles.demo}>
				<div className={styles.nervous}>
						<div>Cool cat</div>
						<div>Excited</div>
						<div>Incredibly Nervous</div>
				</div>
			</div>
		)
	}
}
