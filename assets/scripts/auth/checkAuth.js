
fetch(`/api/auth/isuser`, {
method: 'get',
headers: {
    'Authorization': getCookie('jwt')
},})
    .then(response => response.json())
    .then(data => {
        console.log(data.msg)
        if (data.msg !== 'Account found') {
            console.log(document.cookie)
            //document.cookie = null;
            //setTimeout(function(){document.location.href = "/"},1);

        }
    })

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}