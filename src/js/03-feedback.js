import throttle from 'lodash.throttle';


const LOCAL_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFeedbackForm();

function onInputData(e) {
  formData[e.target.name]= e.target.value.trim()
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

 
  console.log(formData);
    localStorage.removeItem(LOCAL_KEY);
   
  e.currentTarget.reset();
  formData = {};
}

function populateFeedbackForm() {
  try {
    let data = localStorage.getItem(LOCAL_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, value]) => [
      refs.form.elements[key].value = value,
    ]);
  }catch (error){
console.log(error.message)
  }

}