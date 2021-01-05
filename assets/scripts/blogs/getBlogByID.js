function getBlogByID() {
    var urlParams = new URLSearchParams(window.location.search);
    fetch(`/api/blog/${urlParams.get('id')}`, {
        method: 'get',
        headers: {
            'Authorization': getCookie('jwt')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data) {
            return
        }
        console.log(data)
        //html is a concatenated list of all the blogs

        //in the html file this is being called in, assigns id='blog' in that html file to this
        var currentDate = Date.now();
    

            var postedOn = parseInt(Date.parse(data.postedOn))
            var editedOn = parseInt(Date.parse(data.lastEdited))
    
            var timeType = '';
            var passedTime = 0;
            var timeAgoMsg = '';
            //time in seconds
            var eTimeType = '';
            var ePassedTime = 0;
    
            if (parseInt(postedOn)-parseInt(editedOn)!==0) {
                ePassedTime = Math.floor((parseInt(currentDate) - parseInt(editedOn)) / 1000)
                if (ePassedTime === 1) {
                    eTimeType = 'second';
                }else eTimeType = 'seconds';
                if (ePassedTime / 60 >= 1) {
                    //times in minutes
                    ePassedTime = Math.floor(ePassedTime / 60);
                    if (ePassedTime === 1) {
                        eTimeType = 'minute';
                    } else eTimeType = 'minutes';
                    if (ePassedTime / 60 >= 1) {
                        //time in hours
                        ePassedTime = Math.floor(ePassedTime / 60);
                        if (ePassedTime === 1) {
                            eTimeType = 'hour';
                        }else eTimeType = 'hours';
                        if (ePassedTime / 24 >= 1) {
                            //time in days
                            ePassedTime = Math.floor(ePassedTime / 24);
                            if (ePassedTime === 1) {
                                eTimeType = 'day';
                            }else eTimeType = 'days';
                        }
                    }
                }
                timeAgoMsg = `Edited ${ePassedTime} ${eTimeType} ago`
            } else {
                passedTime = Math.floor((parseInt(currentDate) - parseInt(postedOn)) / 1000)
                if (passedTime === 1) {
                    timeType = 'second';
                }else timeType = 'seconds';
                if (passedTime / 60 >= 1) {
                    //times in minutes
                    passedTime = Math.floor(passedTime / 60);
                    if (passedTime === 1) {
                        timeType = 'minute';
                    } else timeType = 'minutes';
                    if (passedTime / 60 >= 1) {
                        //time in hours
                        passedTime = Math.floor(passedTime / 60);
                        if (passedTime === 1) {
                            timeType = 'hour';
                        }else timeType = 'hours';
                        if (passedTime / 24 >= 1) {
                            //time in days
                            passedTime = Math.floor(passedTime / 24);
                            if (passedTime === 1) {
                                timeType = 'day';
                            }else timeType = 'days';
                        }
                    }
                }
                timeAgoMsg = `Posted ${passedTime} ${timeType} ago`
            }
    
    
            var html = `
            <div class="ui card">
            <!-- 
                <div class="image">
                    <img src="/images/avatar2/large/kristy.png">
                </div>
            --!>
            <div class="content">
                <i class="right floated like icon" onclick="likeUnlikeBlog(this)" data-header="${data._id}">${data.likes.length}</i>
                <div class="header">${data.header} by ${data.firstName}</div>
                <div class="meta">
                    <span class="date">${timeAgoMsg}</span>
                </div>
                <div class="description" style="word-wrap: break-word;">
                    ${sanitizeHTML(data.body)}
                </div>
            </div>
            `
        // });

        document.getElementById('blog').innerHTML = html;
    
    })
    .catch(function(error) {
    console.log(error);
    });
}


function sanitizeHTML(text) {
var element = document.createElement('div');
element.innerText = text;
return element.innerHTML;
}
function getCookie(name) {
const value = `; ${document.cookie}`;
const parts = value.split(`; ${name}=`);
if (parts.length === 2) return parts.pop().split(';').shift();
}