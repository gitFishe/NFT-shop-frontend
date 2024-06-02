import {dataTabs, underline} from "../main.js";

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
