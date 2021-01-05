//const url = "/api/upload";
function uploadImage() {
    const url = 'https://api.cloudinary.com/v1_1/jstazn/image/upload';
    const preset = 'gqnfw2b1'
    const form = document.querySelector("form");

    // form.addEventListener("submit", (e) => {
    // e.preventDefault();

        //idk what queryselector does
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

        
        
        
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
            formData.append("file", file);
            formData.append('upload_preset', preset);

            fetch(url, {
            method: "POST",
            body: formData
            })
                .then((response) => {
                console.log(response)
                return response.text();
            })
                .then((data) => {
                    console.log(JSON.parse(data))


                return JSON.parse(data).url
                //     console.log(JSON.parse(data).public_id)
                    
                //document.getElementById("data").innerHTML += data;
            });
    }
    // });
}
