/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');

/*
 * --------------------------------------------------------------------------
 * matrimony_inbox
 * --------------------------------------------------------------------------
 */

router.post('/matrimony_inbox', function (req, res, next) {
    var access_token = req.body.access_token;
    var id = req.body.id;
    var sender_array = [];
    var message_array = []
    var manValues = [id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var get_sender = "select * from matrimony_inbox where receiver_id=? or sender_id=?";
                var values = [id,id]
                connection.query(get_sender, values, function (err, result) {
                    if (err)
                    {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var no_of_msg = result.length;
                        for (var i = 0; i < no_of_msg; i++) {
                            var sndr_id = result[i].sender_id;
                            var rcvr_id = result[i].receiver_id;
                            if(sndr_id == id){
                                var sender_id = rcvr_id
                            }else if(rcvr_id == id){
                                var sender_id = sndr_id
                            }
                            if (sender_array.indexOf(sender_id) == -1) {
                                sender_array.push(sender_id)
                            }
                        }
                        async.each(sender_array, function (sender_id, callback) {
                            var get_user = 'select * from matrimony_user where id=?';
                            var get_user_values = [sender_id]
                            connection.query(get_user, get_user_values, function (err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {                                   
                                    var get_user = 'select * from matrimony_inbox where (sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?) order by id desc';
                                    var get_user_values = [sender_id,id,id,sender_id]
                                    connection.query(get_user, get_user_values, function (err, messages) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                           var no_of_messages = messages.length;
                                           var msg_array = []                                           
                                           for(var j=0;j<no_of_messages;j++){
                                               msg_array.push(messages[j])
                                           }
                                            var data = {
                                                user_info: rows,
                                                messages: msg_array
                                            }                                           
                                            message_array.push(data)                                             
                                        }
                                         callback();
                                    })
                                }                               
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                console.log(message_array)
                                 console.log('message_array')
                                sendResponse.sendSuccessData(message_array, res);
                            }
                        });
                    }
                })
            })
});









///*
// * --------------------------------------------------------------------------
// * view_message_thread
// * --------------------------------------------------------------------------
// */
//router.post('/view_message_thread', function (req, res, next) {
//    var access_token = req.body.access_token;
//    var sender_id = req.body.sender_id;
//    var receiver_id = req.body.receiver_id;
//    var manValues = [sender_id, receiver_id, access_token]
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        },
//        function (callback) {
//            checkUser(res, access_token, callback);
//        }],
//            function () {
//                var get_messages = "select matrimony_inbox.id as message_id,matrimony_inbox.message, matrimony_inbox.time, matrimony_user.first_name as sender_first_name, matrimony_user.last_name as sender_last_name, matrimony_user.id as sender_id from matrimony_inbox join matrimony_user on matrimony_inbox.sender_id=matrimony_user.id where matrimony_inbox.sender_id=? and matrimony_inbox.receiver_id=? order by matrimony_inbox.id desc";
//                var values = [sender_id, receiver_id]
//                connection.query(get_messages, values, function (err, result) {
//                    if (err)
//                    {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        sendResponse.sendSuccessData(result, res);
//                    }
//                })
//            })
//});






/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : email
 * OUTPUT : email available or not
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `matrimony_user` WHERE `access_token`=? limit 1";
    var values = [access_token];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}
module.exports = router;