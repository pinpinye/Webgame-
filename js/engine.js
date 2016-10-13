/* Engine.js 初始化游戏界面，根据进程并对游戏界面不停地重绘，提供进行游戏的功能，
 * 创建canvas对象，提供全局变量，和app.js一起运行*/
var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
    canvas.width = 505;
    canvas.height = 630;
    doc.body.appendChild(canvas);
    // 调用　render 和 update,进行游戏
    function main() {
        /*
         定义间隔时间常量，使游戏中规定的速度在每台电脑上的体验一致
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        render();
        update(dt);
        //记录函数每次被调用的时间
        lastTime = now;
        /* 通过requestAnimationFrame 函数，一当浏览器可以建立另外一个frame的时候重复调用main函数 .
         */
        win.requestAnimationFrame(main);
    }
    /* 初始化函数，赋值last time的时间
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }
    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }
    /*用update函数调用 app.js的update函数,对数据进行更新（位置）
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    /* 绘制游戏界面，根据间隔时间或者游戏轮回不断地绘制
     */
    function render() {
        /* 存储背景图片的数组
         */
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = 5,
            row, col;
        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* 使用缓存中的图片进行界面背景的绘制
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }
    /* 调用app.js定义的render函数，绘制游戏主体 */
    function renderEntities() {
        /* 遍历定义的enemy对象         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }
    /* 提前下载游戏需要的所有图片，把init设置为回调函数，所有图片加载完开始游戏初始化
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);
    /* 指派canvas的对象为全局变量（在浏览器中执行时的winDow对象），所以在app.js等其他js文件中可以更加方便地使用这些变量.
     */
    global.ctx = ctx;
})(this);
