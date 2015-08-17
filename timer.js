/**
 * Created by vitas_000 on 14.08.2015.
 */
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

    var Countdown = function (){
        this.getTimeMillis = function (){
            var d = new Date();
            return d.getMilliseconds()
                + d.getSeconds()*1000
                + d.getMinutes()*60*1000
                + d.getHours()*3600*1000;
        };

        this.start = this.getTimeMillis();

        this.show = function () {

            if (!this.isPaused){
                if (!this.current) {
                    this.current = Date.now();
                }
                this.start -= Date.now() - this.current;
                this.current = Date.now();
            }
        };
        this.refresh = function () {
            this.start = this.getTimeMillis();
            this.toString();
        };
    };


    var Stopwatch = function() {

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

       this.show();
    };

    var AlarmClock = function(){
        this.stopSec = 0;

        this.setStopSec = function (sec){
            this.stopSec = sec;
        };

        this.show = function () {
            if (!this.isPaused){
                if (!this.current) {
                    this.current = Date.now();
                }
                this.start += Date.now() - this.current;
                this.current = Date.now();

                if (Math.floor(this.start/1000) === this.stopSec){
                    this.pause();
                }
            }
        };

        this.pause();
    };

    Countdown.prototype = new Timer();
    Stopwatch.prototype = new Timer();
    AlarmClock.prototype = new Stopwatch();

    var cd = new Countdown();
    var sw = new Stopwatch();
    var ac = new AlarmClock();
    var timer = sw;
    timer.pause();


    var id;
    $('#run').on('click',function(){
        id = setInterval(function(){

         $('#print').text(timer.toString());
         timer.show()
         },50);
    });

    $('#stop').on('click',function(){
        clearInterval(id);
    });

    $('#countdown').on('click',function(){
        $('#timerName').text('Countdown');
        timer = cd;
        timer.refresh();
        timer.play();
        $('#print').text(timer.toString());
        sw.pause();
        ac.pause();
    });
    $('#stopwatch').on('click',function(){
        $('#timerName').text('Stopwatch');
        sw.refresh();
        timer = sw;
        timer.play();
        $('#print').text(timer.toString());
        cd.pause();
        ac.pause();
    });

    $('#alarmclock').on('click',function(){
        $('#timerName').text('Alarm clock');
        ac.refresh();
        timer = ac;
        timer.play();
        $('#print').text(timer.toString());
        cd.pause();
        sw.pause();
    });

    $('#stopSec').blur(function (){
        ac.refresh();
        ac.setStopSec(parseInt($('#stopSec').val()));
    });

    $('#show').on('click',function(){
        timer.show();
        $('#print').text(timer.toString());
        timer.show();
    });
    $('#pause').on('click',function(){
        timer.pause();
    });
    $('#continue').on('click',function(){
        timer.play();
    });
    $('#refresh').on('click',function(){
        timer.refresh();
        $('#print').text(timer.toString());
        timer.show()
    });
});