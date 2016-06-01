import constant from './constants';
import client from './client';

var countries = [
	"Norway",
	"Ghana",
	"England",
	"USA",
	"Finland",
	"Scotland",
	"Iceland"
];

var lang = [
	"nb-NO",
	"gb",
	"en",
	"sv-SE",
	"fr"
];

var ref = [
	"www.vg.no",
	"reddit.com",
	"codepen.io"
];

const sendrandomactivity = () => {
	const d = {
		index: constant.index,
		type: constant.type,
  		body: {
			codeview: "",
			context: document.URL,
			country: countries[Math.floor(Math.random() * countries.length)],
			created: Date.now(),
			language: lang[Math.floor(Math.random() * lang.length)],
			location: {lon: 59.30249860000001, lat: 10.9223491},
			referer: ref[Math.floor(Math.random() * ref.length)],
			timeOnPage: Math.floor(Math.random() * (100000 - 3000) + 3000),
			waterclicked: 0
		}
	};

	client.index(d, (error, response) => {
		console.log(response);
	});
};

export {
	sendrandomactivity
};