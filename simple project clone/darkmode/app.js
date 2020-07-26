const DARKBTN = document.querySelector('.dark-mode-toggle');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
	getMode();
});

DARKBTN.addEventListener('click', (e) => {
	if (e.target.closest('#dark-mode-toggle')) {
		isDark();
	}
});

function isDark() {
	if (!body.classList.contains('darkmode')) {
		body.classList.add('darkmode');
		setMode('darkmode');
	} else {
		body.className = '';
		localStorage.removeItem('Mode');
	}
}

function getMode() {
	const isGet = localStorage.getItem('Mode');
	isGet !== null ? body.classList.add(isGet) : '';
}

function setMode(val) {
	localStorage.setItem('Mode', val);
}
