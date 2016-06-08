import * as logger from './src/logger';
import * as fillindex from './src/fillindex';
import * as fetcher from './src/fetcher';
import * as treebuilder from './src/treebuilder';
let day = 0;
logger.initialize();

document.querySelectorAll("button")[0].addEventListener("click", () => {
	setInterval(()=> {
		fillindex.sendrandomactivity();
	}, 50)
});

document.querySelectorAll(".yesterday")[0].addEventListener("click", () => {
	day++;
	fetcher.getdatafordaterange(day + 1, day).then((data) => {
		treebuilder.initializetree(data);
	});
});

document.querySelectorAll(".tomorrow")[0].addEventListener("click", () => {
	if(day === 0) return;
	day--;
	fetcher.getdatafordaterange(day + 1, day).then((data) => {
		treebuilder.initializetree(data);
	});
});

fetcher.getdatafordaterange(day + 1, day).then((data) => {
	treebuilder.initializetree(data);
});