import cpfIsValid from "./cpfValidation.js";
import ageIsValid from "./ageValidation.js";

const inputs = document.querySelectorAll('[required]');
const form = document.querySelector('[data-formulario]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const dataSumbit = {
        nome: event.target.elements['nome'].value,
        email: event.target.elements['email'].value,
        rg: event.target.elements['rg'].value,
        cpf: event.target.elements['cpf'].value,
        aniversario: event.target.elements['aniversario'].value
    }

    localStorage.setItem('cadastro', JSON.stringify(dataSumbit));

    window.location.href ='/pages/abrir-conta-form-2.html'
})

const errorList = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const messageList = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}


inputs.forEach((element) => {
    element.addEventListener('blur', () => inputValidation(element));
    element.addEventListener('invalid', (e) => e.preventDefault());
});


function inputValidation(input) {
    const errorContent = input.parentNode.querySelector('.mensagem-erro');
    let message = '';
    input.setCustomValidity('');
    input.classList.remove('campo__escrita--erro');

    if (input.name =='cpf' && input.value.length >= 11) {
        cpfIsValid(input);
    }

    if (input.name == 'aniversario' && input.value != '') {
        ageIsValid(input);
    }

    errorList.forEach((element) => {
        if (input.validity[element]) {
            message = messageList[input.name][element]
        }
    })

    const validator = input.checkValidity();

    if (!validator) {
        errorContent.textContent = message;
        input.classList.add('campo__escrita--erro');    
    } else {
        errorContent.textContent = '';
        input.classList.remove('campo__escrita--erro');
        
    }
}