export default function ageIsValid (input) {
    const birthDate = new Date(input.value);

    if (!dateCheck(birthDate)) {
        input.setCustomValidity('invalid');
    }
    
}


function dateCheck (dateTest) {
    const today = new Date();
    const dateInput = new Date(dateTest.getUTCFullYear() + 18, dateTest.getUTCMonth(), dateTest.getUTCDate());

    return today >= dateInput; 
}