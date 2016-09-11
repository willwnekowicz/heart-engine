import React, { Component, PropTypes } from 'react';
import CloudbrainWebsocket from 'cloudbrain-websocket';

const URL = 'http://localhost:31415/rt-stream'

function HeartEngine() {

	let instance = null;

	return (BaseComponent) => class RealtimeComponent extends Component {
		constructor() {
			super();

			if (!instance) {
				this.state = {
					stream: new CloudbrainWebsocket(URL)
				};

				this._connect(this._onOpen, this._onClose);

				this.pendingSubscriptions = [];

				instance = this;
			}

			return instance;
		}

		_connect = (onOpen, onClose) => {
			if (this.state.stream.conn === null) {
				this.state.stream.connect(onOpen, onClose);
			}
		};

		_onOpen = () => {
			console.log('Connected to Heart Engine');
			this._subscribePending();
		};

		_onClose = () => {
			console.log('Disconnected from Heart Engine');
		};

		_subscribePending = () => {
			let sub = {};
			while (this.pendingSubscriptions.length > 0){
				sub = this.pendingSubscriptions.pop();
				this.subscribe(sub.metric, sub.deviceParams, sub.cb);
			}
		};

		subscribe = (metric, deviceParams, cb) => {
			if (!this.state.stream.conn || this.state.stream.conn.readyState !== 1) {
				this.pendingSubscriptions.push({ metric: metric,
					deviceParams: deviceParams,
					cb: cb });
			} else {
				this.state.stream.subscribe(metric, deviceParams, cb);
			}
		};

		unsubscribe = (metric, deviceParams) => {
			this.state.stream.unsubscribe(metric, deviceParams);
		};

		render() {
			return <BaseComponent {...this.props} stream={{subscribe: this.subscribe, unsubscribe: this.unsubscribe }} />;
		}
	};
}

export default HeartEngine;
