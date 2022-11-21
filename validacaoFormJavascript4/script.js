let validator = {
    handleSubmit:(e)=> {
        e.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showerror(input, check);
            }
        }
        if(send){
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for( let i in rules) {
                let rDetails = rules[i].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo obrigatório!';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo precisa ter no mínimo '+rDetails[1]+ ' caracteres!';
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showerror:(input, error)=>{
        input.style.borderColor = '#f55454';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let erros = form.querySelectorAll('.error');
        for(let i = 0; i < erros.length; i++) {
            erros[i].remove();
        }
    }
}


let form = document.querySelector('.B7Validator');
form.addEventListener('submit', validator.handleSubmit);