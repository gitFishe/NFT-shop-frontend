import {authorizationRequest} from "../main.js";

function inputFocus() {
    $('.input').click(function () {
        $(this).find("input").focus();
    })
}

inputFocus()


function hideHeaderElems() {
    if (window.location.href.includes('register.html') || window.location.href.includes('login.html')) {
        $('#btnLogin').hide();
        $('#headerAvatar').hide();
    }
}
hideHeaderElems()


function avatarLink() {
    $.ajax({
        url: `http://localhost:5000/api/user/`,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${$.cookie('token')}`
        },
        success: function(msg) {
            $('#headerAvatar').attr('href',`http://localhost:3000/profile.html?username=${msg.username}`);
            $('#headerAvatar img').attr("src",`http://localhost:5000/${msg.avatarImage}`)
        },
        error: function(msg) {
            console.log(msg);
            msg.responseJSON.errors.forEach((error) => {
                console.error(error.msg);
            });
        }
    });
}
avatarLink()