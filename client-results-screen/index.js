document.getElementById('fetch-button').addEventListener('click', fetchData);
document.getElementById('stop-fetch').addEventListener('click', pararFetch);

let intervalId;

async function fetchData() {
	intervalId = setInterval(traerDatos, 10000);
}

function pararFetch() {
	console.log('parar fetch');
	clearInterval(intervalId);
	// release our intervalID from the variable
	intervalId = null;
}

async function traerDatos() {
	renderLoadingState();
	console.log('Fetching data...');
	try {
		const response = await fetch('http://localhost:5050/users');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
	} catch (error) {
		console.error(error);
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	if (data.players.length > 0) {
		data.players.forEach((item) => {
			const div = document.createElement('div');
			div.className = 'item';
			div.innerHTML = `
      <img src="${item.profilePicture}" alt="${item.name}'s Profile Picture" />
      <p>Name: ${item.name}</p>
      <p>Choice: ${item.choice}</p>
    `;
			container.appendChild(div);
		});
	}
}
