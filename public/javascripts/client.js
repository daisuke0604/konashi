$(function() {

    var timer;

    // konashiとつながったら
    k.ready(function() {

        // IO設定
        k.pinMode(k.LED2, k.OUTPUT);
        k.pinMode(k.LED3, k.OUTPUT);
        k.pinMode(k.LED4, k.OUTPUT);
        k.pinMode(k.LED5, k.OUTPUT);

    });

    // Searchボタン
    $("#search_btn").click(function() {
        // konashiを探す
        k.find();
    });

    // Startボタン
    $("#start_btn").click(function() {
        // 100msごとに実行
        var i = 0;
        var dir = true;
        timer = setInterval(function() {
            // LED点灯
            k.digitalWriteAll(1 << (i + k.LED2));

            if (dir) {
                i++;
            } else {
                i--;
            }
            if (i <= 0) dir = true;
            if (i >= 3) dir = false;
        }, 100);
    });

    // Stopボタン
    $("#stop_btn").click(function() {
        // タイマ停止
        clearInterval(timer);
        // LEDすべてOFF
        k.digitalWriteAll(0);
    });

});


