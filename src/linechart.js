import React, { Component, PropTypes } from 'react';
import styles from './linechart.scss';
import { Line as LineChart } from 'react-chartjs';
import lineChartOptions from './linechart_options';
import lineChartStyles from './linechart_styles';
import HeartEngine from './heartengine'

@HeartEngine()
export default class LineChartItem extends Component {
	static propTypes = {
		stream: PropTypes.object,
		actions: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.chartData = {
			labels: Array.apply(null, { length: 200 }).map(() => ''),
			datasets: Array.apply(null, { length: 1 }).map(() => { return { data: [] }; })
		};
		this.state = { chartData: this.chartData };
	};

	componentDidMount = () => {
		console.log('chart mounted');
		let { stream } = this.props;
		const params = {
			deviceId: 'octopicorn',
			deviceName: 'openbci'
		};
		stream.subscribe(metric, params, this.onMessage);
		setInterval(this.handleInterval, 150);
	};

	componentWillUnmount = () => {
		let { stream } = this.props;
		const params = {
			deviceId: 'octopicorn',
			deviceName: 'openbci'
		};
		stream.unsubscribe(metric, params);
	};

	handleInterval = () => {
		console.log('updating chart');
		this.setState({ chartData: this.chartData });
	};

	onMessage = (msg) => {
		console.log('message received');
		this.addDataPoint(0, msg);
	};

	addDataPoint = (channel, msg) => {
		let value = msg['channel_' + channel];
		this.chartData.datasets[0] = Object.assign({}, this.chartData.datasets[0], {
			data: [...this.truncate(this.chartData.datasets[0].data)].concat([value])
		});
	};

	truncate = (data) => {
		return data.length > 200 ? data.slice(1) : data;
	};

	render() {
		let data = this.state.chartData;
		Object.assign(data.datasets[0], lineChartStyles);

		return (
			<div className={styles.root}>
				<LineChart className={styles.lineChart}
									 data={data}
									 options={lineChartOptions}
									 width="500"
									 height="50"
				/>
			</div>
		);
	}
}
