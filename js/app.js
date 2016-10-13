// 玩家要规避的敌人
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = Math.random() * 800; //每秒0-800px
    this.speed < 100 ? this.speed = 100 : this.speed = this.speed;
};
// 更新敌人的位置
Enemy.prototype.update = function(dt) {
    this.y = this.y;
    if (this.x <= 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = 0;
        this.speed = Math.random() * 800;
        this.speed < 100 ? this.speed = 100 : this.speed = this.speed;
    }
};
//绘制敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 创建玩家对象
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 490;
};
// 玩家的位置
player.prototype.update = function() {
    this.y = this.y;
    this.x = this.x;
};
// 绘制玩家
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 键盘输入控制
player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if ((this.x - 25) >= 0) {
                this.x = this.x - 25;
            }
            break;
        case 'up':
            if ((this.y - 25) >= 0) {
                this.y = this.y - 25;
            }
            break;
        case 'right':
            if ((this.x + 25) <= 425) {
                this.x = this.x + 25;
            }
            break;
        case 'down':
            if ((this.y + 25) <= 490) {
                this.y = this.y + 25;
            }
            break;
    }
};
//监听键盘按键事件
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
// 创建敌人实例，把所有敌人放进数组
var allEnemies = new Array();
for (i = 0; i < 3; i++) {
    var y = 60 + (i + 1) * 85;
    allEnemies[i] = new Enemy(y);
}
// 创建主人实例
var player = new player();
//主体撞到敌人物死亡
function checkCollisions() {
    for (i = 0; i < 3; i++) {
        var p_x = parseInt(player.x / 50);
        var e_x = parseInt(allEnemies[i].x / 50);
        var p_y = parseInt(player.y / 83);
        console.log(p_y);
        var e_y = parseInt(allEnemies[i].y / 83);
        if (p_x == e_x && p_y == e_y) {
            alert("很遗憾，您没有成功躲避！");
            player.x = 200;
            player.y = 490;
        }
        if (p_y == 0) {
            alert("恭喜！您赢了瓢虫！");
            player.x = 200;
            player.y = 490;
        }
    }
};

// 胜利判断
