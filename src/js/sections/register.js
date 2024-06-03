import {authorizationRequest, validPassword, validPasswordConfirm} from "../main.js";
import {validateEmail} from "../main.js";

function inputFocus(inputs) {
    inputs.on('click', function() {
        $(this).find('input').focus();
    });
}

inputFocus($('.register-input'));


function registerInputs() {
    let inputEmail = $('#registerEmail');
    let inputUsername = $('#registerUsername');
    let inputPassword = $('#registerPassword');
    let inputPasswordConfirm = $('#registerPasswordConfirm')

    let userRegister = {
        name: "",
        email: "",
        password: "",
    }

    let allInputsFilled = true;

    $('.btn').on('click', (event) => {
        event.preventDefault()
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

        if (!validPassword(inputPassword)) {
            inputPassword.parent().addClass('inputError');
            allInputsFilled = false;
            console.error('password error');
        }

        if(!validPasswordConfirm(inputPassword, inputPasswordConfirm)) {
            inputPasswordConfirm.parent().addClass('inputError')
            allInputsFilled = false;
            console.error('confirm password error');
        }

        userRegister.name = inputUsername.val();
        userRegister.username = `@${inputUsername.val().toLowerCase()}`;
        userRegister.email = inputEmail.val();
        userRegister.password = inputPassword.val();

        console.log(allInputsFilled);
        if(allInputsFilled) {
            authorizationRequest(userRegister, 'registration')
        } else {
            console.error('user does not registered not');
        }
    });
}
registerInputs()

$('.input input').on('input',function() {
    $('.input').removeClass('inputError')
})
