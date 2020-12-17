function toggleLogin() {
    //reset input fields
    document.getElementById('first-name-error').innerHTML = ''
    document.getElementById('last-name-error').innerHTML = ''
    document.getElementById('email-error').innerHTML = ''
    document.getElementById('password-error').innerHTML = ''
    document.getElementById('terms-error').innerHTML = ''

    var firstlastname = document.getElementById("first-last-name");
    var register = document.getElementById("register");
    var login = document.getElementById("login");
    var checkbox = document.getElementById("checkbox");

    if (register.style.display === "none") {
        register.style.display = "block";
        firstlastname.style.display = "block";
        checkbox.style.display = "block";
        login.style.display = "none";
    } else {
        register.style.display = "none";
        firstlastname.style.display = "none";
        checkbox.style.display = "none";
        login.style.display = "block";
    }
}