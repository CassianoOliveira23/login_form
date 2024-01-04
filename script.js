
const init = () => {
    const validateEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        const emailTest = regex.test(input.value);

        if (!emailTest) {
            input.nextElementSibling.classList.add('error');
        } else {
            input.nextElementSibling.classList.remove('error');
        }

        handleButtonState();
    }

    const validatePassword = (event) => {
        const input = event.currentTarget;

        if (input.value.length < 8) {
            input.nextElementSibling.classList.add('error');
        } else {
            input.nextElementSibling.classList.remove('error');
        }

        handleButtonState();
    }

    const handleButtonState = () => {
        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');
        const submitButton = document.querySelector('.login-submit');

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const isValidPassword = passwordInput.value.length >= 8;

        if (isValidEmail && isValidPassword) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'disabled');
        }
    }

    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.login-submit');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassword);

    const errorHandler = () => {
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error"
    }

    const successHandler = () => {
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Sent!"
    }

    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            submitButton.textContent = "...Loading"

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                successHandler();
            }).catch(() => {
                errorHandler();
            })
        })
    }
}

window.onload = init;


