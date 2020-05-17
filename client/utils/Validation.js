export const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

export const validatePassword = (password) => {

    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(passw)) {
        return true;
    }
    return false;
}

export const validatePhone = (phone) => {
    let valiPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(valiPhone)) {
        return true;
    }
    return false;
}

export const validateMoney = (money) => {
    let valiMoney = /^\d{5,}/;
    if (money.match(valiMoney)) {
        return true;
    }
    return false;
}