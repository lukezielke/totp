function login(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            userid: document.getElementById("userid").value,
            code: document.getElementById("code").value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data === true) {
                result.innerHTML = "Code valid. Login successful.";
            } else {
                result.innerHTML = "Code invalid. Login failed.";
            }
        })
        .catch(function () {
            result.innerHTML = "UserID invalid. Login failed.";
        });
}
let result = document.getElementById("return");
document.getElementById("loginForm").addEventListener("submit", login);
