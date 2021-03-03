let contactList = document.querySelector('.contact-list');
let firstName = document.querySelector('#first-name');
let lastName = document.querySelector('#last-name');
let phoneNumber = document.querySelector('#phone-number');
let contacts;

// Event Listeners
document.querySelector('#submit').addEventListener('click', addContact);

function addContact(e) {
  if (firstName.value !== "" && lastName.value !== "" && phoneNumber.value !== "") {
    let count = 0;

    let numberRE = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/ ;
    let nameRE = /[A-Z][a-z]*/ ;

    if(numberRE.test(phoneNumber.value) === false) {
      showAlert('Invalid phone number', phoneNumber);
      count += 1;
    }
    if(nameRE.test(firstName.value) === false) {
      showAlert('Invalid first name', firstName);
      count += 1;
    }
    if(nameRE.test(lastName.value) === false) {
      showAlert('Invalid last name', lastName);
      count += 1;
    }

    if(count === 0) {
      let str = {
        id : createUUID(),
        firstName : firstName.value,
        lastName : lastName.value,
        phoneNumber : phoneNumber.value
      };
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/contacts', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      console.log(JSON.stringify(str));
      xhr.send(JSON.stringify(str));
    }
  }
  e.preventDefault();
}

showAlert = (message, element) => {
  const alert = document.createElement('div');
  alert.setAttribute('class', 'alert alert-danger');
  document.querySelector(`.${element.id}`).appendChild(alert);
  alert.textContent=message;

  setTimeout(function(){
    document.querySelector(`.${element.id}`).removeChild(alert);
  },3000);

}

function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

let request = new XMLHttpRequest();

request.open('GET','http://localhost:3000/contacts',true);

request.onload = function() {
  contacts = JSON.parse(this.response);
  let html = `
    <table class="table table-hover">
      <tbody>
  `;
  contacts.forEach(contact => {
    html+= `
      <tr class="table-light">
        <th scope="row"><i class="far fa-user"></i></th>
        <td>${contact.firstName} ${contact.lastName}</td>
        <td>${contact.phoneNumber}</td>
      </tr>
    `;
  });

  html+= `
      </tbody>
    </table>
  `;
  contactList.innerHTML = html;
}

request.send();




