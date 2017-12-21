import React from 'react';
import { ListItem } from '../task-list';
import * as FontAwesome from 'react-icons/lib/fa';

import ApiService from '../../services/api';

import styles from './component.pcss';

class App extends React.Component {
	state = {
		form: {
			title: '',
		},
		list: [],
		showNewTaskInput: false,
		notification: null,
	};

	types = {
		createTask: 'Task has been created!',
		updateTask: 'Task has been updated!',
		startTask: 'Task is in progress',
		doneTask: 'Task is finished',
		deleteTask: 'Task has been removed from the list',
	};

	constructor() {
		super();
		this.api = new ApiService();
	}

	componentWillMount() {
		this.getData();
	}

	getData = () => {
		return this.api.getList().then((list) => {
			this.setState({
				list,
			}, () => {
				this.resetForm();
			});
		});
	};

	createNotification = (type) => {
		this.setState({
			notification: type,
		});
		setTimeout(() => {
			this.setState({
				notification: null,
			});
		}, 5000);
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
			this.createNotification(this.types.createTask);
		});
	};

	onStart = (slug) => {
		this.api.startTask(slug).then(() => {
			this.getData();
			this.createNotification(this.types.startTask);
		});
	};

	onDone = (slug) => {
		this.api.doneTask(slug).then(() => {
			this.getData();
			this.createNotification(this.types.doneTask);
		});
	};

	onUpdate = (title, slug) => {
		return this.api.updateTask(slug, { title, }).then(() => {
			this.getData();
			this.createNotification(this.types.updateTask);
		});
	};

	onDelete = (slug) => {
		this.api.deleteTask(slug).then(() => {
			this.getData();
			this.createNotification(this.types.deleteTask);
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
        console.log(this.state.notification);
        return (
        	<div>
				{
					this.state.notification &&
						<div className={styles.notification}>
							<p>{this.state.notification}</p>
						</div>

				}
				<div className={styles.list}>
					<h1>
						What To Do
						{
							this.state.showNewTaskInput && <input name="title" className={styles.newTask} placeholder="Task title" value={this.state.form.title} onChange={this.onChange}/>
						}
						<a class='add' href='#'>
							{!this.state.showNewTaskInput?<FontAwesome.FaPlus onClick={this.showNewTaskInput} /> : <FontAwesome.FaCheck onClick={this.onSave} />}
						</a>
					</h1>
					<ul className={styles.listContainer} >
						{
							this.state.list.map((item, key) => (
								<ListItem
									key={key}
									item={item}
									onStart={this.onStart}
									onDone={this.onDone}
									onUpdate={this.onUpdate}
									onDelete={this.onDelete}
								/>
							))
						}
					</ul>
				</div>
				<div className={styles.footer}>
					Created by <a href="http://simplegant.com" target="_blank">SimpleGant</a> & proudly powered by <a href="https://cosmicjs.com" target="_blank">Cosmic JS</a>
				</div>
			</div>
		);
	}
}

export default App;
