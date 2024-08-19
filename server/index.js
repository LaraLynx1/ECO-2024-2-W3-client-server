const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const db = {
	players: [],
};

app.get('/users', (request, response) => {
	response.send(db);
});

app.post('/user', (request, response) => {
	const { body } = request;

	console.log(body);

	//en la varibale existe se guarda la posicion donde esta el jugador dentro del vector o -1 si no existe
	const existe = db.players.findIndex((item) => item.name === body.name);

	if (existe == -1) {
		// No existe
		console.log('Player already exists');
		db.players.push(body);
	} else {
		console.log('Player already exists');

		db.players[existe] = body;
	}

	response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
});

app.listen(5050, () => {
	console.log(`Server is running on http://localhost:${5050}`);
});
