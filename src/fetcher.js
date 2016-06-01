import constant from './constants';
import client from './client';

const getdatafordaterange = (from, to) => {

	return new Promise((resolve, reject) => {
		client.search({
	  		index: constant.index,
	  		body: {
				size: 0,
			   	aggs: {
			      day: {
			         filter: {
			            range: {
			               created: {
			                  gte: `now-${from}d`,
			                  lte: `now-${to}d`
			               }
			            }
			         },
			         aggs: {
			            fltr: {
			               terms: {
			                  field: "country"
			               },
			               aggs: {
			                  fltr: {
			                     terms: {
			                        field: "referer"
			                     }
			                  }
			               }
			            }
			         }
			      }
			   }
	  		}
		}, (error, response) => {
			if(typeof(error) === "undefined"){
				resolve(response.aggregations.day);
			} else {
				reject(response);
			}
		});
	});
};

export {
	getdatafordaterange
}