import * as logger from './src/logger';
import * as fillindex from './src/fillindex';
import * as fetcher from './src/fetcher';
logger.initialize();

document.querySelectorAll("button")[0].addEventListener("click", () => {
	setInterval(()=> {
		fillindex.sendrandomactivity();
	}, 200)
});

fetcher.getdatafordaterange(1, 0);