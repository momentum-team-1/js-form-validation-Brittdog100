console.log('Add validation!');
console.log(document.querySelector("#name").value);

function validateAll(event) {
    validateName();
    validateCarYMM();
    vali_Date();
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
        if(year.value < 1900)
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
    //look into date objects fren ~
}

addListener("#start-date", vali_Date);

function validateDays() {
    let days = document.querySelector("#days");
    if(days.value < 1 || days.value > 30)
        return makeInvalid(days);
    return makeValid(days);
}
