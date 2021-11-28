let key = "";
let userid = "";
let secondsSinceEpoch;
let timer = 5;
let code = "";
let code_new = "";
let secs;
let hash = "";
let hashInBase64 = "";
let key_sign = "";
let result = "";


async function getKey(id) {
    let response = await fetch(`http://127.0.0.1:5000/key/${id}`)
    let data = await response.json();
    return data;
}

function seconds() {
    secondsSinceEpoch = Math.round(new Date().getTime() / 1000);
    return secondsSinceEpoch;
}

function sign_string(key, to_sign) {
    key = CryptoJS.enc.Utf8.parse(key)
    to_sign = CryptoJS.enc.Utf8.parse(to_sign)
    return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, key))

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

async function main() {
    if (localStorage.getItem("userid") == null) {
        userid = Math.random().toString(8).substr(2, 6);
        localStorage.setItem("userid", userid);
    } else {
        userid = localStorage.getItem("userid")
        console.log(userid)
    }

    if (localStorage.getItem("key") == null) {
        let key = await getKey(userid);
        localStorage.setItem("key", key);
    } else {
        key = localStorage.getItem("key")
        console.log(key)
    }

    let id = document.getElementById("userid");
    let clock = document.getElementById("timer");
    let codes = document.getElementById("codes");

    code = sign_string(key, seconds()).substring(0,6);
    codes.innerHTML = "Code: " + code;
    id.innerHTML = "User ID: " + userid;

    setInterval(countdown, 1000);


    function countdown() {
        if (timer == -1) {
            let secondss = seconds()
            code_new = sign_string(key, secondss).substring(0, 6);
            console.log(code_new);
            console.log(secondss)
            codes.innerHTML = "Code: " + code_new;
            timer = 5;
        } else {
            clock.innerHTML = "New code in " + timer + " seconds!";
            timer--;
        }
    }
}

main();
