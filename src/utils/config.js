import isDev from '../isDev';

const config = {
	bucket: {
		slug: process.env.COSMIC_BUCKET || 'pomodorotimer',
		read_key: process.env.COSMIC_READ_KEY,
		write_key: process.env.COSMIC_WRITE_KEY,
	}
};

if (!isDev()) {
	config.bucket.read_key = process.env.COSMIC_READ_KEY;
	config.bucket.write_key = process.env.COSMIC_WRITE_KEY;
}

export default config;
