fetch('/api/blog').then(response => response.json())
    .then(data => {
        let firstdata = JSON.stringify(data)
        //in the html file this is being called in, assigns id='blog' in that html file to this
        document.getElementById('blogs').innerHTML = `<div>${firstdata}</div>`
    });

    // document.getElementById('blogs').innerHTML = `hio`