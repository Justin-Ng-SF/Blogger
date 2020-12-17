function deleteBlog() {
    var urlParams = new URLSearchParams(window.location.search);

    

    fetch(`/api/blog/${urlParams.get('id')}`, {
        method: 'delete',
        headers: {
            'Authorization': getCookie('jwt'),
        },
    })
    .then(response => response.json())
        .then(data => {
        if(data._id===urlParams.get('id')){
            console.log('success')
            document.getElementById('success').innerHTML = `
                <div style="color:Green;font-size: 1.3rem;">
                Your blog has been successfully deleted! 
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