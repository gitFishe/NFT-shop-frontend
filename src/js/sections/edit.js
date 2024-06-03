function inputsUserInformation() {
    let data = $.cookie('token')
    console.log(data)

    $(document).ajaxStop(function() {
        $('.edit__content').removeClass('hide');
        console.log('stop')
    })


    $.ajax({
        url: `http://localhost:5000/api/user/`,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${data}`
        },
        success: function(msg) {
            console.log(msg);

            $('#editName').val(msg.name)
            $('#editId').val(msg.username)
            $('#editEmail').val(msg.email)
            $('#editBio').val(msg.bio)
            $('.edit__info-avatar img').attr("src",`http://localhost:5000/${msg.avatarImage}`)

        },
        error: function(msg) {
            console.log(msg);
            msg.responseJSON.errors.forEach((error) => {
                console.error(error.msg);
            });
        }
    });
}
inputsUserInformation()


function updateUserInfo() {
    let token = $.cookie('token')
    console.log(token)

    $(document).ajaxStop(function() {
        $('.edit__content').removeClass('hide');
        console.log('stop')
    })


    if($('#editAvatar') === undefined) {
        console.log('hui')
    }

    var form = new FormData();
    form.append("name", $('#editName').val());
    form.append("bio", $('#editBio').val());
    form.append("email", $('#editEmail').val());
    console.log($('#editEmail').val())
    form.append("avatarImage", $('#editAvatar')[0].files[0]);

    // form.append("backgroundImage", fileInput.files[0], "220903280-3730025968.png");

    $.ajax({
        url: `http://localhost:5000/api/user/updateInfo`,
        type: 'PUT',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: form,
        success: function(msg) {
            console.log(msg);
        },
        error: function(msg) {
            console.log(msg);
            msg.responseJSON.errors.forEach((error) => {
                console.error(error.msg);
            });
        }
    });
}
$('#updateBtn').click(updateUserInfo);


function updateImg() {

}
function uploadImg() {
    let input = $('#editAvatar')
    input.click()

    input.on('change', function(e) {
        console.log(input[0].files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(input[0].files[0]);
        reader.onload = function(e) {
            $('.edit__info-avatar img').attr('src', e.target.result);
        }
    })

}

$('#uploadImg').click(uploadImg);

