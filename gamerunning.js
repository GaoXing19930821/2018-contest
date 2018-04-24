//�¼���Ӧѭ��  
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left  
            if (moveLeft()) {
                //setTimeout("generateOneNumber()",210);  
                getScore();
                generateOneNumber(); //ÿ������һ�����־Ϳ��ܳ�����Ϸ����  
                setTimeout("isgameover()", 400); //300����  
            }
            break;
        case 38: //up  
            if (moveUp()) {
                getScore();
                generateOneNumber(); //ÿ������һ�����־Ϳ��ܳ�����Ϸ����  
                setTimeout("isgameover()", 400);
            }
            break;
        case 39: //right  
            if (moveRight()) {
                getScore();
                generateOneNumber(); //ÿ������һ�����־Ϳ��ܳ�����Ϸ����  
                setTimeout("isgameover()", 400);
            }
            break;
        case 40: //down  
            if (moveDown()) {
                getScore();
                generateOneNumber(); //ÿ������һ�����־Ϳ��ܳ�����Ϸ����  
                setTimeout("isgameover()", 400);
            }
            break;

    }
});



function moveLeft() {//�����ϸ����Ϣ  
    //�жϸ����Ƿ��ܹ������ƶ�  
    if (!canMoveLeft(board))
        return false;

    isaddedArray();
    //������moveLeft����//��׼  
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {//��һ�е����ֲ����������ƶ�  
            if (board[i][j] != 0) {
                //(i,j)����Ԫ��  
                for (var k = 0; k < j; k++) {
                    //���λ�õ��Ƿ�Ϊ�� && �м�û���ϰ���  
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //���λ�õ����ֺͱ������������ && �м�û���ϰ���  
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        //add  
                        if (added[i][k] != 0) {//Ŀ����ŵ��Ƿ���ɹ��ϲ�  
                            board[i][k + 1] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score += board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {//�����ϸ����Ϣ  
    //�жϸ����Ƿ��ܹ������ƶ�  
    if (!canMoveRight(board))
        return false;

    isaddedArray();
    //������moveRight����//��׼  
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {//���һ�е����ֲ����������ƶ�  
            if (board[i][j] != 0) {
                //(i,j)�Ҳ��Ԫ��  
                for (var k = 3; k > j; k--) {
                    //���λ�õ��Ƿ�Ϊ�� && �м�û���ϰ���  
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //���λ�õ����ֺͱ������������ && �м�û���ϰ���  
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        //add  
                        if (added[i][k] != 0) {
                            board[i][k - 1] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score += board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {//�����ϸ����Ϣ  
    //�жϸ����Ƿ��ܹ������ƶ�  
    if (!canMoveUp(board))
        return false;

    isaddedArray();
    //������moveUp����//��׼  
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {//��һ�е����ֲ����������ƶ�  
            if (board[i][j] != 0) {
                //(i,j)�����Ԫ��  
                for (var k = 0; k < i; k++) {
                    //���λ�õ��Ƿ�Ϊ�� && �м�û���ϰ���  
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //���λ�õ����ֺͱ������������ && �м�û���ϰ���  
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        //add  
                        if (added[k][j] != 0) {
                            board[k + 1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score += board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {//�����ϸ����Ϣ  
    //�жϸ����Ƿ��ܹ������ƶ�  
    if (!canMoveDown(board))
        return false;

    isaddedArray();
    //������moveDown����//��׼  
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {//���һ�е����ֲ����������ƶ�  
            if (board[i][j] != 0) {
                //(i,j)�����Ԫ��  
                for (var k = 3; k > i; k--) {
                    //���λ�õ��Ƿ�Ϊ�� && �м�û���ϰ���  
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //���λ�õ����ֺͱ������������ && �м�û���ϰ���  
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        //add  
                        if (added[k][j] != 0) {
                            board[k - 1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else {
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score += board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function updateBoardView() {//���������ǰ����ʽ  
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('hegiht', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                //NumberCell����  
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j])); //���ر���ɫ  
                theNumberCell.css('color', getNumberColor(board[i][j])); //����ǰ��ɫ
                theNumberCell.css('font-size', getFontSize(board[i][j])); 
                theNumberCell.text(board[i][j]);
                if (board[i][j] == 2048 || board[i][j] == 4096 || board[i][j] == 8192 || board[i][j] == 1024) {
                    theNumberCell.css('box-shadow', "0 0 20px" + getNumberBackgroundColor(board[i][j]));
                }
            }
        }
    }
}

function showNumberWithAnimation(i, j, randNumber) {//ʵ��������ֵ���ʽ�䶯  

    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy) {//ʵ���ƶ����ӵ���ʽ�䶯  

    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({ top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}  