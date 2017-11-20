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
 * admin_view_plans
 * --------------------------------------------------------------------------
 */
router.post('/admin_view_plans', function (req, res, next) {
    var get_plans = "select * from matrimony_plans";
    connection.query(get_plans, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0 || rows.length > '0') {
                sendResponse.sendSuccessData(rows, res);
            } else {
                var errorMsg = 'invalid id';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * admin_edit_plans
 * --------------------------------------------------------------------------
 */
router.post('/admin_edit_plans', function (req, res, next) {
    var plan_id = req.body.plan_id;
//    var plan_type = req.body.plan_type;
    var plan_name = req.body.plan_name;
    var plan_price = req.body.plan_price;

    var edit_plans = "update matrimony_plans set plan_name=?, plan_price=? where id=?";
    var values = [plan_name, plan_price, plan_id]
    connection.query(edit_plans, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * matrimony_add_promocode
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_add_promocode', function (req, res, next) {
    var promocode_name = req.body.promocode_name;
    var discount = req.body.discount;
    var add_promocode = "insert into matrimony_promocodes (name,discount) values (?,?)"
    var values = [promocode_name, discount]
    connection.query(add_promocode, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * matrimony_view_promocode
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_view_promocode', function (req, res, next) {

    var get_promocode = "select * from matrimony_promocodes order by id desc"
    connection.query(get_promocode, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * matrimony_edit_promocode
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_edit_promocode', function (req, res, next) {

    var promocode_id = req.body.promocode_id;
    var promocode_name = req.body.promocode_name;
    var promocode_discount = req.body.promocode_discount;

    var check_promocode = "select * from matrimony_promocodes where id=?"
    var code_value = [promocode_id];
    connection.query(check_promocode, code_value, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var edit_query = "update matrimony_promocodes set name=?, discount=? where id=?";
                var promocode_values = [promocode_name, promocode_discount, promocode_id]
                connection.query(edit_query, promocode_values, function (err, result) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var data = {}
                        sendResponse.sendSuccessData(data, res);
                    }
                })
            } else {
                var errorMsg = "invalid promocode id";
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * matrimony_delete_promocode
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_delete_promocode', function (req, res, next) {

    var promocode_id = req.body.promocode_id;
    var code_value = [promocode_id];

    var check_promocode = "select * from matrimony_promocodes where id=?"
    connection.query(check_promocode, code_value, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var delete_query = "delete from matrimony_promocodes where id=?";
                connection.query(delete_query, code_value, function (err, result) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var data = {}
                        sendResponse.sendSuccessData(data, res);
                    }
                })
            } else {
                var errorMsg = "invalid promocode id";
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });
})



module.exports = router;