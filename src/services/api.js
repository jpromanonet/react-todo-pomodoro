import cosmic from 'cosmicjs'
import moment from 'moment';
import config from '../utils/config';

class ApiService {
	getList = () => {
		const params = {
			type_slug: 'lists',
			sort: '-created_at'
		};
		return new Promise((resolve, reject) => {
			cosmic.getObjectType(config, params, (err, cosmic) => {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
					const data = cosmic.objects.all ? cosmic.objects.all.map(item => {
						return {
							id: item._id,
							slug: item.slug,
							title: item.title,
							status: item.metadata.status,
							startedAt: moment(item.metadata.started_at),
						};
					}) : [];

					resolve(data);
				}
			});
		});
	};

	createTask = ({ title }) => {
		const params = {
			write_key: config.bucket.write_key,
			type_slug: 'lists',
			title,
			content: '',
			metafields: [
				{
					key: 'status',
					value: 'Initial',
				},
			],
		};

		return new Promise((resolve, reject) => {
			cosmic.addObject(config, params, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
		});
	};

	updateTask = (slug, data) => {
		const params = Object.assign({}, data, {
			write_key: config.bucket.write_key,
			slug,
		});

		return new Promise((resolve, reject) => {
			cosmic.editObject(config, params, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
		});
	};

	startTask = (slug) => {
		return this.updateTask(slug, {
			metafields: [
				{
					key: 'status',
					value: 'In Progress',
					type: 'text',
				},
				{
					key: 'started_at',
					value: moment().add(25, 'm').format(),
					type: 'text',
				},
			]
		});
	};

	doneTask = (slug) => {
		return this.updateTask(slug, {
			metafields: [
				{
					key: 'status',
					value: 'Done',
					type: 'text',
				},
			],
		});
	};

	deleteTask = (slug) => {
		const params = {
			write_key: config.bucket.write_key,
			slug,
		};

		return new Promise((resolve, reject) => {
			cosmic.deleteObject(config, params, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
		});
	};
}

export default ApiService;
