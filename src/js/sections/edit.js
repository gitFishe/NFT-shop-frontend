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