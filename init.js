var board = new Array();
var added = new Array();
var score = 0;
var top = 240;
$(document).ready(function (e) {
    newgame();
});

function newgame() {
    //初始化棋盘格  
    init();
    //在随机两个各自声称的数字  
    generateOneGrid();
    generateOneGrid();
}

function init() {
    score = 0;
    document.getElementById("score").innerHTML = score;
    $("#gameover").css('display', 'none');
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {//初始化格子数组  
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {//初始化判定合并的数组  
        added[i] = new Array();
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }

    updateBoardView(); //通知前端对board二位数组进行设定。  
}

function generateOneGrid() {//生成随机的格子  
    if (nospace(board))
        return false;

    //随机一个位置  
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字  
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字  
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}