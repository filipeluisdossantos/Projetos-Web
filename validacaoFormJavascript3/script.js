let B7Validator = {
    handleSumit:(e)=>{
        e.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                B7Validator.showError(input, check);
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
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == '') {
                            return 'Campo obrigatório!';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Deve ter no mínimo '+rDetails[1]+' caractéres!';
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
    showError:(input, error)=>{
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0; i < inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElement = document.querySelectorAll('.error');
        for(let i=0; i < errorElement.length; i++){
            errorElement[i].remove();
        }
    }
}



let form =  document.querySelector('.B7Validator');
form.addEventListener('submit', B7Validator.handleSumit);