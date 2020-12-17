//delete later
function toggleLogin() {

    var urlParams = new URLSearchParams(window.location.search);
    var updateBlog = document.getElementById("update-blog");
    var myBlogs = document.getElementById("my-blogs");
    var deleteButton = document.getElementById("delete");
    var undoDeleteButton = document.getElementById("undoDelete");

    if (urlParams.get('id')) {
        fetch(`/api/blog/${urlParams.get('id')}`, {
            method: 'get',
            headers: {
                'Authorization': getCookie('jwt')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data || data.msg === "Invalid , authorization denied") {
                console.log('no')
                return
            }

            //console.log(data)
            document.getElementById('title').innerHTML = data.header
            document.getElementById('desc').innerHTML = data.body
            
            if (data.isDeleted) {
                deleteButton.style.display = "none";
                undoDeleteButton.style.display = "block;inline";
            }
            else {
                deleteButton.style.display = "block;inline";
                undoDeleteButton.style.display = "none";
            }

        })
        .catch(function(error) {
            console.log(error);
        });
    
        updateBlog.style.display = "block";
        myBlogs.style.display = "none";
    }
    else {
        updateBlog.style.display = "none";
        myBlogs.style.display = "block";
    }
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}