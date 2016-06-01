import constant from './constants';
import client from './client';

const sendactivity = (senddata) => {
	const d = {
		index: constant.index,
		type: constant.type,
  		body: senddata
	};

	client.index(d, (error, response) => {
		console.log(response);
	});
};

export {
	sendactivity
};