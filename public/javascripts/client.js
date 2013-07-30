$(function() {
    "use strict";
    
    var timer;

    $("#loader").css("visibility", "hidden");

    // konashiとつながったら
    k.ready(function() {

        $("#loader").css("visibility", "hidden");

        // 接続中のkonashiの名前を取得
        k.peripheralName(function(name) {
            $("#target").text(name);
        });

        // IO設定
        k.pinMode(k.LED2, k.OUTPUT);
        k.pinMode(k.LED3, k.OUTPUT);
        k.pinMode(k.LED4, k.OUTPUT);
        k.pinMode(k.LED5, k.OUTPUT);

    });

    // PIOの入力状態が変化
    k.updatePioInput(function(data) {
        if (data == 1) {
            $("#toggleKR").addClass("active");
            knightRider();
        }
    });

    // Searchボタン
    $("#search_btn").click(function() {
        // konashiを探す
        k.find();
        $("#loader").css("visibility", "");
    });

    // LED - 個別
    $(".toggle").on("toggle", function(e) {
        var pin = $(e.currentTarget).data("pin");
        var value = $(e.currentTarget).hasClass("active");
        k.digitalWrite(pin, (value)? k.HIGH : k.LOW);
    });

    // LED - KnightRider
    $("#toggleKR").on("toggle", function() {
        knightRider();
    });

    var knightRider = function() {
        if ($("#toggleKR").hasClass("active")) {
            // 200msごとに実行
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
            }, 200);
        } else {
            // タイマ停止
            clearInterval(timer);
            // LEDすべてOFF
            k.digitalWriteAll(0);
        }
    };

});


