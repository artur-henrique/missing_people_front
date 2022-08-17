import util from './util.js';

export default class FetchForm {
    constructor() {
        this.registerButton = document.querySelector('#register');
        this.nameField = document.querySelector('.pessoa-nome');
        this.dobField = document.querySelector('.pessoa-dob');
        this.domField = document.querySelector('.pessoa-dom');
        this.cityField = document.querySelector('.pessoa-city');
        this.stateField = document.querySelector('.pessoa-state');
    }

    init() {
        this.registerButton.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!this.nameField.value, !this.dobField.value, !this.domField.value, !this.cityField.value, !this.stateField.value) {
                alert(`Todos os campos são obrigatórios`);
            }

            const payload = {
                fullName: this.nameField.value,
                dob: this.dobField.value,
                dom: this.domField.value,
                city: this.cityField.value,
                state: this.stateField.value
            }

            const person = await this.fetchForm(payload);
            // this.nameField.value = '';
            // this.dobField.value = ''; 
            // this.domField.value = ''; 
            // this.cityField.value = ''; 
            // this.stateField.value = '';
            location.reload();

            return person;
        })

    }

    async fetchForm(payload) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        }

        try {
            const promisse = await fetch('http://localhost:3000/person/', config);
            return promisse;
        } catch (error) {
            console.log(error);
        }
    }
}