const DARKBTN = document.querySelector('.dark-mode-toggle');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
	const get = getMode();
	body.classList.add(get);
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
	if (isGet !== null) {
		return isGet;
	}
	return;
}

function setMode(val) {
	localStorage.setItem('Mode', val);
}
