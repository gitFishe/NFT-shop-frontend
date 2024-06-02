import {authorizationRequest} from "../main.js";
import {inputFocus} from "../main.js";
import {validateEmail} from "../main.js";

inputFocus($('.authorization-input'));

function loginInputs() {
    let inputEmail = $('#loginEmail');
    let inputPassword = $('#loginPassword');

    let userLogin = {
        email: "",
        password: "",
    }

    $('.btn').on('click', (event) => {
        event.preventDefault()
        let allInputsFilled = true;

        $('.authorization__inputs input').each(function() {
            let value = $(this).val();
            if(value === '') {
                $(this).parent().addClass('inputError');
                allInputsFilled = false;
            }
        });

        // if (inputEmail.val().length !== 0) {
        //     if(validateEmail(inputEmail.val()) === false) {
        //         allInputsFilled = false;
        //         console.error('email error');
        //     }
        // }

        if (inputPassword.val().length < 6) {
            inputPassword.parent().addClass('inputError');
            allInputsFilled = false;
            console.error('password error');
        }

        userLogin.email = inputEmail.val();
        userLogin.password = inputPassword.val();

        if(allInputsFilled) {
            authorizationRequest(userLogin, 'login')
        } else {
            console.error('error while logging');
        }
    });
}
loginInputs()

$('.authorization-input input').on('input',function() {
    $('.authorization-input').removeClass('inputError')
})
