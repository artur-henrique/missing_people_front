const listOfPeople = document.querySelector('.ul-people');
const endpoint = `http://localhost:3000/person`;

let imgPersonPathAux = './img/pessoa.png';

function createPerson(imgPersonPath, personName, age, city, state) {
    return `<li class="a-person-card">
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
        </div>
    </li>`
}

async function fetchPeople () {
    const people = await fetch(endpoint)
    return people;
}

console.log(fetchPeople());