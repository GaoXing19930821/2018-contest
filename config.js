function getPosTop(i, j) {
    return 20 + i * 120;
}

function getPosLeft(i, j) {
    return 20 + j * 120;
}

function generateOneNumber() {//��������ĸ���  
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

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

function getFontSize(number) {
    switch (number) {
        case 2:
            return "64px";
            break;
        case 4:
            return "64px";
            break;
        case 8:
            return "64px";
            break;
        case 16:
            return "64px";
            break;
        case 32:
            return "64px";
            break;
        case 64:
            return "64px";
            break;
        case 128:
            return "48px";
            break;
        case 256:
            return "48px";
            break;
        case 512:
            return "48px";
            break;
        case 1024:
            return "36px";
            break;
        case 2048:
            return "36px";
            break;
        case 4096:
            return "36px";
            break;
        case 8192:
            return "36px";
            break;
    }
    return "64px";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}



function getScore() {
    document.getElementById("score").innerHTML = score;
}

//������������ֵ�ʱ���ж�16�������Ƿ��пռ�  
function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
    return true;
}

//ʵ�ֹ����ж�  
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && j != 0)
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;

    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && j != 3)
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;

    return false;
}

function canMoveUp(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 3)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
    return false;
}

//�ж�ˮƽ�����Ƿ����ϰ���  
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

//�ж���ֱ�����Ƿ����ϰ���  
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}
//�����β  
function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board))
        gameover();
}

function gameover() {
    $("#gameover").css('display', 'block');
}

function isaddedArray() {//���ж��ܷ�ϲ�������ֵ��Ϊ0  
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }
}
