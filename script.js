'use strict'

let position = document.querySelector('#position')
let buttonSave = document.querySelector('.button-save')
let buttonDelete = []

let curierList = []
let driverList = []
let teacherList = []
let loaderList = []
let managerList = []
let listWorker = [curierList, driverList, teacherList, loaderList, managerList]
let listWorkerCopy = [curierList, driverList, teacherList, loaderList, managerList]

class Worker {
    constructor(gender, name, secondName, age) {
        this._gender = gender
        this._name = name
        this._secondName = secondName
        this._age = age
    }

    get gender() {
        return this._gender
    }
    get name() {
        return this._name
    }
    get secondName() {
        return this._secondName
    }
    get age() {
        return this._age
    }

    set gender(str) {
        this.gender = str
    }
    set name(str) {
        this.name = str
    }
    set secondName(str) {
        this.secondName = str
    }
    set age(str) {
        this.age = +str
    }

    deleteWorker (numArr, numEl) {
        listWorker[numArr][numEl] = null
        delete listWorker[numArr][numEl]
        listWorker[numArr].splice(numEl, 1)
        localStorage.clear()
        addTable()
    }
}

// курьер
class Courier extends Worker {
    constructor(gender, name, secondName, age, curierMass) {
        super(gender, name, secondName, age)
        this._haveCar = curierMass[0]
        this._deliveryArea = curierMass[1]
    }

    get haveCar() {
        return this._haveCar
    }
    get deliveryArea() {
        return this._deliveryArea
    }

    set haveCar(str) {
        this.haveCar = str
    }
    set deliveryArea(str) {
        this.deliveryArea = str
    }
}

//водитель
class Driver extends Worker {
    constructor(gender, name, secondName, age, driverMass) {
        super(gender, name, secondName, age)
        this._drivingExperience = driverMass[0]
        this._drivingCategories = driverMass[1]
    }

    get drivingExperience() {
        return this._drivingExperience
    }
    get drivingCategories() {
        return this._drivingCategories
    }

    set drivingExperience(str) {
        this.drivingExperience = str
    }
    set drivingCategories(str) {
        this.drivingCategories = str
    }
}

//учитель
class Teacher extends Worker {
    constructor(gender, name, secondName, age, teacherMass) {
        super(gender, name, secondName, age)
        this._subjectStudy = teacherMass[0]
        this._education = teacherMass[1]
    }

    get subjectStudy() {
        return this._subjectStudy
    }
    get education() {
        return this._education
    }

    set subjectStudy(str) {
        this.subjectStudy = str
    }
    set education(str) {
        this.education = str
    }
}

//грузчик
class Loader extends Worker {
    constructor(gender, name, secondName, age, loaderMass) {
        super(gender, name, secondName, age)
        this._physicalForm = loaderMass[0]
        this._LoaderHandlingSkills = loaderMass[1]
    }

    get physicalForm() {
        return this._physicalForm
    }
    get LoaderHandlingSkills() {
        return this._LoaderHandlingSkills
    }

    set physicalForm(str) {
        this.physicalForm = str
    }
    set LoaderHandlingSkills(str) {
        this.LoaderHandlingSkills = str
    }
}

//менеджер
class Manager extends Worker {
    constructor(gender, name, secondName, age, managerMass) {
        super(gender, name, secondName, age)
        this._numberSubordinates = managerMass[0]
        this._qualification = managerMass[1]
    }

    get numberSubordinates() {
        return this._numberSubordinates
    }
    get qualification() {
        return this._qualification
    }

    set numberSubordinates(str) {
        this.numberSubordinates = +str
    }
    set qualification(str) {
        this.qualification = str
    }
}

const addTable = function () {
    const table = document.querySelector('tbody');
    const allRow = document.querySelectorAll('tbody > tr')

    allRow.forEach((item) => {
        item.remove()
    })

    let count = 0

    for(let x = 0; x < listWorker.length; x++) {
        for(let key in listWorker[x]) {
            count++
            let row = document.createElement('tr')
            row.innerHTML += `<td>Работник № ${+count}</td>`
            for(let k in listWorker[x][key]) {
                
                row.innerHTML += `<td>${listWorker[x][key][k]}</td>`
                
            }
            row.innerHTML += `<td><button name="${x}-${count-1}" class="button-delete">Удалить</button></td>`
            table.appendChild(row);
            
            localStorage.setItem(`${x}`, JSON.stringify(listWorker[x]))
        }
    }
}

const todoLoad = function () {
    let temp

    for(let i = 0; i < 5; i++) {
        temp = JSON.parse(localStorage.getItem(`${i}`))
        if (temp != null) {
            listWorkerCopy[i] = temp
        }
    }

    for(let key in listWorkerCopy[0]) {
        let str1 = []
        let str2 = []
        for(let k in listWorkerCopy[0][key]) {
            str1.push(listWorkerCopy[0][key][k])
        }
        str2.push(str1[4])
        str2.push(str1[5])
        listWorker[0].push(new Courier(str1[0], str1[1], str1[2], str1[3], str2))
    }
    for(let key in listWorkerCopy[1]) {
        let str1 = []
        let str2 = []
        for(let k in listWorkerCopy[1][key]) {
            str1.push(listWorkerCopy[1][key][k])
        }
        str2.push(str1[4])
        str2.push(str1[5])
        listWorker[1].push(new Driver(str1[0], str1[1], str1[2], str1[3], str2))
    }
    for(let key in listWorkerCopy[2]) {
        let str1 = []
        let str2 = []
        for(let k in listWorkerCopy[2][key]) {
            str1.push(listWorkerCopy[2][key][k])
        }
        str2.push(str1[4])
        str2.push(str1[5])
        listWorker[2].push(new Teacher(str1[0], str1[1], str1[2], str1[3], str2))
    }
    for(let key in listWorkerCopy[3]) {
        let str1 = []
        let str2 = []
        for(let k in listWorkerCopy[3][key]) {
            str1.push(listWorkerCopy[3][key][k])
        }
        str2.push(str1[4])
        str2.push(str1[5])
        listWorker[3].push(new Loader(str1[0], str1[1], str1[2], str1[3], str2))
    }
    for(let key in listWorkerCopy[4]) {
        let str1 = []
        let str2 = []
        for(let k in listWorkerCopy[4][key]) {
            str1.push(listWorkerCopy[4][key][k])
        }
        str2.push(str1[4])
        str2.push(str1[5])
        listWorker[4].push(new Manager(str1[0], str1[1], str1[2], str1[3], str2))
    }

    console.dir(listWorker[0])
    addTable()
}

document.addEventListener("DOMContentLoaded", todoLoad());

position.addEventListener('change', function () {
    let form = document.querySelector('.form')
    let newInput = document.querySelectorAll('.newInput')

    if (newInput != null) {
        newInput.forEach(element => {
            element.remove()
        });
    }
    
    if (position.value == 'curier') {
        let curierArr = ['Есть личный транспорт?', 'Район доставки?']
        for(let i = 0; i < Courier.length-3; i++) {
            let input = document.createElement('input')
            input.placeholder = curierArr[i]
            input.classList.add('newInput')
            form.insertBefore(input, null)
        }
    } else if (position.value == 'driver') {
        let driverArr = ['Опыт вождения?', 'Категории прав?']
        for(let i = 0; i < Driver.length-3; i++) {
            let input = document.createElement('input')
            input.placeholder = driverArr[i]
            input.classList.add('newInput')
            form.insertBefore(input, null)
        }
    } else if (position.value == 'teacher') {
        let teacherArr = ['Преподаваемый предмет?', 'Образование?']
        for(let i = 0; i < Teacher.length-3; i++) {
            let input = document.createElement('input')
            input.placeholder = teacherArr[i]
            input.classList.add('newInput')
            form.insertBefore(input, null)
        }
    } else if (position.value == 'loader') {
        let loaderArr = ['Физическая форма?', 'Владения погрузочной техникой?']
        for(let i = 0; i < Loader.length-3; i++) {
            let input = document.createElement('input')
            input.placeholder = loaderArr[i]
            input.classList.add('newInput')
            form.insertBefore(input, null)
        }
    } else if (position.value == 'manager') {
        let managerArr = ['Количество подчиненных?', 'Квалификация (младший, топ)?']
        for(let i = 0; i < Manager.length-3; i++) {
            let input = document.createElement('input')
            input.placeholder = managerArr[i]
            input.classList.add('newInput')
            form.insertBefore(input, null)
        }
    }
    
})


buttonSave.addEventListener('click', function() {
    let next = true
    let allInputs = document.querySelectorAll('input')
    let radio = document.querySelectorAll('[type=radio]')
    let message = document.querySelector('#message')

    allInputs.forEach(element => {
        if (element.value == '') {
            message.textContent = 'Вы заполнили не все поля!'
            message.style.fontFamily = 'sans-serif'
            message.style.color = 'white'
            next = false
        }
    })
    if (position.value == 'position') {
        message.textContent = 'Вы заполнили не все поля!'
        message.style.fontFamily = 'sans-serif'
        message.style.color = 'white'
        next = false
    }

    if (next == true) {
        message.textContent = ''
        let name = document.querySelectorAll('input')[0].value
        let secondName = document.querySelectorAll('input')[1].value
        let age = document.querySelectorAll('input')[2].value
        let gender = ''
        let tempArr = []

        if(radio[0].checked == true) {
            gender = 'Мужской'
        } else {
            gender = 'Женский'
        }
        const valueNewInput = function () {
            let newInput = document.querySelectorAll('.newInput')
            newInput.forEach(element => {
                tempArr.push(element.value)
            });
        }
        if (position.value == 'curier') {
            valueNewInput()

            listWorker[0].push(new Courier(gender, name, secondName, age, tempArr))

        } else if (position.value == 'driver') {
            valueNewInput()

            listWorker[1].push(new Driver(gender, name, secondName, age, tempArr))

        } else if (position.value == 'teacher') {
            valueNewInput()

            listWorker[2].push(new Teacher(gender, name, secondName, age, tempArr))

        } else if (position.value == 'loader') {
            valueNewInput()

            listWorker[3].push(new Loader(gender, name, secondName, age, tempArr))

        } else if (position.value == 'manager') {
            valueNewInput()

            listWorker[4].push(new Manager(gender, name, secondName, age, tempArr))
        }

        document.querySelectorAll('input')[0].value = ""
        document.querySelectorAll('input')[1].value = ""
        document.querySelectorAll('input')[2].value = ""
        let newInput = document.querySelectorAll('.newInput')
        newInput.forEach(element => {
            element.value = ""
        });

        addTable()
    }
})
const bodyTable = document.querySelector('tbody')
bodyTable.addEventListener('click', function (event) {
    const target = event.target.closest('.button-delete')
    if(!target) return;

    let numArr = target.name.split('-')[0]
    let numEl = target.name.split('-')[1]
    console.dir(listWorker[numArr][numEl]);
    listWorker[numArr][numEl].deleteWorker(numArr, numEl)
})