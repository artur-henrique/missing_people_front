const listOfPeople = document.querySelector('.ul-people');
const endpoint = `http://localhost:3000/person`;

// Event
listOfPeople.addEventListener('click', async (e) => {
	if (e.target.innerHTML === 'Encontrado'){
		const id = +e.path[2].querySelector('.no-display').innerHTML;
		const deletedUser = await deletePerson(id);
		location.reload();
		return deletedUser;
	}
})


let imgPersonPathAux = './img/pessoa.png';

function createPerson(id, personName, city, state, age, imgPersonPath = imgPersonPathAux) {
	const li = document.createElement('li');
	li.classList.add('a-person-card');
	li.innerHTML = `
	<div class="card" style="width: 18rem;">
		<img src="${imgPersonPath}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${personName}</h5>
			<div class="no-display">${id}</div>
		</div>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">${age} anos</li>
			<li class="list-group-item">${city}, ${state}</li>
		</ul>
		<div class="card-body">
		<button class="btn btn-danger" type="button" title="Apagar cadastro">Encontrado</button>
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

async function deletePerson(id) {
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "DELETE"
	}
	const promisse = await fetch(`http://localhost:3000/person/${id}`, config);
	return promisse;
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

export default async function loadPeople(){
	const people = await fetchPeople();

	for (let person of people) {
		const age = calcAge(person.dob);
		const li = createPerson(person.id, person.fullName, person.city, person.state, age);
		listOfPeople.appendChild(li);
	}

}

loadPeople();