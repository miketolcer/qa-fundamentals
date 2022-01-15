console.log('connected')

let getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const btnContainer = document.querySelector('#btn-container')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('#char-container')

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.classList.add('char-card')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[1]}</li>
  </ul>`

  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = `Delete ${char.firstName}`
  deleteBtn.classList.add('char-btns')
  deleteBtn.addEventListener('click', () => deleteChar(char.id))

  charCard.appendChild(deleteBtn)

  charContainer.appendChild(charCard)
}

function createCharButton(char) {
  let charBtn = document.createElement('button')
  charBtn.textContent = `Get ${char.firstName}`
  charBtn.classList.add('char-btns')
  charBtn.setAttribute('id', char.id)
  charBtn.addEventListener('click', () => getOneChar(char.id))

  btnContainer.appendChild(charBtn)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function clearButtons() {
  btnContainer.innerHTML = `<button id="all">Get All Characters</button>`
  getAllBtn = document.querySelector('#all')
  getAllBtn.addEventListener('click', getAllChars)
}

function getAllChars() {
  clearCharacters()
  clearButtons()

  axios.get(`/characters`)
    .then(function(res) {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
        createCharButton(res.data[i])
      }
    })
    .catch(err => console.log(err))
}

function getOneChar(id) {
  clearCharacters()

  axios.get(`/character/${id}`)
    .then(function(res) {
      createCharacterCard(res.data)
    })
}

function getOldChars(event) {
  event.preventDefault()

  clearCharacters()

  axios.get(`/character/?age=${ageInput.value}`)
    .then(function(res) {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })

  ageInput.value = ''
}

function createNewChar(event) {
  event.preventDefault()

  clearCharacters()

  let newLikes = [...newLikesText.value.split(',')]

  let body = {
    firstName: newFirstInput.value, 
    lastName: newLastInput.value, 
    gender: newGenderDropDown.value, 
    age: newAgeInput.value, 
    likes: newLikes
  }

  createCharButton(body)

  axios.post(`/character`, body) 
    .then(function(res) {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
  
  newLastInput.value = ''
  newGenderDropDown.value = 'female'
  newAgeInput.value = ''
  newLikesText.value = ''
}

function deleteChar(id) {
  let charBtn = document.getElementById(id)
  charBtn.remove()

  axios.delete(`/character/${id}`)
    .then(function(res) {
      clearCharacters()

      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
}


getAllBtn.addEventListener('click', getAllChars)

ageForm.addEventListener('submit', getOldChars)

createForm.addEventListener('submit', createNewChar)

getAllChars()