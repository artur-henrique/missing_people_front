const options = {
	values: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
	titles: ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espirito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins']
};

const listOfPeople = document.querySelector('.ul-people');
const endpoint = `http://localhost:3000/person`;

let imgPersonPathAux = './img/pessoa.png';

function createPerson(personName, city, state, age, imgPersonPath = imgPersonPathAux) {
	const li = document.createElement('li');
	li.classList.add('a-person-card');
	li.innerHTML = `
	<div class="card" style="width: 18rem;">
		<img src="${imgPersonPath}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${personName}</h5>
		</div>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">${age} anos</li>
			<li class="list-group-item">${city}, ${state}</li>
		</ul>
		<div class="card-body">
			<a href="#" class="card-link">Encontrado</a>
		</div>
	</div>`

	return li;
}

function calcAge(date) {
	const dob = new Date(date);
	const dobDay = dob.getDate();
	const dobMonth = dob.getMonth();
	const dobYear = dob.getFullYear();
	const today = new Date();
	const todayDay = today.getDate();
	const todayMonth = today.getMonth();
	const todayYear = today.getFullYear();

	let age = todayYear - dobYear;

	if (todayMonth > dobMonth) {
		return age;
	} else if (todayMonth === dobMonth) {
		if (dobDay > todayDay) {
			return --age;
		} else {
			return age;
		}
	} else if (todayMonth < dobMonth) {
		return --age;
	}
}


async function fetchPeople() {
	try {
		const people = await fetch(endpoint);
		const jsonPeople = await people.json();
		return jsonPeople;
	} catch (error) {
		console.log(error)
	}
}

async function loadPeople(){
	const people = await fetchPeople();
	console.log(people);

	for (let person of people) {
		const age = calcAge(person.dob);
		const li = createPerson(person.fullName, person.city, person.state, age);
		listOfPeople.appendChild(li);
	}

}

loadPeople();


//TESTE MOCKADO
// const person = createPerson('personName', 'city', 'state', 20, imgPersonPathAux);
// listOfPeople.appendChild(person);