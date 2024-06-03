import {dataTabs, underline,fadeIn} from "../main.js";

$(document).ready(function() {
    underline($('.profile__tabs-block'))
    dataTabs($('.profile__tabs-block'), $('.profile__page'), 500)

    $('.btn--filter').on('click', function() {
        $(this).toggleClass('active');
    })
})




// function popup () {
//     let btnOpen = $('#btnPopupOpen');
//     let btnClose = $('#btnPopupClose')
//     let popup = $('.popup');
//
//
//     let canClose = true;
//
//     function showPopup() {
//         popup.addClass('show');
//         $('body').addClass('no-scroll')
//
//     }
//     function hidePopup() {
//         popup.removeClass('show');
//         $('body').removeClass('no-scroll')
//     }
//
//     popup.click(function (event) {
//         if ($('.popup').hasClass('show') && !$(event.target).closest('.popup__content').length && canClose) {
//             hidePopup();
//         }
//     });
//     btnOpen.click(function () {
//         showPopup();
//     })
//     btnClose.click(function () {
//         if(canClose) {
//             hidePopup()
//         }
//     })
//
// }
// popup()




// export function underline(obj) {
//     let line = $(".underline-block");
//     let blocks = $('.profile__pages-block');
//
//     function updateUnderline() {
//         let active = $('.profile__pages-block.active');
//         line.css({
//             "width": active.width(),
//             "margin-left": active.css("padding-left"),
//             "left": active.position().left
//         });
//     }
//     updateUnderline();
//
//
//
//     blocks.mouseover(function(){
//         line.css("transition", "all ease 0.37s" );
//         let position = $(this).position();
//         line.css({
//             "width": $(this).width(),
//             "margin-left": $(this).css("padding-left"),
//             "left": position.left
//         });
//     });
//     blocks.mouseleave(function() {
//         line.css("transition", "all ease .5s" );
//         updateUnderline();
//     });
//
//     blocks.click(function() {
//         $(this).addClass('active');
//         blocks.not(this).removeClass('active');
//         updateUnderline();
//     });
//     $(window).resize(function() {
//         updateUnderline();
//     });
// }


const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username')

function getUserData() {
    let token = $.cookie('token')


    $(document).ajaxStop(function() {
        fadeIn($('.profile'),200)
        console.log('stop')
    })

    async function getLoggedInUser() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:5000/api/user`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                method: "GET",
                success: function(msg) {
                    console.log(msg);
                    resolve(msg.username);
                },
                error: function(){
                    resolve(undefined);
                }
            });
        });
    }

    async function getUserProfile(username) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:5000/api/user/${username}`,
                method: "GET",
                success: function(msg) {
                    console.log(msg);
                    resolve(msg);
                },
                error: function(msg){
                    console.log(msg);
                    msg.responseJSON.message.forEach((error) => {
                        console.error(error);
                    });
                    reject(new Error("Error getting user profile"));
                }
            });
        });
    }

    async function init() {
        try {
            let logginedUsername = undefined;
            if(token) {
                logginedUsername = await getLoggedInUser();
            }

            const profileData = await getUserProfile(username);

            const profileUsername = profileData.username;

            $('#profileDescription').text(profileData.bio);
            $('#profileUserId').text(profileData.username);
            $('#profileName').text(profileData.name);

            if (logginedUsername === profileUsername) {
                $('#btnEditProfile').addClass('show');
                console.log('true');
            }

        } catch (error) {
            console.error(error);
        }
    }
    init();

    // запрос нфтішок
    $.ajax({
        url: `http://localhost:5000/api/nftEntity/getAll/${username}?count=8`,
        "method": "GET",
        success: function(msg) {
            console.log('asjhodakjsd',msg);
            $.ajax({
                "url": `http://localhost:5000/api/user/id/${msg[0].ownerId}`,
                "method": "GET",
                success: function(msgUser) {
                    console.log(msg);

                    generateNft(msg,msgUser.avatarImage)
                }
            });
        },
        error: function(msg){
            console.log(msg);
            msg.responseJSON.message.forEach((error) => {
                console.error(error);
            });
        }
    });
}
getUserData()



function generateNft(array,userAvatar) {
    let nftPage = $('#nftPage');
    array.forEach((obj) => {
        let card = `
            <div class="card card--borderless wow ">
                <div class="card__img"><img src="http://localhost:5000/${obj.image}" alt=""></div>
                <a href="/nft.html?hash=${obj.hash}" class="card__name">
                    <div class="title-h5"><h5>${obj.name}</h5></div>
                    <div class="avatar style-gradient-border"><img src="http://localhost:5000/${userAvatar}" alt=""></div>
                </a>
                <div class="card__price">
                    <div class="style-paragraph--two color--grey-light"><span>Price</span></div>
                    <div class="card__price-block style-buttons--small">
                        <span>${obj.price} ETH</span>
                        <span>(7.05 USD)</span>
                    </div>
                </div>
            </div>
        `;
        nftPage.append(card);
    })
}