function inputFocus() {
    $('.input').click(function () {
        $(this).find("input").focus();
    })
}

inputFocus()


function hideLogin() {
    if (window.location.href.includes('register.html') || window.location.href.includes('login.html')) {
        $('#btnLogin').hide();
        $('#headerAvatar').hide();
    }
}
hideLogin()