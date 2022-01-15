const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')))
app.use('/js', express.static(path.join(__dirname, 'public/main.js')))
app.use('/styles', express.static(path.join(__dirname, 'public/styles.css')))

let characters = [
    {
        id: 0,
        firstName: 'Jake', 
        lastName: 'Peralta', 
        gender: 'male',
        age: 39, 
        likes: ['Amy', 'Die Hard', 'Taylor Swift']
    }, 
    {
        id: 2, 
        firstName: 'Rosa', 
        lastName: 'Diaz', 
        gender: 'female',
        age: 34, 
        likes: ['motorcycles', 'Nancy Meyers', 'weapons']
    }, 
    {
        id: 1, 
        firstName: 'Amy', 
        lastName: 'Santiago', 
        gender: 'female', 
        age: 37, 
        likes: ['binders', 'grammar', 'dancing']
    }, 
    {
        id: 3,
        firstName: 'Charles', 
        lastName: 'Boyle', 
        gender: 'male',
        age: 42, 
        likes: ['Jake', 'dogs', 'food']
    }
]

app.get('/characters', (req, res) => {
    res.status(200).send(characters)
})

app.get('/character/:id', (req, res) => {
    const { id } = req.params
    const index = characters.findIndex(char => char.id === +id)
    res.status(200).send(characters[index])
})

app.get('/character', (req, res) => {
    const { age } = req.query
    
    let filtered = characters.filter(char => {
        return char.age > age
    })

    res.status(200).send(filtered)
})

let id = 4

app.post('/character', (req, res) => {
    let newChar = {...req.body, id}
    newChar.likes = newChar.likes.slice(0, 3)
    characters.unshift(newChar)
    res.status(200).send(characters)
    id++
})

app.delete('/character/:id', (req, res) => {
    const { id } = req.params
    const index = characters.findIndex(char => char.id === +id)
    characters.splice(index, 2)
    res.status(200).send(characters)
})

app.listen(4000, () => console.log('up on 4000'))