import constant from './constants';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({  
	host: `${constant.server}:${constant.port}`,
	log: 'info'
});

export default client;