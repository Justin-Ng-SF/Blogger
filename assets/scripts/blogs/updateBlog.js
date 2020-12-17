function updateBlog() {
    var urlParams = new URLSearchParams(window.location.search);
    var newTitle = document.getElementById('title')?.value;
    var newDesc = document.getElementById('desc')?.value;

    var body = {
        body: newDesc,
        header:  newTitle
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
                `
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