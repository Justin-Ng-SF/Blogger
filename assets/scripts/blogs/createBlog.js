function createBlog(){
    console.log('entered')
    var title = document.getElementById("title")?.value;
    var desc = document.getElementById("desc")?.value;

    document.getElementById('title-error').innerHTML = '';
    document.getElementById('desc-error').innerHTML = '';
    
    var body = {
        body: desc,
        header:  title
    }

    console.log(body)


    fetch('/api/blog/new', {
        method: 'post',
        headers: {
            'Authorization': getCookie('jwt'),
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
        .then(data => {
            if(data.errors){
                data.errors.forEach(error => {
                    
                    if(error.param==="body"){
                    document.getElementById('desc-error').innerHTML = `<div style="color:red;">Description is required</div>`
                    }
                    if(error.param==="header"){
                        document.getElementById('title-error').innerHTML = `<div style="color:red;">Title must be between 0-24 characters</div>`
                    }
                
            });
            }
            else if(data.body){
                console.log('success')
                document.getElementById('success').innerHTML = `
                    <div style="color:Green;font-size: 1.3rem;">
                    Your blog has been successfully created! 
                    You will now be redirected to the home page.</div>
                    `
                setTimeout(function(){document.location.href = "/blogs"},1500);
            }
        
        
    })
    .catch(function(error) {
        console.log(error);
    });
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}