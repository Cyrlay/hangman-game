const btn = document.querySelector('.btn-1')
const keywordInput = document.querySelector('.input-keyword')

let keyword = ''
let failsCount = 0
let expectedKeyword = ""
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const setInput = () => {

    keyword = keywordInput.value
    keyword = keyword.toUpperCase()

    console.log(keyword)

    for (let i = 0; i < keyword.length; i++) {
        if (keyword.charAt(i) === " ") {
            expectedKeyword = expectedKeyword + " "
        } else {
            expectedKeyword = expectedKeyword + "-"
        }
    }

    if (keyword === '') {
        alert('Enter keyword...')
    } else if (!/^[a-zA-Z]*$/g.test(keyword)) {
        alert('Invalid characters: a-z only')
        expectedKeyword = ''
    } else {
        startGame()
        keywordInput.style.visibility = 'hidden'
        btn.style.visibility = 'hidden'
    }
}

btn.addEventListener('click', setInput)

function showKeyword() {
    document.querySelector("#keyword").innerHTML = expectedKeyword
}

function startGame() {

    let tiles = ''

    for (let i = 0; i <= letters.length - 1; i++) {
        let element = 'letter' + i
        tiles = tiles + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>'
    }

    document.querySelector("#alphabet").innerHTML = tiles;

    showKeyword()
}

String.prototype.setMark = function (place, sign) {
    if (place > this.length - 1) return this.toString()
    else return this.substr(0, place) + sign + this.substr(place + 1)
}

function check(nr) {

    let mark

    for (let i = 0; i < keyword.length; i++) {
        if (keyword.charAt(i) === letters[nr]) {
            expectedKeyword = expectedKeyword.setMark(i, letters[nr])
            mark = true
        }
    }

    if (mark === true) {
        let element = "letter" + nr
        document.getElementById(element).style.background = "#003300"
        document.getElementById(element).style.color = "#00C000"
        document.getElementById(element).style.border = "3px solid #00C000"
        document.getElementById(element).style.cursor = "default"
        showKeyword()
    } else {
        let element = "letter" + nr
        document.getElementById(element).style.background = "#330000"
        document.getElementById(element).style.color = "#C00000"
        document.getElementById(element).style.border = "3px solid #C00000"
        document.getElementById(element).style.cursor = "default"
        document.getElementById(element).setAttribute("onclick", ";")

        failsCount++;

        let picture = "img/s" + failsCount + ".jpg"
        document.querySelector("#images").innerHTML = '<img class="img" src="' + picture + '" alt ="" />'
    }

    if (keyword === expectedKeyword) {
        document.querySelector("#alphabet").innerHTML = 'You Won :] ' + ' <span class="reset green" onclick="location.reload()">Again?</span>'
    }

    if (failsCount >= 9) {
        document.querySelector("#alphabet").innerHTML = 'You Lose :C ' + ' <span class="reset red" onclick="location.reload()">Again?</span>'
    }
}