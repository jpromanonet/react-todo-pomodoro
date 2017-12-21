import React from 'react';
import Countdown from '../../countdown';

import * as FontAwesome from 'react-icons/lib/fa';

import moment from 'moment';
import classNames from 'classnames';

import styles from './component.pcss';

class ListItem extends React.Component {
	state = {
		editing: false,
		title: this.props.item.title,
	};

	onStart = () => {
		this.props.onStart(this.props.item.slug);
	};

	onDone = () => {
        this.props.onDone(this.props.item.slug);
	};

	onDelete = () => {
		this.props.onDelete(this.props.item.slug);
	};

	onEdit = () => {
		const { editing, title } = this.state;

		if (editing) {
			this.props.onUpdate(title, this.props.item.slug).then(() => {
				this.setState({
					editing: !editing,
				});
			});
		} else {
			this.setState({
				editing: !editing,
			});
		}
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	componentWillReceiveProps(nextProps) {
		const { item } = nextProps;

		this.setState({
			title: item.title
		})
	}

	render() {
		const { item } = this.props;
		let { status } = item;


		const now = moment();
		const minutes = parseInt(moment.duration(item.startedAt.diff(now)).asMinutes());

		if (status === 'In Progress' && minutes <= 0) {
			status = 'Fail';
		}

        return (
            <li>
				<a href='#'>
					{  ( status !== "Done" && status !== "Fail" )  && <FontAwesome.FaCheck onClick={this.onDone} /> }
                    <FontAwesome.FaPencil onClick={this.onEdit} />
                    <FontAwesome.FaClose onClick={this.onDelete} />
				</a>
				{
					status === "Done" ?
						<div>
							<del>
								{this.state.title}
							</del>
						</div>
					:
						<div className={classNames(styles.task, status === "Fail" && styles.failedTask)}>

							{
                                this.state.editing ? (
									<input
										type="text"
										name="title"
										placeholder="Enter Task title"
										className={styles.editTask}
										value={this.state.title}
										onChange={this.onChange}
									/>
                                ) : this.state.title
                            }
                            <div className={styles.taskRightSection}>
                                { ( !this.state.editing && status === "In Progress" ) && <Countdown startedAt={item.startedAt}/> }
                                { ( !this.state.editing && status === "Initial" ) && <span className={styles.taskAction} onClick={this.onStart}>Start</span> }
								{ this.state.editing && <span className={styles.taskAction} onClick={this.onEdit}>Save</span> }
							</div>
						</div>
                }
            </li>
		);
	}
}

export default ListItem;
