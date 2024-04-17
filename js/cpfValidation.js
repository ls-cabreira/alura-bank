export default function cpfIsValid (input) {
    const cpf = input.value.replace(/\.|-/g, "");

    
    if (numberValidation(cpf) || firstDigit(cpf) || lastDigit(cpf)) {
        input.setCustomValidity('invalid');
    }
}


function numberValidation (cpf) {
    const numbers = [
        '00000000000',
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numbers.includes(cpf);
}

function firstDigit (cpf) {
    let total = 0;
    let multiplier = 10;

    for(let i = 0; i < 9; i++) {
        total += cpf[i] * multiplier;
        multiplier--;
    }

    total = (total * 10) % 11;

    if (total == 10 || total == 11) {
        total = 0
    }

    return total != cpf[9];
}

function lastDigit (cpf) {
    let total = 0;
    let multiplier = 11;

    for(let i = 0; i < 10; i++) {
        total += cpf[i] * multiplier;
        multiplier--;
    }

    total = (total * 10) % 11;

    if (total == 10 || total == 11) {
        total = 0
    }

    return total != cpf[10];
}
