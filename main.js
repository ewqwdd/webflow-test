// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const validateEmailForm = (form, input) => {
//   const submit = form.querySelector('input[type="submit"]')
//   const error = form.querySelector('.field-error')
  
//   window.addEventListener('load', () => {
//     submit.disabled = true
//   })
  
//   const handle = (displayError) => {
//     const validate = input.value.match(emailRegex)
//     if (validate) {
//       error.style.display = 'none'
//       submit.disabled = false
//       return true
//     }
//     if (displayError) {
//       error.style.display = 'block'
//     }
//     submit.disabled = true
//     return false
//    }

//   input.addEventListener('blur', (e) => {
//     handle(true)
//   })
  
//   input.addEventListener('input', (e) => {
//     handle(false)
//   })
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const input = document.getElementById('hero-updates-email')
//   const form = document.getElementById('wf-form-form-updates')

//   const inputFooter = document.getElementById('Hero-Updates-Email-3')
//   const formFooter = document.getElementById('wf-form-form-footer')

//   const inputSidebar = document.getElementById('hero-updates-email-2')
//   const formSidebar = document.getElementById('wf-form-form-header-mob')

//   validateEmailForm(form, input)
//   validateEmailForm(formFooter, inputFooter)
//   if (formSidebar) {
//     validateEmailForm(formSidebar, inputSidebar)
//   }
// })