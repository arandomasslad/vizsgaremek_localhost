const myInput = document.getElementById("password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

function forLogin() {
    window.location.href = "/";
}

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
}

// Amikor a felhasználó elkezd a jelszó mezőbe írni
myInput.onkeyup = function () {

    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}

document.getElementById('regForm').onsubmit = function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const nickName = document.getElementById('nickName').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (!email || !nickName || !password || !password2) {
        alert('Minden mezőt ki kell tölteni!');
        return;
    }

    if (password !== password2) {
        alert('A két jelszó nem egyezik meg!');
        return;
    }

    if (password.length < 8) {
        alert('A jelszónak legalább 8 karakter hosszúnak kell lennie!');
        return;
    }
    // meghívjuk a reg async function-t, amiben átadjuk az emailt, a nick nevet és a jelszót paraméterként
    reg(email, nickName, password);
}

// itt történik a tényleges regisztráció
async function reg(email, nickName, password) {
    const regEmail = email;
    const regNickName = nickName;
    const regPassword = password;

    const res = await fetch('/reg', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: regEmail,
            nickName: regNickName,
            password: regPassword
        })
    });

    const data = await res.json();

    if (res.ok) {
        alert(data);
    } else {
        alert(data);
    }
}

