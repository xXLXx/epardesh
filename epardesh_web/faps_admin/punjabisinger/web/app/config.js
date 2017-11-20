var config = {};

config.appSettings = {};
config.appSettings.serviceUrl = 'http://54.172.109.78:3300/';
//Pusher.log = function(message) {
//    if (window.console && window.console.log) {
//        window.console.log(message);
//    }
//};
//channel = 'hihi';
//pusher = "";
//
//function conncetPusher(id) {
//    pusher = new Pusher('7388fab17716ba1dfef0', {
//        encrypted: true
//    });
//    pusher.connection.bind('error', function(err) {
//        console.log("In Error");
//        if (err.data.code === 4004) {
//            console.log('>>> detected limit error');
//        }
//    });
//    channel = pusher.subscribe(id);
//}
//function sendDataPusher(data) {
////    var pusher = new Pusher({
////        appId: '197402',
////        key: '7388fab17716ba1dfef0',
////        secret: 'edc61410183adbf8d143',
////        encrypted: true
////    });
//pusher = new Pusher('7388fab17716ba1dfef0', {
//        encrypted: true
//    });
//    console.log(data);
//    console.log("inside function");
//    channel1 = pusher.subscribe('game_answers');
//    console.log(channel1)
////    channel.bind('pusher:subscription_succeeded', function() {
////        var triggered = channel.trigger('client-playGame', data);
////        console.log(triggered);
////    });
//    channel1.trigger('client-playGame', data);
//}
