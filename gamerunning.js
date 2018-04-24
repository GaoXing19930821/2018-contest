//事件响应循环  
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left  
            if (moveLeft()) {
                //setTimeout("generateOneNumber()",210);  
                getScore();
                generateOneNumber(); //每次新增一个数字就可能出现游戏结束  
                setTimeout("isgameover()", 400); //300毫秒  
            }
            break;
        case 38: //up  
            if (moveUp()) {
                getScore();
                generateOneNumber(); //每次新增一个数字就可能出现游戏结束  
                setTimeout("isgameover()", 400);
            }
            break;
        case 39: //right  
            if (moveRight()) {
                getScore();
                generateOneNumber(); //每次新增一个数字就可能出现游戏结束  
                setTimeout("isgameover()", 400);
            }
            break;
        case 40: //down  
            if (moveDown()) {
                getScore();
                generateOneNumber(); //每次新增一个数字就可能出现游戏结束  
                setTimeout("isgameover()", 400);
            }
            break;

    }
});



function moveLeft() {//更多地细节信息  
    //判断格子是否能够向左移动  
    if (!canMoveLeft(board))
        return false;

    isaddedArray();
    //真正的moveLeft函数//标准  
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {//第一列的数字不可能向左移动  
            if (board[i][j] != 0) {
                //(i,j)左侧的元素  
                for (var k = 0; k < j; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物  
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物  
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        //add  
                        if (added[i][k] != 0) {//目标落脚点是否完成过合并  
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

function moveRight() {//更多地细节信息  
    //判断格子是否能够向右移动  
    if (!canMoveRight(board))
        return false;

    isaddedArray();
    //真正的moveRight函数//标准  
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {//最后一列的数字不可能向右移动  
            if (board[i][j] != 0) {
                //(i,j)右侧的元素  
                for (var k = 3; k > j; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物  
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move  
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物  
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

function moveUp() {//更多地细节信息  
    //判断格子是否能够向上移动  
    if (!canMoveUp(board))
        return false;

    isaddedArray();
    //真正的moveUp函数//标准  
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {//第一行的数字不可能向上移动  
            if (board[i][j] != 0) {
                //(i,j)上面的元素  
                for (var k = 0; k < i; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物  
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物  
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

function moveDown() {//更多地细节信息  
    //判断格子是否能够向下移动  
    if (!canMoveDown(board))
        return false;

    isaddedArray();
    //真正的moveDown函数//标准  
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {//最后一行的数字不可能向下移动  
            if (board[i][j] != 0) {
                //(i,j)上面的元素  
                for (var k = 3; k > i; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物  
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move  
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物  
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

function updateBoardView() {//更新数组的前端样式  
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
                //NumberCell覆盖  
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j])); //返回背景色  
                theNumberCell.css('color', getNumberColor(board[i][j])); //返回前景色
                theNumberCell.css('font-size', getFontSize(board[i][j])); 
                theNumberCell.text(board[i][j]);
                if (board[i][j] == 2048 || board[i][j] == 4096 || board[i][j] == 8192 || board[i][j] == 1024) {
                    theNumberCell.css('box-shadow', "0 0 20px" + getNumberBackgroundColor(board[i][j]));
                }
            }
        }
    }
}

function showNumberWithAnimation(i, j, randNumber) {//实现随机数字的样式变动  

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

function showMoveAnimation(fromx, fromy, tox, toy) {//实现移动格子的样式变动  

    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({ top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}  