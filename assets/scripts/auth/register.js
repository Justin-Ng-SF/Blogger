function register() {
    console.log(document.getElementById('terms')?.checked)


    if(!document.getElementById('terms')?.checked){
        console.log('off')
        document.getElementById('terms-error').innerHTML = `<div style="color:red;">You must agree to the terms and conditions</div>`
        return
    }
    
    //input field values
    var firstName = document.getElementById('first-name')?.value
    var lastName = document.getElementById('last-name')?.value
    var email = document.getElementById('email')?.value
    var password = document.getElementById('password')?.value
    //var password2 = document.getElementById('r-password2')?.value

    //clear error messages
    document.getElementById('first-name-error').innerHTML = ''
    document.getElementById('last-name-error').innerHTML = ''
    document.getElementById('email-error').innerHTML = ''
    document.getElementById('password-error').innerHTML = ''
    document.getElementById('terms-error').innerHTML = ''

    //object to send
    var body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    }

    //returns jwt token if no errors, else return array of errors
    fetch('/api/auth/register', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        //if a token is returned, register was successful
        if(data.token){
                //if a token was returned, login was successful
                document.cookie = "jwt=" + data.token
                //console.log(5, document.cookie)
                //console.log(data)
                //redirect here
                setTimeout(function(){document.location.href = "/blogs"},500);
        }
        else if(data.errors){
            data.errors.forEach(error => {
                if(error.msg==="User already exists"){
                    document.getElementById('email-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
                }
                if(error.param==="firstName"){
                    document.getElementById('first-name-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
                }
                if(error.param==="lastName"){
                    document.getElementById('last-name-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
                }
                if(error.param==="email"){
                    document.getElementById('email-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
                }
                if(error.param==="password"){
                    document.getElementById('password-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
                }
            });
        }
    })
    .catch(function(error) {
        console.log(error);
    });
    
    //setTimeout(function(){document.location.href = "/test"},500);
}