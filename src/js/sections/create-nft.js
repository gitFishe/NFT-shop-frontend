function createNft() {
    let token = $.cookie('token')


    let name = $('#createName');
    let price = $('#createPrice');
    let description = $('#createDescription');
    let img = $('#file-input');

    let form = new FormData();
    form.append("name",name.val())
    form.append("description", description.val())
    form.append("price", price.val())
    form.append("tags", 'TEST')
    form.append("tags", 'HUI')
    form.append("image", img[0].files[0])

    console.log(JSON.stringify(form));
    $.ajax({
        url: "http://localhost:5000/api/nftEntity/create",
        type: 'POST',
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
            msg.responseJSON.message.forEach((error) => {
                console.error(error);
            });
        }
    });
}
$('#createBtn').on('click', createNft);
