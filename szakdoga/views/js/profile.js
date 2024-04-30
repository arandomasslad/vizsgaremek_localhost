// változók a jelszó módosításához
const myInput = document.getElementById('editPassword');
const letter = document.getElementById('letter');
const capital = document.getElementById('capital');
const number = document.getElementById('number');
const length = document.getElementById('length');

// oldalról beúszó profil menü megjelenítése
const profile = document.getElementById('profile');
const offcanvas = new bootstrap.Offcanvas(document.getElementById('editProfile'));

profile.addEventListener('click', function () {
    offcanvas.show();
});

// felhasználó email címének kinyerése cookieból:
async function getUserEmail() {
    const res = await fetch('/getUserEmail');
    const data = await res.json();
    console.log(data);
    const email = data.userEmail;
    console.log(email);
    getUser(email);
}

// a felhasználó adatainak lekérdezése és oldalsó menübe írása valamint a felhasználó id-ja
async function getUser(emailFromCookie) {
    console.log('valami');
    const res = await fetch(`/getUser/${emailFromCookie}`);
    const data = await res.json();

    console.log(data);
    const nick_name = data[0].nick_name;
    const email = data[0].email;
    const role = data[0].role;
    const userID = data[0].userid;

    document.getElementById('userid').value = userID;
    console.log(email, nick_name, role);

    let offcanvasBody = `
       
        <div class="row"> <!-- username -->
            <div class="col-3">
                <i class="fa-solid fa-user mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Felhasználó</h5><br class="d-none">
                <h6 class="text-secondary" id="nick_name">${nick_name}</h6>
            </div>

            <div class="col-3">
                <button type="button" class="btn btn-warning border-0 mt-2" onclick="editProfileUsernameModal('${email}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>

        <div class="row"> <!-- email -->
            <div class="col-3">
                <i class="fa-solid fa-envelope mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>E-mail</h5><br class="d-none">
                <h6 class="text-secondary" id="email">${email}</h6>
            </div>
        </div>

        <div class="row"> <!-- password -->
            <div class="col-3">
                <i class="fa-solid fa-lock mt-3"></i>
            </div>

            <div class="col-6 p-0">
                <h5>Jelszó</h5><br class="d-none">
                <h6 class="text-secondary" id="password">**********</h6>
            </div>

            <div class="col-3">
                <button type="button" class="btn btn-warning border-0 mt-2" onclick="editProfilePasswordModal('${email}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
    `;

    document.getElementById('offcanvasBody').innerHTML = offcanvasBody;
}


// a nick_name szerkesztésének modal ablakának megjelenítése
function editProfileUsernameModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileUsernameModal'));
    const profilEmail = document.getElementById('editProfileUsernameModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a nick_name módosítása
async function editNick_name() {
    const modalElements = document.getElementById('editProfileUsernameModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const nick_name = document.getElementById('editNick_name').value;

    const res = await fetch(`/editNick_name/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ nick_name })
    });

    if (res.ok) {
        modal.hide();
        alert('Sikeres módosítás!');
        getUserEmail();
    }
}

// a jelszó módosításának modal ablakának megjelenítése
function editProfilePasswordModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfilePasswordModal'));
    const profilEmail = document.getElementById('editProfilePasswordModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();

    // Amikor beleklikkelünk a jelszó mezőbe, akkor megjelenik a message id-jű div
    myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    // Amikor nem vagyunk a jelszó mezőben, akkor eltűnik a message id-jű div
    myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    myInput.onkeyup = function () {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
}

// a jelszó módosítása
async function editPassword() {
    const modalElements = document.getElementById('editProfilePasswordModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const password = document.getElementById('editPassword').value;
    const password2 = document.getElementById('editPassword2').value;

    if (!password || !password2) {
        alert("Minden mezőt ki kell tölteni te balga!");
        return;
    }

    if (password.length < 8) {
        alert('A jelszónak legalább 8 karakter hosszúnak kell lenni te csacsi!');
        return;
    }

    if (password !== password2) {
        alert('A két jelszó nem egyezik meg te butus!');
        return;
    }

    const res = await fetch(`/editPassword/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        alert('Sikeres módosítás!');
        getUserEmail();
        modal.hide();
    }
}