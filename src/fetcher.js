import constant from './constants';
import client from './client';

const getdatafordaterange = (from, to) => {
	client.search({
  		index: constant.index,
  		body: {
			size: 0,
		   	aggs: {
		      lastday: {
		         filter: {
		            range: {
		               created: {
		                  gte: `now-${from}d`,
		                  lte: `now-${to}d`
		               }
		            }
		         },
		         aggs: {
		            filterbycountry: {
		               terms: {
		                  field: "country"
		               },
		               aggs: {
		                  filterbyref: {
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
		console.log(response);
	});
};

export {
	getdatafordaterange
}