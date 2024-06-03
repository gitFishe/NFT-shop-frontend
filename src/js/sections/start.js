
// function bestNfts() {
//     let token = $.cookie('token')
//
//     $.ajax({
//         "url": "http://localhost:5000/api/nftEntity/getAll",
//         "method": "GET",
//         "timeout": 0,
//         success: function(msg) {
//             console.log(msg);
//         },
//         error: function(msg) {
//             console.log(msg);
//             msg.responseJSON.errors.forEach((error) => {
//                 console.error(error.msg);
//             });
//         }
//     });
// }
//
// bestNfts()