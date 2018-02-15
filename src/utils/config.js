import isDev from '../isDev';

const config = {
	bucket: {
		slug: 'pomodorotimer',
		read_key: '5K5zvM4TanZ5wX6LLu7oqPxGoiJ6O58aobuTOYf7kzPTN9kaDi',
		write_key: 'ZoqKPjS8SJcM2Ta1LXkCk5rYSCI4r0uSbL8lBxhgxkBSwit8T1',
	}
};

if (!isDev()) {
	config.bucket.slug = process.env.COSMIC_BUCKET;
	config.bucket.read_key = process.env.COSMIC_READ_KEY;
	config.bucket.write_key = process.env.COSMIC_WRITE_KEY;
}

export default config;
