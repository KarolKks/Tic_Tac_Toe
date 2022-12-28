window.onload = function() {
    app.init();
}

let x = 1;
let y = 1;

class App {
    winningVariants = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    init() {
        document.querySelectorAll(".cell").forEach(
            cell => cell.addEventListener("click", this.cellClick)
        );

        document.getElementById("play").addEventListener("click",
            () => this.restartGame() );
    }

    cellClick = (e) => {
        this.playerTurn(e.target)
    }

    currentPlayer = ["X", "O"]

    initGame() {
        var rand = this.currentPlayer[Math.random() * this.currentPlayer.length | 0]
        this.currentPlayer = rand;

        document.querySelectorAll(".cell").forEach(
            el => { el.innerHTML = ""; }
        );
    }

    playerTurn(el) {
        if(el.innerHTML == "X" || el.innerHTML == "O") return;
        el.innerHTML = this.currentPlayer;

        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";

        this.checkWinner();
    }

    checkWinner() {
        for(let i = 0; i < this.winningVariants.length; i++) {
            const variant = this.winningVariants[i],
                 a = this.getCellValue(variant[0]),
                 b = this.getCellValue(variant[1]),
                 c = this.getCellValue(variant[2]);

            if(a == "" || b == "" || c =="") continue;

            if(a == b && b == c) {
                this.setWinner("Zwycięzca: " + a);
                this.restartGame();
                if(a == "O"){
                    document.getElementById("punctationO").innerHTML = ("O: " + x++);
                }else{
                    document.getElementById("punctationX").innerHTML = ("X: " + y++);
                }
            }
        }
    }

    setWinner(str) {
        document.getElementById("result").innerHTML = str;
    }

    restartGame() {
        this.initGame();
    }

    setP(s){
        if(a == "O"){
            document.getElementById("punctationO").innerHTML = s;
        }else{
            document.getElementById("punctationX").innerHTML = s;
        }
    }

    getCellValue(index) {
        return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
    }
}

const app = new App();