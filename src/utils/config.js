import isDev from '../isDev';

const config = {
	bucket: {
		slug: 'pomodorotimer',
		read_key: '',
		write_key: '',
	}
};

if (!isDev()) {
	config.bucket.read_key = process.env.READ_KEY;
	config.bucket.write_key = process.env.WRITE_KEY;
}

export default config;
