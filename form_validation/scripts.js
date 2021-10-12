const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// show input error message

const showError = (input, message)=> {
  const formControl = input.parentElement; 
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// show succcess outline 
const showSuccess = (input)=> {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// chec if email is valud 
const checkEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value.trim()).toLowerCase())) {
      showSuccess(email)
    } else {
      showError(email, 'Email is not valid')
    }
}

// capitalize a string
const capitalize = (str)=> {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1); 
}

// chek required fields
const checkRequired = (inputArr)=> {
  inputArr.forEach(input=> {
    if(input.value.trim()==='') {
      showError(input, capitalize(input.id)+' is required'); 
    } else {
      showSuccess(input); 
    }
  })
}
 
// check length of fields 
const checkLength = (input, min, max) => {
  if(input.value.length < min) {
    showError(input, `${capitalize(input.id)} mus be at least ${min} characters`)
  } else if(input.value.length>max) {
    showError(input,  `${capitalize(input.id)} can not be more than ${max} characters`)
  } else {
    showSuccess(input)
  }
}

const validatePasswords = (password, password2)=> {

  if(password.value !== password2.value) {
    showError(password2, 'Passwords do not match')
  }
}

// event listeners 
form.addEventListener('submit', (e)=> {
    e.preventDefault()
    checkRequired([username, password, password2, email])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkLength(password2, 6, 25)
    checkEmail(email)
    validatePasswords(password, password2)
})

/* 
    if(username.value==='') {
      showError(username, 'Username is required')
    } else {
      showSuccess(username); 
    }

    if(email.value==='') {
      showError(email, 'Email is required')
    } else if(!isValidEmail(email.value)) {
      // console.log('email is not valid')
      showError(email, 'Email is not valid')
    } else {
      showSuccess(email); 
    }

    if(password.value==='') {
      showError(password, 'Username is required')
    } else {
      showSuccess(password); 
    }

    if(password2.value==='') {
      showError(password2, 'Username is required')
    } else {
      showSuccess(password2); 
    }

    */ 