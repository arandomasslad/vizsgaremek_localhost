function forRegister() {
    window.location.href = "/reg.html";
}

document.getElementById('loginForm').onsubmit = async function (event) {
    event.preventDefault();

    const email = event.target.elements.logEmail.value;
    const password = event.target.elements.logPassword.value;

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await res.json();

    if (data.success) {
        window.location.href = data.redirectUrl; // Redirect to the provided URL
    }
    else {
        alert(JSON.stringify(data));
    }
}
