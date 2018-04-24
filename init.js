var board = new Array();
var added = new Array();
var score = 0;
var top = 240;
$(document).ready(function (e) {
    newgame();
});

function newgame() {
    //��ʼ�����̸�  
    init();
    //����������������Ƶ�����  
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

    for (var i = 0; i < 4; i++) {//��ʼ����������  
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {//��ʼ���ж��ϲ�������  
        added[i] = new Array();
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }

    updateBoardView(); //֪ͨǰ�˶�board��λ��������趨��  
}

function generateOneGrid() {//��������ĸ���  
    if (nospace(board))
        return false;

    //���һ��λ��  
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //���һ������  
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //�����λ����ʾ�������  
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}