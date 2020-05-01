console.log('Add validation!');
console.log(document.querySelector("#name").value);

function validateAll(event) {
    validateName();
    validateCarYMM();
    vali_Date();
    validateDays();
    validateCardNo();
    validateCVV();
    validateExpiry();
    event.preventDefault();
}

function makeValid(field) {
    field.parentElement.classList.add("input-valid");
    return 1;
}

function makeInvalid(field) {
    field.parentElement.classList.add("input-invalid");
    return 0;
}

function addListener(id, func) {
    document.querySelector(id).addEventListener("blur", func);
}

function validateName() {
    let tmp = document.querySelector("#name");
    if(tmp.value.trim() == "")
        return makeInvalid(tmp);
    for(let n = 0; n < 10; n++)
        if(tmp.value.startsWith(n)) {
            return makeInvalid(tmp);
        }
    return makeValid(tmp);
}

addListener("#name", validateName);

function validateCarYear() {
    let year = document.querySelector("#car-year");
    if(year.value.trim() == "")
        return 0;
    if(year.value.length != 4)
        return 0;
    try {
        if(year.value < 1900 || year.value > 2020)
            return 0;
    } catch { return 0; }
}

function validateCarMake() {
    let make = document.querySelector("#car-make");
    if(make.value.trim().length === 0)
        return 0;
}

function validateCarModel() {
    let model = document.querySelector("#car-model");
    if(model.value.trim().length === 0)
        return 0;
}

function validateCarYMM(event) {
    let year = validateCarYear();
    if(event === undefined || (year === 0 && event.target.id === "car-year"))
        return makeInvalid(document.querySelector("#car-year"));
    
    let make = validateCarMake();
    if(event === undefined || (make === 0 && event.target.id === "car-make"))
        return makeInvalid(document.querySelector("#car-make"));

    let model = validateCarModel();
    if(event === undefined || (model === 0 && event.target.id === "car-model"))
        return makeInvalid(document.querySelector("#car-model"));

    if(year === undefined && make === undefined && model === undefined)
        return makeValid(document.querySelector("#car-year"));
}

addListener("#car-year", validateCarYMM);
addListener("#car-make", validateCarYMM);
addListener("#car-model", validateCarYMM);

function vali_Date() {//I'm a comedic genius.
    let d8 = document.querySelector("#start-date");
    if(d8.value === "")
        return makeInvalid(d8);
    let now = Date.now();
    if(d8.valueAsNumber < now)
        return makeInvalid(d8);
    makeValid(d8);
}

addListener("#start-date", vali_Date);

function validateDays() {
    let days = document.querySelector("#days");
    if(days.value < 1 || days.value > 30)
        return makeInvalid(days);
    return makeValid(days);
}

addListener("#days", validateDays);

function LuhnCheck(num) {
    var sum = 0;
    for(let n = 0; n < num.length; n++) {
        let val = parseInt(num.substr(n, 1));
        if(n % 2 === 0) {
            val *= 2;
            if(val > 9)
                val = 1 + (val % 10);
        }
        sum += val;
    }

    return ((sum % 10) === 0);

}

function validateCardNo() {
    var regex = new RegExp("^[0-9]{16}$");
    var cardno = document.querySelector("#credit-card");
    if(regex.test(cardno.value) && LuhnCheck(cardno.value))
        return makeValid(cardno);
    makeInvalid(cardno);
}

addListener("#credit-card", validateCardNo);

function validateCVV() {
    var cvv = document.querySelector("#cvv");
    if(cvv.value.length < 3 || cvv.value.length > 4)
        return makeInvalid(cvv);
    makeValid(cvv);
}

addListener("#cvv", validateCVV);

function validateExpiry() {
    var regex = new RegExp("^[0-9]{2}\/[0-9]{2}$");
    var expiry = document.querySelector("#expiration");
    if(regex.test(expiry.value))
        return makeValid(expiry);
    makeInvalid(expiry);
}

addListener("#expiration", validateExpiry);

document.querySelector("#submit-button").addEventListener("click", validateAll(), false);
