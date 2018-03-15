function Copy(selector){
    $(selector).select();document.execCommand("copy");return false;
}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}