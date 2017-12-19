import React from 'react';
import moment from 'moment';

import styles from './component.pcss';

class Countdown extends React.Component {
	interval = null;

	componentDidMount() {
		this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { startedAt } = this.props;
		const now = moment();

		const nowSeconds = now.seconds();
		const startedAtSeconds = startedAt.seconds();
		const dif = nowSeconds - startedAtSeconds;

		const minutes = parseInt(moment.duration(startedAt.diff(now)).asMinutes());
		const seconds = dif > 0 ? 60 - dif : Math.abs(dif);

		return (
			<div className={styles.root}>
				<p>
					{
						`${minutes}:${seconds}`
					}
				</p>
			</div>
		);
	}
}

export default Countdown;
