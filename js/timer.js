$(function(){

    var Timer = function() {
        this.start = 0;
        this.current = 0;
        this.isPaused = false;

        this.toString = function () {
            var time = this.start;
            var milliseconds = time  % 1000;
            time  = Math.floor(time  / 1000);
            var seconds = time  % 60;
            time  = Math.floor(time  / 60);
            var minutes = time  % 60;
            time  = Math.floor(time  / 60);
            var hours = time  % 60;

            time = format(hours) + " : " + format(minutes) + " : " + format(seconds) + "." + milliseconds;

            return time;
        };

        var format = function(timedata){
            return (timedata < 10) ? "0" + timedata : timedata;
        };

        this.play = function () {
            this.isPaused = false;
            this.show();
        };

        this.pause = function () {
            this.isPaused = true;
            this.current = null;
        };
    };


    var  Countdown = function() {

        this.show = function () {
            if (!this.isPaused){
                if (!this.current) {
                    this.current = Date.now();
                }
                this.start += Date.now() - this.current;
                this.current = Date.now();
            }
        };

        this.refresh = function () {
            this.start = 0;
            this.toString();
        };

    };

    var Stopwatch = function(){
        this.start = 0;
        var tempTime;

        this.setStopSec = function (sec){
            tempTime = sec*1000;
            this.start = tempTime;
        };

        this.show = function () {
            if (!this.isPaused){
                if (!this.current) {
                    this.current = Date.now();
                }
                this.start -= Date.now() - this.current;
                this.current = Date.now();

                if (Math.floor(this.start/1000) === 0){
                    this.start = 0;
                    this.pause();
                }
            }
        };

        this.refresh = function () {
            this.start = (tempTime === undefined) ? 0 : tempTime;
            this.toString();
        };
    };

    Countdown.prototype = new Timer();
    Stopwatch.prototype = new Countdown();

    //START UI CODE HERE

    var cd = new Countdown();
    var sw = new Stopwatch();
    var timer = cd;
    var id;

    function startTimer(){
        id = setInterval(function(){
            $('.print').text(timer.toString());
            timer.show()
        },50);
    }

    startTimer();
    timer.play();

    $('.print').text(timer.toString());
    $('#countdownLink').on('click',function(){
        timer = cd;
        sw.pause()
    });
    $('#stopwatchLink').on('click',function(){
        timer = sw;
        cd.pause();
    });

    $('#stopSec').blur(function (){
        sw.refresh();
        sw.setStopSec(parseInt($('#stopSec').val()));

    });


    $('.pause').on('click',function(){
        timer.pause();
        clearInterval(id);
    });
    $('.continue').on('click',function(){
        startTimer();
        timer.play();
    });
    $('.refresh').on('click',function(){
        timer.refresh();
        timer.pause();
    });



});