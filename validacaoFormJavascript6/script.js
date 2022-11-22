let validator = {
    handleSubmit:(e)=>{
        e.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for(let i=0; i < inputs.length; i++){
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showError(input, check);
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
            for(let i in rules) {
                let rDetails = rules[i].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório!';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Deve ter no mínimo '+rDetails[1]+' caracteres!';
                        }
                    break;
                    case 'email':
                        if(input.value !== ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if(!regex.test(input.value.toLowerCase())){
                                return 'Digite um e-mail válido!';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, erro)=>{
        input.style.borderColor = '#ff0000';
        let erroElement = document.createElement('div');
        erroElement.classList.add('error');
        erroElement.innerHTML = erro;

        input.parentElement.insertBefore(erroElement, input.nextElement);
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let erros = form.querySelectorAll('.error');
        for(let i=0; i < erros.length; i++) {
            erros[i].remove();
        }
    }
}


let form = document.querySelector('.validatorjs');
form.addEventListener('submit', validator.handleSubmit);