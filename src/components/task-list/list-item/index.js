import React from 'react';
import Countdown from '../../countdown';

import moment from 'moment';
import classNames from 'classnames';

import styles from './component.pcss';

class ListItem extends React.Component {
	onStart = () => {
		this.props.onStart(this.props.item.slug);
	};

	onDone = () => {
		this.props.onDone(this.props.item.slug);
	};

	render() {
		const { item } = this.props;
		let { status } = item;


		const now = moment();
		const minutes = parseInt(moment.duration(item.startedAt.diff(now)).asMinutes());

		if (status === 'In Progress' && minutes <= 0) {
			status = 'Fail';
		}

		return (
			<li
				className={classNames(styles.root, {
					[styles.statusInitial]: status === 'Initial',
					[styles.statusProgress]: status === 'In Progress',
					[styles.statusDone]: status === 'Done',
					[styles.statusFail]: status === 'Fail',
				})}
			>
				<p>
					{ item.title }
				</p>
				<div className={styles.itemOptions}>
					{
						status === 'In Progress' && (
							<Countdown startedAt={item.startedAt}/>
						)
					}
					{
						status === 'Initial' && (
							<p
								className={styles.actionBtn}
								onClick={this.onStart}
							>
								Start
							</p>
						)
					}
					{
						status !== 'Done' && (
							<p
								className={styles.actionBtn}
								onClick={this.onDone}
							>
								Done
							</p>
						)
					}
				</div>
			</li>
		);
	}
}

export default ListItem;
