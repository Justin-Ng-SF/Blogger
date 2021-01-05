async function updateBlog() {
    var urlParams = new URLSearchParams(window.location.search);
    var newTitle = document.getElementById('title')?.value;
    var newDesc = document.getElementById('desc')?.value;


    if(!newDesc){
        document.getElementById('desc-error').innerHTML = `<div style="color:red;">Description is required</div>`
    }
    if(!newTitle){
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
        body: newDesc,
        header: newTitle,
        picture: url
    }



    fetch(`/api/blog/${urlParams.get('id')}`, {
        method: 'put',
        headers: {
            'Authorization': getCookie('jwt'),
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
        .then(data => {
        if(data._id===urlParams.get('id')){
            console.log('success')
            document.getElementById('success').innerHTML = `
                <div style="color:Green;font-size: 1.3rem;">
                Your blog has been successfully updated! 
                You will now be redirected to your blogs.</div>
                `;
            setTimeout(function(){document.location.href = "/myBlogs"},1500);
        } else
        if (!data || data.msg === "Invalid , authorization denied") {
            console.log('no')
            //html msg saying update was unsuccessful
            return
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