import React from 'react';
import { ListItem } from '../task-list';

import ApiService from '../../services/api';

import styles from './component.pcss';

class App extends React.Component {
	state = {
		form: {
			title: '',
		},
		list: [],
		showNewTaskInput: false,
	};

	constructor() {
		super();
		this.api = new ApiService();
	}

	componentWillMount() {
		this.getData();
	}

	getData = () => {
		this.api.getList().then((list) => {
			this.setState({
				list,
			}, () => {
				this.resetForm();
			});
		});
	};

	onChange = (e) => {
		const { form } = this.state;
		form[e.target.name] = e.target.value;
		this.setState({
			form,
		});
	};

	onSave = () => {
		this.api.createTask(this.state.form).then(() => {
			this.getData();
		});
	};

	onStart = (slug) => {
		this.api.startTask(slug).then(() => {
			this.getData();
		});
	};

	onDone = (slug) => {
		this.api.doneTask(slug).then(() => {
			this.getData();
		});
	};

	showNewTaskInput = () => {
		this.setState({
			showNewTaskInput: true,
		})
	};

	resetForm = () => {
		this.setState({
			showNewTaskInput: false,
			form: {
				title: '',
			},
		});
	};

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.mainContainer}>
					<div className={styles.todolistTitleWrapper}>
						<div className={styles.todolistTitle}>
							Tasks
						</div>
						<div className={styles.addNewTaskWrapper}>
							<div onClick={this.showNewTaskInput} className={styles.addNewTask}>Add new task</div>
						</div>
					</div>
					{
						this.state.showNewTaskInput && (
							<div className={styles.newTaskWrapper}>
								<div>
									<input
										type="text"
										className={styles.newTaskInput}
										name="title"
										placeholder="Enter task title"
										value={this.state.form.value}
										onChange={this.onChange}
									/>
								</div>
								<div className={styles.addNewTaskWrapper}>
									<div onClick={this.onSave} className={styles.addNewTask}>Add</div>
								</div>
							</div>
						)
					}
					<ul className={styles.listContainer} >
						{
							this.state.list.map((item, key) => (
								<ListItem
									key={key}
									item={item}
									onStart={this.onStart}
									onDone={this.onDone}
								/>
							))
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
