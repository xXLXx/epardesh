var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');
var request = require('request');

var Client = require('coinbase').Client;

var client = new Client({
    'apiKey': 'PCwjmI9YPCOl58A6',
    'apiSecret': 'OFDf8a7FOFCHgN1NZvcxXWPt9BTz87TT',
});


router.post('/pay_with_bitcoin', function (req, res, next) {

    client.getAccount('primary', function (err, account) {
        console.log('account')
        console.log(account)
        account.createAddress({}, function (err, addr) {
            console.log('addr');
            console.log(addr);
            address = addr;
            sendResponse.sendSuccessData(address, res);
        });
    });
})


router.post('/send_by_bitcoin', function (req, res, next) {
    var address = req.body.address;
    var args = {'to': address,
        'amount': '0.00',
        'currency': 'BTC'}
//address="19kLR73CvxvkFoNJy4XomH5L1sGaTvT5i6"
    client.getAccount('primary', function (err, account) {
        account.sendMoney(args, {}, function (err, tx) {
            if (err) {
//                         var errorMsg = 'invalid user';
                console.log('err')
                console.log(err)
                var msg = err
                console.log(msg)
                sendResponse.sendErrorMessage(msg, res);
            } else {
                console.log('tx')
                console.log(tx)
                var data = {}
                sendResponse.sendSuccessData(data, res);
            }

        });
    });
})

router.post('/get_transaction_details', function (req, res, next) {
    var address = req.body.address;
    var url = 'http://btc.blockr.io/api/v1/address/txs/'+address+'';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = response.body.data
            console.log(data)
            sendResponse.sendSuccessData(data, res);
        }
    })

})

module.exports = router;
