import * as sender from './sender';

let data = {
	codeview: "",
	context: document.URL,
	country: "",
	created: Date.now(),
	language: navigator.language || navigator.userLanguage,
	location: {lon: "", lat: ""},
	referer: document.referrer,
	timeOnPage: 0,
	waterclicked: 0
};

const initialize = () => {
	fillgeolocation();

	window.onbeforeunload = function() {
		data.timeOnPage = Date.now() - data.created;
	    sender.sendactivity(data); 
	};

	geoip2.country((geoipresponse) => { 
		data.country = geoipresponse.country.names.en;
	}, 
	(err) => {
		console.log(err);
	});
};

const fillgeolocation = () => {
	if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            data.location.lat = position.coords.latitude;
            data.location.lon = position.coords.longitude;
        });
    }
};

const addwaterclick = () => {
	data.waterclicked++;
};

export {
	initialize,
	addwaterclick
}