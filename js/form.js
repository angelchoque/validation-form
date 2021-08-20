const expression= {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const formApp = document.querySelector('#form-app')
const inputs = document.querySelectorAll('#form-app input')
const inputsList = [...inputs]

const checkForm = {
	user: false,
	name: false,
	password: false,
	email: false,
	phone: false
}

const validateFormApp = (e) => {
	switch (e.target.name) {
		case 'user':
			validationInput(expression.user, e.target,'user')
			break 
		case 'name':
			validationInput(expression.name, e.target,'name')
			break 
		case 'password':
			validationInput(expression.password, e.target,'password')
			validationPassword()
			break 
		case 'password2':
			validationPassword()
			break 
		case 'email':
			validationInput(expression.email, e.target,'email')
			break 
		case 'phone':
			validationInput(expression.phone, e.target,'phone')
			break 
	}
}

const validationInput = (reex, inputValue, selection)=>{
	if (reex.test(inputValue.value)){
		document.querySelector(`#group-${selection}`).classList.remove('form-app__group-incorrect')
		document.querySelector(`#group-${selection}`).classList.add('form-app__group-correct')
		document.querySelector(`#group-${selection} i`).classList.remove(`fa-times-circle`)
		document.querySelector(`#group-${selection} i`).classList.add(`fa-check-circle`)
		document.querySelector(`#group-${selection} .form-app__input-error`).classList.remove(`form-app__input-error--active`)
		checkForm[selection] = true
	} else {
		document.querySelector(`#group-${selection}`).classList.add(`form-app__group-incorrect`)
		document.querySelector(`#group-${selection}`).classList.remove(`form-app__group-correct`)
		document.querySelector(`#group-${selection} i`).classList.add(`fa-times-circle`)
		document.querySelector(`#group-${selection} i`).classList.remove(`fa-check-circle`)
		document.querySelector(`#group-${selection} .form-app__input-error`).classList.add(`form-app__input-error--active`)
		checkForm[selection] = false
	}
}

const validationPassword = ()=>{
	const inputPassword1 = document.querySelector('#password')
	const inputPassword2 = document.querySelector('#password2')
	if(inputPassword1.value !== inputPassword2.value){
		document.querySelector(`#group-password2`).classList.add(`form-app__group-incorrect`)
		document.querySelector(`#group-password2`).classList.remove(`form-app__group-correct`)
		document.querySelector(`#group-password2 i`).classList.add(`fa-times-circle`)
		document.querySelector(`#group-password2 i`).classList.remove(`fa-check-circle`)
		document.querySelector(`#group-password2 .form-app__input-error`).classList.add(`form-app__input-error--active`)
		checkForm['password'] = false
	} else {
		document.querySelector(`#group-password2`).classList.remove('form-app__group-incorrect')
		document.querySelector(`#group-password2`).classList.add('form-app__group-correct')
		document.querySelector(`#group-password2 i`).classList.remove(`fa-times-circle`)
		document.querySelector(`#group-password2 i`).classList.add(`fa-check-circle`)
		document.querySelector(`#group-password2 .form-app__input-error`).classList.remove(`form-app__input-error--active`)
		checkForm['password'] = true
	}
}
inputsList.forEach((input)=>{
	input.addEventListener('keyup', validateFormApp)
	input.addEventListener('blur', validateFormApp)
})

formApp.addEventListener('submit', (e)=>{
	e.preventDefault() // no submit -- example
	const terms = document.querySelector('#terms')
	if (checkForm.user && checkForm.name && checkForm.password && checkForm.email && checkForm.phone && terms.checked){
		
		formApp.reset()
		document.querySelector('#form-app__msg-successful').classList.add('form-app__msg-successful--active')
		setTimeout(()=>{
		document.querySelector('#form-app__msg-successful').classList.remove('form-app__msg-successful--active')

		}, 5000)
		document.querySelectorAll('.form-app__validation-state').forEach((icon)=>{
			icon.classList.remove('form-app__validation-state')
			icon.classList.add('form-app__group-input-desactive')
		})
	} else {
		document.querySelector('#form-app__msg').classList.add('form-app__msg--active')
	}
})