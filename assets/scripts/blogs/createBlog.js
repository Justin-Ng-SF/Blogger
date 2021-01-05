async function createBlog(){
    console.log('entered')
    var title = document.getElementById("title")?.value;
    var desc = document.getElementById("desc")?.value;

    document.getElementById('title-error').innerHTML = '';
    document.getElementById('desc-error').innerHTML = '';
    
    if(!desc){
        document.getElementById('desc-error').innerHTML = `<div style="color:red;">Description is required</div>`
    }
    if(!title){
        document.getElementById('title-error').innerHTML = `<div style="color:red;">Title must be between 0-24 characters</div>`
    }

    var url = '';
    if (document.querySelector("[type=file]").files.length!==0) {
        var msg = url = await uploadImage()
    }

    if (msg === 'Invalid file type' || msg === 'File size too large') {
        return document.getElementById('file-error').innerHTML = `
        <div style="color:Red;font-size: 1.3rem;">
        ${msg}.</div>
        `
    }

    var body = {
        body: desc,
        header: title,
        picture: url
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

async function uploadImage() {
//     <form method="post" enctype="multipart/form-data">
//          <input type="file" name="files">
//     <!-- <input type="submit" value="Upload File" name="submit"> -->
//      </form>

    var url = 'https://api.cloudinary.com/v1_1/jstazn/image/upload';
    const preset = 'gqnfw2b1'
    
    const file = document.querySelector("[type=file]").files[0];
    const formData = new FormData();
    //check image size and type here, jpg, png, bmp
    var imageType = file.name.substring(file.name.length - 3, file.name.length);
    console.log(imageType)

    // if (imageType === 'jpg') {
    //     console.log( 'aaaa file type')
    // }

    if (imageType === "png" || imageType === "jpg" || imageType === "bmp") {
        if (file.size > 3000000) {
            return 'File size too large'
        }

        formData.append("file", file);
        formData.append('upload_preset', preset);

        await fetch(url, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                console.log(response)
                return response.text();
            })
            .then((data) => {
                console.log(JSON.parse(data))
                url = JSON.parse(data).url
                // console.log(JSON.parse(data).public_id)
            
            });
        return url
    }
    else return 'Invalid file type';
}


function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}