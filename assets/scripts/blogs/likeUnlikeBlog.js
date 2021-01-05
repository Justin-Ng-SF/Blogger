
function likeUnlikeBlog(e) {
    const uuid = e.dataset.header;

    fetch(`/api/blog/${uuid}/like`, {
        method: 'put',
        headers: {
            'Authorization': getCookie('jwt')
        },
    })
    .then(response => response.json())
    .then(data => {
    if(data.msg === "Blog already liked"){
        fetch(`/api/blog/${uuid}/unlike`, {
        method: 'put',
        headers: {
            'Authorization': getCookie('jwt')
        },
        })
        .then(response => response.json())
        .then(data => {
            setTimeout(function(){document.location.reload()},500);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else setTimeout(function(){document.location.reload()},500);
    
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