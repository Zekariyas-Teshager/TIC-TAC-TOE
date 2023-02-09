const cellElements = document.querySelectorAll(`[data-cell]`);
const board = document.getElementById("board");
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
const winningTextMessageElement = document.querySelector(`[data-winning-message-text]`)
const xCounter = document.getElementById('x-counter')
const oCounter = document.getElementById('o-counter')
var xwins=0
var owins=0
const resetButton = document.getElementById('resetButton')
// var select = document.getElementById('player')
const winning_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn
resetButton.addEventListener('click',() =>{
    xwins=0
    owins=0
    xCounter.innerText= "X: "+xwins
    oCounter.innerText= "O: "+owins
})
restartButton.addEventListener('click', startGame)
startGame()

function startGame(){
    // select.addEventListener('change',() => {
    //     if(select.value=="O"){
    //         circleTurn = true
    //         setHoverClass()
    //     }else{
    //         circleTurn = false
    //         setHoverClass()
    //     }
    // })
    circleTurn = false
    cellElements.forEach(cell => {
        cell.style.cursor='pointer'

        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handelClick)
        cell.addEventListener('click', handelClick, {once:true})
    })
    setHoverClass()
    winningMessageElement.classList.remove('show')
}
function handelClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurn ()
        setHoverClass()
    }
        
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
    cell.style.cursor='not-allowed'
}
function swapTurn (){
    circleTurn = !circleTurn
}
function setHoverClass(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function isDraw(){
    return [...cellElements].every(cell => {
       return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endGame(draw){
    if(draw){
        winningTextMessageElement.innerHTML="Draw!"
    }else{
        winningTextMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
        if (circleTurn){
            owins+=1
        }else{
            xwins+=1
        }
        xCounter.innerText= "X: "+xwins
        oCounter.innerText= "O: "+owins
        board.classList.remove(CIRCLE_CLASS)
        board.classList.remove(X_CLASS)
    }
    winningMessageElement.classList.add('show')
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handelClick)
        cell.style.cursor='not-allowed'
    })
}
