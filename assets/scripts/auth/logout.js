function logout(){
    console.log('logout')
    document.cookie = "jwt="+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    setTimeout(function(){document.location.href = "/"},500);
}
  
