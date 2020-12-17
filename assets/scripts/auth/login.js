function login(){
    //input field values
    var email = document.getElementById('email')?.value
    var password = document.getElementById('password')?.value

    //object to send
    var body = {
        email: email,
        password: password,
    }

    //clear error messages
    if(email){
        document.getElementById('email-error').innerHTML = ''
    }
    if(password){
        document.getElementById('password-error').innerHTML = ''
    }

    //returns jwt token if no errors, else return array of errors
    fetch('/api/auth/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            if(data.token){
                //if a token was returned, login was successful
                document.cookie = "jwt="+ data.token
                console.log(5, document.cookie)

                
                //console.log(data)
                //redirect here
                setTimeout(function(){document.location.href = "/blogs"},500);
            }
            else if(data.errors){
                data.errors.forEach(error => {
                    if(error.msg==="Invalid email or password"){
                        document.getElementById('email-error').innerHTML = `<div style="color:red;">${error.msg}</div>`
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


}