var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');
var addSubtractDate = require("add-subtract-date");



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*
 * --------------------------------------------------------------------------
 * ads_by_category
 * INPUT : category_id
 * ---------------------------------------------------------------------------
 */
router.post('/ads_by_category', function (req, res, next) {
    var category_id = req.body.category_id;
    var today_date = new Date();
    var present_date = date.format(today_date, 'YYYY-MM-DD');
    var sql = "select * from epardesh_ads where ad_category_id=? and approved_status='1' and DATE(expiry_date) >=? and block_status='0' order by status";
    var values = [category_id, present_date]
    connection.query(sql, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * ads_by_sub_category
 * INPUT :category_id , sub_category_id
 * ---------------------------------------------------------------------------
 */
router.post('/ads_by_sub_category', function (req, res, next) {
    var category_id = req.body.category_id;
    var sub_category_id = req.body.sub_category_id;
    var today_date = new Date();
    var present_date = date.format(today_date, 'YYYY-MM-DD');
    var sql = "select * from epardesh_ads where ad_category_id=? and ad_sub_category_id=? and approved_status='1' and DATE(expiry_date) >=? and is_active='1' and block_status='0' order by status";
    var values = [category_id, sub_category_id, present_date]
    connection.query(sql, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_ads_by_choice
 * ---------------------------------------------------------------------------
 */

router.post('/view_ads_by_choice', function (req, res, next) {
    var status = req.body.status;
    var state = req.body.state;
    var city = req.body.city;
    var category_id = req.body.category_id;
    var sub_category_id = req.body.sub_category_id;
    var keyword = req.body.keyword;
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var image_array = [];
    var ads_with_images = []
    var data = [];
    var new_date = new Date();
    var today_date = date.format(new_date, 'YYYY-MM-DD');
    if (status == 0) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.state=? and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.state=? and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                console.log(k)
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 1) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? AND epardesh_ads.city LIKE '%" + city + "%') and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? AND epardesh_ads.city LIKE '%" + city + "%') and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, today_date]
            console.log(values)
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var ad_data = {
                                ad: ads_with_images,
                            }
                            var full_data = {
                                ads: ad_data,
                                trainings: '',
                                events: '',
                                count: length
                            }
                            sendResponse.sendSuccessData(full_data, res);
                        }
                    });
                }
            });
        });
    } else if (status == 2) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, category_id, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, category_id, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 3) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_sub_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, sub_category_id, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_sub_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, sub_category_id, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                console.log(k)
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 4) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [category_id, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [category_id, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 5) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_sub_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [sub_category_id, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_sub_category=?) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [sub_category_id, today_date]
            connection.query(sql, values, function (err, rows) {

                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ad: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 6) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 7) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > '" + today_date + "' or epardesh_ads.expiry_date is null) ;"
        connection.query(get_count, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 8) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, category_id, today_date]
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, category_id, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)

                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 9) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [category_id, today_date]
        console.log(values)
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.ad_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [category_id, today_date]
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;

                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                                console.log(final_data)
                                console.log("success1");
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                console.log(k)
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)

                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                        }
                    });
                }
            });
        });
    } else if (status == 10) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_sub_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [state, sub_category_id, today_date]
        console.log(values)
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.state=? and epardesh_ads.ad_sub_category=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [state, sub_category_id, today_date]
            console.log(values)
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    console.log(sql)
                    var length = rows.length;
                    console.log(length)
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                                console.log(final_data)
                                console.log("success1");
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                console.log(k)
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                            console.log("success2");
                        }
                    });
                }
            });
        });
    } else if (status == 11) {
        var get_count = "select count(*) as number_of_ads from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.sub_category_id=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null);"
        var values = [sub_category_id, today_date]
        console.log(values)
        connection.query(get_count, values, function (err, count) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = count[0].number_of_ads;
            }
            var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where (epardesh_ads.city LIKE '%" + city + "%' and epardesh_ads.sub_category_id=? and (epardesh_ads.ad_tittle LIKE '%" + keyword + "%' OR epardesh_ads.business_name LIKE '%" + keyword + "%')) and epardesh_ads.approved_status='1' and epardesh_ads.block_status='0' and (epardesh_ads.expiry_date > ? or epardesh_ads.expiry_date is null) ORDER BY epardesh_ads.ad_type desc, date_posted desc;"
            var values = [sub_category_id, today_date]
            console.log(values)
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    console.log(sql)
                    var length = rows.length;
                    console.log(length)
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            for (var k = 0; k < length; k++) {
                                console.log(k)
                                data = {
                                    ad_info: rows[k],
                                    image_info: final_data[k]
                                }
                                ads_with_images.push(data)
                                data = []
                            }
                            var final_json = {
                                ads: ads_with_images,
                                no_of_total_ads: no_of_ads
                            }
                            sendResponse.sendSuccessData(final_json, res);
                            console.log("success2");
                        }
                    });
                }
            });
        });
    }
});




/*
 * --------------------------------------------------------------------------
 * display_promotional_ads
 * ---------------------------------------------------------------------------
 */
router.post('/display_promotional_ads', function (req, res, next) {
    var promo_region = req.body.promo_region;
    var country_code = req.body.country;
    if (country_code == 1){
        var country = 'india'
    } else {
        var country = 'USA'
    }
    var nationwide_ad_array = [];
    var default_ad_array = [10]
    var promo_id_array = []
    var new_date = new Date();
    var today_date = date.format(new_date, 'YYYY-MM-DD');
    console.log(today_date)
    var get_promotional_ads = "select promotional_ads.image_url, promotional_ads.image_type, promotional_ad_states.promotional_ad_id from promotional_ads join promotional_ad_states on promotional_ads.id=promotional_ad_states.promotional_ad_id where (promotional_ad_states.city=? or promotional_ad_states.state=?) and promotional_ad_states.is_nationwide = 0 and promotional_ad_states.start_date<=?";
    var promotional_values = [promo_region, promo_region, today_date]
    connection.query(get_promotional_ads, promotional_values, function (err, promotional_ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var get_nationwide_ads = "select promotional_ads.image_url, promotional_ads.image_type, promotional_ad_states.promotional_ad_id from promotional_ads join promotional_ad_states on promotional_ads.id=promotional_ad_states.promotional_ad_id where promotional_ad_states.country=? and promotional_ad_states.is_nationwide = 1 and promotional_ad_states.start_date<=?";
            var nationwide_values = [country, today_date]
            connection.query(get_nationwide_ads, nationwide_values, function (err, nationwide_ads) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    if (nationwide_ads.length > 0) {
                        for (var i = 0; i < nationwide_ads.length; i++) {
                            var promotional_ad_id = nationwide_ads[i].promotional_ad_id;
                            console.log('index')
                            console.log(promotional_ad_id)
                            console.log(promo_id_array.indexOf(promotional_ad_id))

                            if (promo_id_array.indexOf(promotional_ad_id) == -1) {
                                nationwide_ad_array.push(nationwide_ads[i])
                                promo_id_array.push(promotional_ad_id)
                            }
                        }

                    }

                    if (promotional_ads.length > 0 || nationwide_ads.length > 0) {
                        var data = {
                            promotional_ads: promotional_ads,
                            nationwide_ads: nationwide_ad_array
                        }
                        sendResponse.sendSuccessData(data, res);
                    } else {
                        var get_default_promotional_ads = "select promotional_ads.image_url, promotional_ads.image_type, promotional_ad_states.promotional_ad_id from promotional_ads join promotional_ad_states on promotional_ads.id=promotional_ad_states.promotional_ad_id and promotional_ad_states.country='"+country+"' and promotional_ad_states.start_date<='" + today_date + "'";
                        console.log(get_default_promotional_ads)
                        connection.query(get_default_promotional_ads, function (err, rows1) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {

                                if (rows1.length > 0) {
                                    for (var i = 0; i < rows1.length; i++) {
                                        var promotional_ad_id = rows1[i].promotional_ad_id;
                                        console.log('index')
                                        console.log(promotional_ad_id)
                                        console.log(promo_id_array.indexOf(promotional_ad_id))

                                        if (promo_id_array.indexOf(promotional_ad_id) == -1) {
                                            default_ad_array.push(rows1[i])
                                            promo_id_array.push(promotional_ad_id)
                                        }
                                    }

                                }

                                var data = {
                                    promotional_ads: default_ad_array,
                                    nationwide_ads: []
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    }
                }
            })
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_ad_details
 * ---------------------------------------------------------------------------
 */

router.post('/view_ad_details', function (req, res, next) {
    var ad_id = req.body.ad_id;
    var user_id = req.body.user_id;
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var image_array = [];
    var ads_with_images = [];
    var id_array = [];
    var cat_array = []
    var data = [];
    var key = 0;
    if (user_id == '') {
        var get_ad_details = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?;"
        var values = [ad_id]
        connection.query(get_ad_details, values, function (err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = rows.length;
                var ad_cat_id = rows[0].ad_category;
                var ad_subcat_id = rows[0].ad_sub_category;

                var get_cat = "SELECT * FROM `epardesh_categories` WHERE id in (" + ad_cat_id + "," + ad_subcat_id + ")"
                connection.query(get_cat, function (err, categories) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var categories_length = categories.length
                        if (categories_length >= 2) {
                            var cat_name = categories[0].name;
                            var sub_cat_name = categories[1].name;
                        }

                        var ad_obj = rows[0];
                        ad_obj.category_name = cat_name;
                        ad_obj.sub_category_name = sub_cat_name;
                        for (var i = 0; i < length; i++) {
                            var images = rows[i].images;
                            image_array = images.split(",");
                            ad_images.push(image_array)
                            var ad_id = rows[i].id;
                            id_array.push(ad_id)
                        }
                        async.each(ad_images, function (image_array, callback) {
                            async.each(image_array, function (image_id, callback) {
                                var sql1 = 'select * from images where id=?';
                                var values1 = [image_id]
                                connection.query(sql1, values1, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        all_images.push(rows1)
                                    }
                                    callback();
                                })
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    final_data.push(all_images)
                                    all_images = [];
                                }
                                callback();
                            });
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                async.each(id_array, function (ad_id, callback) {
                                    var data_obj = rows[key];
                                    data_obj.favourite_status = 0
                                    console.log(data_obj)
                                    key++;
                                    callback();
                                }, function (err) {
                                    // if any of the file processing produced an error, err would equal that error
                                    if (err) {
                                        // One of the iterations produced an error.
                                        // All processing will now stop.
                                        console.log('A file failed to process');
                                    } else {
                                        for (var k = 0; k < length; k++) {
                                            data = {
                                                ad_info: rows[k],
                                                image_info: final_data[k]
                                            }
                                            ads_with_images.push(data)
                                            data = []
                                        }
                                        sendResponse.sendSuccessData(ads_with_images, res);
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    } else {
        var get_ad_details = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?;"
        var values = [ad_id]
        connection.query(get_ad_details, values, function (err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {

                var length = rows.length;
                var ad_cat_id = rows[0].ad_category;
                var ad_subcat_id = rows[0].ad_sub_category;

                var get_cat = "SELECT * FROM `epardesh_categories` WHERE id in (" + ad_cat_id + "," + ad_subcat_id + ")"
                connection.query(get_cat, function (err, categories) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var categories_length = categories.length
                        if (categories_length >= 2) {
                            var cat_name = categories[0].name;
                            var sub_cat_name = categories[1].name;
                        }

                        var ad_obj = rows[0];
                        ad_obj.category_name = cat_name;
                        ad_obj.sub_category_name = sub_cat_name;
                        for (var i = 0; i < length; i++) {
                            var images = rows[i].images;
                            image_array = images.split(",");
                            ad_images.push(image_array)
                            var ad_id = rows[i].id;
                            id_array.push(ad_id)
                        }
                        async.each(ad_images, function (image_array, callback) {
                            async.each(image_array, function (image_id, callback) {
                                var sql1 = 'select * from images where id=?';
                                var values1 = [image_id]
                                connection.query(sql1, values1, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        all_images.push(rows1)
                                    }
                                    callback();
                                })
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    final_data.push(all_images)
                                    all_images = [];
                                }
                                callback();
                            });
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                async.each(id_array, function (ad_id, callback) {
                                    var check_status = 'select * from favourite_ads where user_id=? and ad_id=?';
                                    var check_status_values = [user_id, ad_id]
                                    connection.query(check_status, check_status_values, function (err, fav_ads) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var data_obj = rows[key];
                                            if (fav_ads.length == '0' || fav_ads.length == 0) {
                                                data_obj.favourite_status = 0
                                            } else {
                                                data_obj.favourite_status = 1
                                            }
                                            key++;
                                            callback();
                                        }
                                    })
                                }, function (err) {
                                    // if any of the file processing produced an error, err would equal that error
                                    if (err) {
                                        // One of the iterations produced an error.
                                        // All processing will now stop.
                                        console.log('A file failed to process');
                                    } else {
                                        for (var k = 0; k < length; k++) {
                                            data = {
                                                ad_info: rows[k],
                                                image_info: final_data[k]
                                            }
                                            ads_with_images.push(data)
                                            data = []
                                        }
                                        sendResponse.sendSuccessData(ads_with_images, res);
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    }

});


/*
 * --------------------------------------------------------------------------
 * view_top_featured_ads
 * ---------------------------------------------------------------------------
 */
router.post('/view_top_featured_ads', function (req, res, next) {
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var ads_with_images = [];
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    var sql = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,epardesh_ads.updated_on,user.email,user.phone from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.approved_status='1' and epardesh_ads.ad_type='2' and epardesh_ads.expiry_date >= " + formatted_today_date + " ORDER BY id desc limit 5;"
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var length = rows.length;
            for (var i = 0; i < length; i++) {
                var images = rows[i].images;

                image_array = images.split(",");
                ad_images.push(image_array)
            }
            async.each(ad_images, function (image_array, callback) {
                async.each(image_array, function (image_id, callback) {
                    var sql1 = 'select * from images where id=?';
                    var values1 = [image_id]
                    connection.query(sql1, values1, function (err, rows1) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {

                            all_images.push(rows1)
                        }
                        callback();
                    })
                }, function (err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        final_data.push(all_images)
                        all_images = [];
                        console.log(final_data)
                        console.log("success1");
                    }
                    callback();
                });
            }, function (err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A file failed to process');
                } else {


                    for (var k = 0; k < length; k++) {
                        console.log(k)
                        data = {
                            ad_info: rows[k],
                            image_info: final_data[k]
                        }
                        ads_with_images.push(data)
                        data = []
                    }
                    var final_json = {
                        ads: ads_with_images,
                    }
                    sendResponse.sendSuccessData(final_json, res);

                    console.log("success2");
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * featured_and_trending_ads
 * ---------------------------------------------------------------------------
 */
router.post('/featured_and_trending_ads', function (req, res, next) {
    var lat = req.body.lat;
    var long = req.body.long;
    var featured_ad_images = [];
    var featured_all_images = [];
    var featured_final_data = [];
    var featured_ads_with_images = [];
    var trending_ad_images = [];
    var trending_final_data = [];
    var trending_ads_with_images = [];
    var all_images = [];
    var today_date = new Date();
    var present_date = date.format(today_date, 'YYYY-MM-DD');
//    var sql = "select * from epardesh_ads where latitude=? and longitude=? and DATE(expiry_date) >=? and is_active='1' and block_status='0'";
    var get_featured_ads = "SELECT *, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_ads` WHERE ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and DATE(expiry_date) >='" + present_date + "' and block_status='0' and ad_type='2' ORDER BY `distance` ASC limit 15"
    connection.query(get_featured_ads, function (err, featured_ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var length = featured_ads.length;
            for (var i = 0; i < length; i++) {
                var images = featured_ads[i].images;

                image_array = images.split(",");
                featured_ad_images.push(image_array)
            }
            async.each(featured_ad_images, function (featured_image_array, callback) {
                async.each(featured_image_array, function (image_id, callback) {
                    var sql1 = 'select * from images where id=?';
                    var values1 = [image_id]
                    connection.query(sql1, values1, function (err, rows1) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            featured_all_images.push(rows1)
                        }
                        callback();
                    })
                }, function (err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        featured_final_data.push(featured_all_images)
                        featured_all_images = [];
                    }
                    callback();
                });
            }, function (err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A file failed to process');
                } else {
                    for (var k = 0; k < length; k++) {
                        data = {
                            ad_info: featured_ads[k],
                            image_info: featured_final_data[k]
                        }
                        featured_ads_with_images.push(data)
                        data = []
                    }
                    var featured_final_json = {
                        ads: featured_ads_with_images
                    }
                    var get_trending_ads = "SELECT *, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_ads` WHERE ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and DATE(expiry_date) >='" + present_date + "' and block_status='0' and ad_type !='2' ORDER BY `id` desc, `distance` ASC limit 25"
                    connection.query(get_trending_ads, function (err, trending_ads) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var length = trending_ads.length;
                            for (var i = 0; i < length; i++) {
                                var images = trending_ads[i].images;
                                image_array = images.split(",");
                                trending_ad_images.push(image_array)
                            }
                            async.each(trending_ad_images, function (image_array, callback) {
                                async.each(image_array, function (image_id, callback) {
                                    var sql1 = 'select * from images where id=?';
                                    var values1 = [image_id]
                                    connection.query(sql1, values1, function (err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            all_images.push(rows1)
                                        }
                                        callback();
                                    })
                                }, function (err) {
                                    // if any of the file processing produced an error, err would equal that error
                                    if (err) {
                                        // One of the iterations produced an error.
                                        // All processing will now stop.
                                        console.log('A file failed to process');
                                    } else {
                                        trending_final_data.push(all_images)
                                        all_images = [];
                                    }
                                    callback();
                                });
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: trending_ads[k],
                                            image_info: trending_final_data[k]
                                        }
                                        trending_ads_with_images.push(data)
                                        data = []
                                    }
                                    var trending_final_json = {
                                        ads: trending_ads_with_images,
                                    }
                                    var final_ads_data = {
                                        featured_ads: featured_final_json,
                                        trending_ads: trending_final_json
                                    }
                                    sendResponse.sendSuccessData(final_ads_data, res);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * global_search
 * --------------------------------------------------------------------------
 */
router.post('/global_search', function (req, res, next) {
    var status = req.body.status;
    var lat = req.body.lattitude;
    var long = req.body.longitude;
    var user_id = req.body.user_id;
    var ads_with_images = [];
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var id_array = []
    var event_id_array = []
    var training_id_array = []
    var key = 0
    var key2 = 0
    var key3 = 0
    var today_date = new Date();
    var present_date = date.format(today_date, 'YYYY-MM-DD');
    if (status == 1) {
        var category_id = req.body.category_id;
        var sub_category_id = req.body.subcategory_id;
        var keyword = req.body.keyword;
        if (keyword == '') {
            var keyword_string = " like'%'";
        } else {
            var keyw = escape(keyword)
            var keyword_string = "LIKE '%" + keyw + "%'"
        }
        if (sub_category_id == '') {
            var sub_category_string = " like'%'";
        } else {
            var sub_category_string = "='" + sub_category_id + "'";
        }
        if (user_id == '') {
            var get_ads = "SELECT epardesh_ads.*,user.email,user.phone, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 as distance FROM `epardesh_ads` join user on epardesh_ads.user_id=user.id WHERE epardesh_ads.ad_category=" + category_id + " and epardesh_ads.ad_sub_category " + sub_category_string + " and (epardesh_ads.ad_tittle " + keyword_string + " or epardesh_ads.business_name " + keyword_string + " or epardesh_ads.ad_description " + keyword_string + ") and DATE(epardesh_ads.expiry_date) >='" + present_date + "' and epardesh_ads.block_status='0' and ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 6000 and epardesh_ads.approved_status!=4 order by ad_type desc,distance asc, id desc";

            connection.query(get_ads, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {

                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                        var ad_id = rows[i].id;
                        id_array.push(ad_id)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            async.each(id_array, function (ad_id, callback) {
                                var data_obj = rows[key];
                                data_obj.favourite_status = 0
                                console.log(data_obj)
                                key++;
                                callback();
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: rows[k],
                                            image_info: final_data[k]
                                        }
                                        ads_with_images.push(data)
                                        data = []
                                    }
                                    var ad_data = {
                                        ad: ads_with_images,
                                    }
                                    var full_data = {
                                        ads: ad_data,
                                        trainings: '',
                                        events: '',
                                        count: length
                                    }
                                    sendResponse.sendSuccessData(full_data, res);
                                }
                            });
                        }
                    });
                }
            });
        } else {
            var get_ads = "SELECT epardesh_ads.*,user.email,user.phone, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 as distance FROM `epardesh_ads` join user on epardesh_ads.user_id=user.id WHERE epardesh_ads.ad_category=" + category_id + " and epardesh_ads.ad_sub_category " + sub_category_string + " and (epardesh_ads.ad_tittle " + keyword_string + " or epardesh_ads.business_name " + keyword_string + " or epardesh_ads.ad_description " + keyword_string + ") and DATE(epardesh_ads.expiry_date) >='" + present_date + "' and epardesh_ads.block_status='0' and ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 6000 and epardesh_ads.approved_status!=4 order by ad_type desc,distance asc, id desc";
            connection.query(get_ads, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                        var ad_id = rows[i].id;
                        id_array.push(ad_id)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            async.each(id_array, function (ad_id, callback) {
                                var check_status = 'select * from favourite_ads where user_id=? and ad_id=?';
                                var check_status_values = [user_id, ad_id]
                                connection.query(check_status, check_status_values, function (err, fav_ads) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var data_obj = rows[key];
                                        if (fav_ads.length == '0' || fav_ads.length == 0) {
                                            data_obj.favourite_status = 0
                                        } else {
                                            data_obj.favourite_status = 1
                                        }
                                        key++;
                                        callback();
                                    }
                                })
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: rows[k],
                                            image_info: final_data[k]
                                        }
                                        ads_with_images.push(data)
                                        data = []
                                    }
                                    var ad_data = {
                                        ad: ads_with_images,
                                    }
                                    var full_data = {
                                        ads: ad_data,
                                        trainings: '',
                                        events: '',
                                        count: length
                                    }
                                    sendResponse.sendSuccessData(full_data, res);
                                }
                            });
                        }
                    });
                }
            });
        }
    } else if (status == 2) {
        var keyword = req.body.keyword;
        var training_id_array = [];
        var key = 0;
        if (keyword == '') {
            var keyw = escape(keyword)
            var keyword_string = "LIKE '%" + keyw + "%'"
        } else {
            var keyword_string = "LIKE '%" + keyword + "%'"
        }
        if (user_id == '') {
            var get_training = "SELECT * , ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_training` WHERE (training_tittle " + keyword_string + " or training_description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and active_status=1 and DATE(training_end_date) >='" + present_date + "' order by training_plan desc, id desc";
            connection.query(get_training, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        id_array.push(rows[i].id);
                    }
                    async.each(id_array, function (training_id, callback) {
                        var data_obj = rows[key];
                        data_obj.favourite_status = 0
                        console.log(data_obj)

                        key++;
                        callback();
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            data = {
                                ad_info: '',
                                image_info: ''
                            }
                            ads_with_images.push(data)
                            data = []
                            var ad_data = {
                                ad: ads_with_images,
                            }
                            var full_data = {
                                ads: '',
                                trainings: rows,
                                events: '',
                                count: length
                            }
                            sendResponse.sendSuccessData(full_data, res);
                        }
                    });
                }
            });
        } else {
            var get_training = "SELECT * , ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_training` WHERE (training_tittle " + keyword_string + " or training_description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and active_status=1 and DATE(training_end_date) >='" + present_date + "' order by training_plan desc, id desc";
            connection.query(get_training, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        training_id_array.push(rows[i].id)
                    }
                    async.each(training_id_array, function (training_id, callback) {
                        var check_status = 'select * from favourite_training where user_id=? and training_id=?';
                        var check_status_values = [user_id, training_id]
                        connection.query(check_status, check_status_values, function (err, fav_training) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var data_obj = rows[key];
                                if (fav_training.length == '0' || fav_training.length == 0) {
                                    data_obj.favourite_status = 0
                                } else {
                                    data_obj.favourite_status = 1
                                }
                                key++;
                                callback();
                            }
                        })
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            data = {
                                ad_info: '',
                                image_info: ''
                            }
                            ads_with_images.push(data)
                            data = []
                            var ad_data = {
                                ad: ads_with_images,
                            }
                            var full_data = {
                                ads: '',
                                trainings: rows,
                                events: '',
                                count: length
                            }
                            sendResponse.sendSuccessData(full_data, res);
                        }
                    });
                }
            });
        }
    } else if (status == 3) {
        if (user_id == '') {
            var keyword = req.body.keyword;
            if (keyword == '') {
                var keyword_string = " like'%'";
            } else {
                var keyw = escape(keyword)
                var keyword_string = "LIKE '%" + keyw + "%'"
            }
            var get_events = "SELECT * , ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_events` WHERE (event_tittle " + keyword_string + " or description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and approved_status=1 and active_status=1 and DATE(end_date) >='" + present_date + "' order by plan_id desc, id desc";
            console.log(get_events)
            connection.query(get_events, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        id_array.push(rows[i].id);
                    }

                    async.each(id_array, function (event_id, callback) {
                        var data_obj = rows[key];
                        data_obj.favourite_status = 0
                        console.log(data_obj)
                        key++;
                        callback();
                    }, function (err) {
                        data = {
                            ad_info: '',
                            image_info: ''
                        }
                        ads_with_images.push(data)
                        data = []
                        var ad_data = {
                            ad: ads_with_images,
                        }
                        var full_data = {
                            ads: '',
                            trainings: '',
                            events: rows,
                            count: length
                        }
                        sendResponse.sendSuccessData(full_data, res);
                    })
                }
            });
        } else {
            var keyword = req.body.keyword;
            var event_id_array = []
            var key = 0
            if (keyword == '') {
                var keyword_string = " like'%'";
            } else {
                var keyw = escape(keyword)
                var keyword_string = "LIKE '%" + keyw + "%'"
            }
            var get_events = "SELECT * , ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_events` WHERE (event_tittle " + keyword_string + " or description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and approved_status=1 and active_status=1 and DATE(end_date) >='" + present_date + "' order by plan_id desc, id desc";
            console.log(get_events)
            connection.query(get_events, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        event_id_array.push(rows[i].id);
                    }
                    console.log('event_id_array')
                    console.log(event_id_array)
                    async.each(event_id_array, function (event_id, callback) {
                        var check_status = 'select * from favourite_events where user_id=? and event_id=?';
                        var check_status_values = [user_id, event_id]
                        connection.query(check_status, check_status_values, function (err, fav_events) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                console.log(key)
                                var data_obj = rows[key];
                                if (fav_events.length == '0' || fav_events.length == 0) {
                                    data_obj.favourite_status = 0
                                } else {
                                    data_obj.favourite_status = 1
                                }
                                key++;
                                callback();
                            }
                        })
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            data = {
                                ad_info: '',
                                image_info: ''
                            }
                            ads_with_images.push(data)
                            data = []
                            var ad_data = {
                                ad: ads_with_images,
                            }
                            var full_data = {
                                ads: '',
                                trainings: '',
                                events: rows,
                                count: length
                            }
                            sendResponse.sendSuccessData(full_data, res);
                        }
                    });
                }
            });
        }
    } else {
        var category_id = req.body.category_id;
        var sub_category_id = req.body.subcategory_id;
        var keyword = req.body.keyword;
        if (keyword == '') {
            var keyword_string = " like'%'";
        } else {
            var keyw = escape(keyword)
            var keyword_string = "LIKE '%" + keyw + "%'"
        }
        if (category_id == '') {
            var category_string = " like'%'";
        } else {
            var category_string = "='" + category_id + "'";
        }
        if (sub_category_id == '') {
            var sub_category_string = " like'%'";
        } else {
            var sub_category_string = "='" + sub_category_id + "'";
        }
        if (user_id == '') {
            var get_ads = "SELECT epardesh_ads.*,user.email,user.phone FROM `epardesh_ads` join user on epardesh_ads.user_id=user.id WHERE epardesh_ads.ad_category " + category_string + " and epardesh_ads.ad_sub_category " + sub_category_string + " and (epardesh_ads.ad_tittle " + keyword_string + " or epardesh_ads.business_name " + keyword_string + ") and DATE(epardesh_ads.expiry_date) >='" + present_date + "' and epardesh_ads.block_status='0' and ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and epardesh_ads.approved_status!=4 order by ad_type desc, id desc";
            console.log(get_ads)
            connection.query(get_ads, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                        var ad_id = rows[i].id;
                        id_array.push(ad_id)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            async.each(id_array, function (ad_id, callback) {
                                var data_obj = rows[key];
                                data_obj.favourite_status = 0
                                key++;
                                callback();
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: rows[k],
                                            image_info: final_data[k]
                                        }
                                        ads_with_images.push(data)
                                        data = []
                                    }
                                    var ad_data = {
                                        ad: ads_with_images,
                                    }
                                    var get_training = "SELECT * , ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_training` WHERE (training_tittle " + keyword_string + " or training_description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and active_status=1 and DATE(training_end_date) >='" + present_date + "' order by training_plan desc, id desc";
                                    connection.query(get_training, function (err, training) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var no_of_training = training.length
                                            for (var i = 0; i < no_of_training; i++) {
                                                training_id_array.push(training[i].id);
                                            }
                                            async.each(training_id_array, function (training_id, callback) {
                                                var data_obj1 = training[key2];
                                                data_obj1.favourite_status = 0
                                                key2++;
                                                callback();
                                            }, function (err) {
                                                // if any of the file processing produced an error, err would equal that error
                                                if (err) {
                                                    // One of the iterations produced an error.
                                                    // All processing will now stop.
                                                    console.log('A file failed to process');
                                                } else {
                                                    var get_events = "SELECT * , ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_events` WHERE (event_tittle " + keyword_string + " or description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and DATE(end_date) >='" + present_date + "' order by plan_id desc, id desc";
                                                    connection.query(get_events, function (err, events) {
                                                        if (err) {
                                                            console.log(err)
                                                            var errorMsg = 'some error occurred';
                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                        } else {
                                                            var no_of_event = events.length
                                                            for (var i = 0; i < no_of_event; i++) {
                                                                event_id_array.push(events[i].id);
                                                            }
                                                            async.each(event_id_array, function (event_id, callback) {
                                                                var data_obj2 = events[key3];
                                                                data_obj2.favourite_status = 0
                                                                key3++;
                                                                callback();
                                                            }, function (err) {
                                                                // if any of the file processing produced an error, err would equal that error
                                                                if (err) {
                                                                    // One of the iterations produced an error.
                                                                    // All processing will now stop.
                                                                    console.log('A file failed to process');
                                                                } else {
                                                                    var data = {
                                                                        ads: ad_data,
                                                                        trainings: training,
                                                                        events: events,
                                                                        count: length
                                                                    }
                                                                    sendResponse.sendSuccessData(data, res);
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            });
        } else {
            var get_ads = "SELECT epardesh_ads.*,user.email,user.phone FROM `epardesh_ads` join user on epardesh_ads.user_id=user.id WHERE epardesh_ads.ad_category " + category_string + " and epardesh_ads.ad_sub_category " + sub_category_string + " and (epardesh_ads.ad_tittle " + keyword_string + " or epardesh_ads.business_name " + keyword_string + ") and DATE(epardesh_ads.expiry_date) >='" + present_date + "' and epardesh_ads.block_status='0' and ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and epardesh_ads.approved_status!=4 order by ad_type desc, id desc";
            console.log(get_ads)
            connection.query(get_ads, function (err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                        var images = rows[i].images;
                        image_array = images.split(",");
                        ad_images.push(image_array)
                        var ad_id = rows[i].id;
                        id_array.push(ad_id)
                    }
                    async.each(ad_images, function (image_array, callback) {
                        async.each(image_array, function (image_id, callback) {
                            var sql1 = 'select * from images where id=?';
                            var values1 = [image_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    all_images.push(rows1)
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                final_data.push(all_images)
                                all_images = [];
                            }
                            callback();
                        });
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            async.each(id_array, function (ad_id, callback) {
                                var check_status = 'select * from favourite_ads where user_id=? and ad_id=?';
                                var check_status_values = [user_id, ad_id]
                                connection.query(check_status, check_status_values, function (err, fav_ads) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var data_obj = rows[key];
                                        if (fav_ads.length == '0' || fav_ads.length == 0) {
                                            data_obj.favourite_status = 0
                                        } else {
                                            data_obj.favourite_status = 1
                                        }
                                        key++;
                                        callback();
                                    }
                                })
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: rows[k],
                                            image_info: final_data[k]
                                        }
                                        ads_with_images.push(data)
                                        data = []
                                    }
                                    var ad_data = {
                                        ad: ads_with_images,
                                    }
                                    var get_training = "SELECT * , ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_training` WHERE (training_tittle " + keyword_string + " or training_description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `training_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and DATE(training_end_date) >='" + present_date + "' order by training_plan desc, id desc";
                                    connection.query(get_training, function (err, training) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var no_of_training = training.length
                                            for (var i = 0; i < no_of_training; i++) {
                                                training_id_array.push(training[i].id)
                                            }
                                            async.each(training_id_array, function (training_id, callback) {
                                                var check_status = 'select * from favourite_training where user_id=? and training_id=?';
                                                var check_status_values = [user_id, training_id]
                                                connection.query(check_status, check_status_values, function (err, fav_training) {
                                                    if (err) {
                                                        console.log(err)
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {
                                                        var data_obj1 = training[key2];
                                                        if (fav_training.length == '0' || fav_training.length == 0) {
                                                            data_obj1.favourite_status = 0
                                                        } else {
                                                            data_obj1.favourite_status = 1
                                                        }
                                                        key2++;
                                                        callback();
                                                    }
                                                })
                                            }, function (err) {
                                                // if any of the file processing produced an error, err would equal that error
                                                if (err) {
                                                    // One of the iterations produced an error.
                                                    // All processing will now stop.
                                                    console.log('A file failed to process');
                                                } else {
                                                    var get_events = "SELECT * , ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `epardesh_events` WHERE (event_tittle " + keyword_string + " or description " + keyword_string + ") and approved_status = '1' and ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `event_lattitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 100 and DATE(end_date) >='" + present_date + "' order by plan_id desc, id desc";
                                                    connection.query(get_events, function (err, events) {
                                                        if (err) {
                                                            console.log(err)
                                                            var errorMsg = 'some error occurred';
                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                        } else {
                                                            var no_of_events = events.length
                                                            for (var i = 0; i < no_of_events; i++) {
                                                                event_id_array.push(events[i].id);
                                                            }
                                                            async.each(event_id_array, function (event_id, callback) {
                                                                var check_status = 'select * from favourite_events where user_id=? and event_id=?';
                                                                var check_status_values = [user_id, event_id]
                                                                connection.query(check_status, check_status_values, function (err, fav_events) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                        var errorMsg = 'some error occurred';
                                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                                    } else {
                                                                        var data_obj2 = events[key3];
                                                                        if (fav_events.length == '0' || fav_events.length == 0) {
                                                                            data_obj2.favourite_status = 0
                                                                        } else {
                                                                            data_obj2.favourite_status = 1
                                                                        }
                                                                        key3++;
                                                                        callback();
                                                                    }
                                                                })
                                                            }, function (err) {
                                                                // if any of the file processing produced an error, err would equal that error
                                                                if (err) {
                                                                    // One of the iterations produced an error.
                                                                    // All processing will now stop.
                                                                    console.log('A file failed to process');
                                                                } else {
                                                                    var data = {
                                                                        ads: ad_data,
                                                                        trainings: training,
                                                                        events: events,
                                                                        count: length
                                                                    }
                                                                    sendResponse.sendSuccessData(data, res);
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            });
        }

    }
});

/*
 * --------------------------------------------------------------------------
 * view_favourites
 * ---------------------------------------------------------------------------
 */

//router.post('/view_favourites', function (req, res, next) {
//    var access_token = req.body.access_token;
//    var user_id = req.body.user_id;
//    async.waterfall([
//        function (callback) {
//            checkUser(res, access_token, callback);
//        }],
//            function () {
//                var get_training_query = "select favourite_training.id as favourite_id, epardesh_training.* from favourite_training join epardesh_training on favourite_training.training_id=epardesh_training.id where favourite_training.user_id=epardesh_training.user_id"
//                var user_values = [user_id]
//                connection.query(get_training_query, user_values, function (err, favourite_trainings) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var get_event_query = "select favourite_events.id as favourite_id, epardesh_training.* from favourite_events join epardesh_training on favourite_events.event_id=epardesh_training.id where favourite_events.user_id=epardesh_training.user_id"
//                        var user_values = [user_id]
//                        connection.query(get_event_query, user_values, function (err, favourite_events) {
//                            if (err) {
//                                console.log(err)
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                var get_ads_query = "select favourite_ads.id as favourite_id, epardesh_training.* from favourite_ads join epardesh_training on favourite_ads.ad_id=epardesh_training.id where favourite_ads.user_id=epardesh_training.user_id"
//                                var user_values = [user_id]
//                                connection.query(get_ads_query, user_values, function (err, favourite_ads) {
//                                    if (err) {
//                                        console.log(err)
//                                        var errorMsg = 'some error occurred';
//                                        sendResponse.sendErrorMessage(errorMsg, res);
//                                    } else {
//                                        data = {
//                                            favourite_trainings: favourite_trainings,
//                                            favourite_events: favourite_events,
//                                            favourite_ads: favourite_ads
//                                        }
//                                        sendResponse.sendSuccessData(data, res);
//                                    }
//                                })
//                            }
//                        })
//                    }
//                })
//            })
//})

router.post('/view_favourites', function (req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var ads_with_images = [];
    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var get_event_query = "select favourite_events.id as favourite_id, epardesh_events.* from favourite_events join epardesh_events on favourite_events.event_id=epardesh_events.id where favourite_events.user_id=?"
                var user_values = [user_id]
                connection.query(get_event_query, user_values, function (err, favourite_events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var get_training_query = "select favourite_training.id as favourite_id, epardesh_training.* from favourite_training join epardesh_training on favourite_training.training_id=epardesh_training.id where favourite_training.user_id=?"
                        var user_values = [user_id]
                        connection.query(get_training_query, user_values, function (err, favourite_trainings) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var get_ads_query = "select favourite_ads.id as favourite_id, epardesh_ads.*,user.phone,user.email from favourite_ads join epardesh_ads on favourite_ads.ad_id=epardesh_ads.id join user on epardesh_ads.user_id=user.id where favourite_ads.user_id=?"
                                var user_values = [user_id]
                                connection.query(get_ads_query, user_values, function (err, favourite_ads) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var no_of_ads = favourite_ads.length;
                                        for (var i = 0; i < no_of_ads; i++) {
                                            var images = favourite_ads[i].images;
                                            image_array = images.split(",");
                                            ad_images.push(image_array)
                                        }
                                        async.each(ad_images, function (image_array, callback) {
                                            async.each(image_array, function (image_id, callback) {
                                                var sql1 = 'select * from images where id=?';
                                                var values1 = [image_id]
                                                connection.query(sql1, values1, function (err, rows1) {
                                                    if (err) {
                                                        console.log(err)
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {
                                                        all_images.push(rows1)
                                                    }
                                                    callback();
                                                })
                                            }, function (err) {
                                                // if any of the file processing produced an error, err would equal that error
                                                if (err) {
                                                    // One of the iterations produced an error.
                                                    // All processing will now stop.
                                                    console.log('A file failed to process');
                                                } else {
                                                    final_data.push(all_images)
                                                    all_images = [];
                                                }
                                                callback();
                                            });
                                        }, function (err) {
                                            // if any of the file processing produced an error, err would equal that error
                                            if (err) {
                                                // One of the iterations produced an error.
                                                // All processing will now stop.
                                                console.log('A file failed to process');
                                            } else {
                                                for (var k = 0; k < no_of_ads; k++) {
                                                    data = {
                                                        ad_info: favourite_ads[k],
                                                        image_info: final_data[k]
                                                    }
                                                    ads_with_images.push(data)
                                                    data = []
                                                }
                                                var ad_data = {
                                                    ad: ads_with_images,
                                                }
                                                var data = {
                                                    favourite_events: favourite_events,
                                                    favourite_training: favourite_trainings,
                                                    favourite_ads: ad_data
                                                }
                                                sendResponse.sendSuccessData(data, res);
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * filter_ads
 * ---------------------------------------------------------------------------
 */

router.post('/filter_ads', function (req, res, next) {
    var min_price = req.body.min_price;
    var max_price = req.body.max_price;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var min_miles = req.body.min_miles;
    var max_miles = req.body.max_miles;
    var posted_within_day = req.body.posted_within_day;
    var has_image = req.body.has_image;
    var title = req.body.title;
    var category_id = req.body.category_id;
    var sub_category_id = req.body.sub_category_id
    var user_id = req.body.user_id;
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var ads_with_images = [];
    var id_array = [];
    var key = 0;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')

    if (min_price == '' && max_price == '') {
        var price_string = "epardesh_ads.ad_price like'%'";
    } else if (min_price != '' && max_price == '') {
        var price_string = "epardesh_ads.ad_price >= '" + min_price + "'";
    } else if (min_price == '' && max_price != '') {
        var price_string = "epardesh_ads.ad_price <= '" + max_price + "'";
    } else {
        if (min_price == max_price) {
            var price_string = "epardesh_ads.ad_price = '" + min_price + "'";
        } else {
            var price_string = "(epardesh_ads.ad_price BETWEEN '" + min_price + "' AND '" + max_price + "')";
        }

    }

    if (posted_within_day == '') {
        var posted_day_string = "epardesh_ads.date_posted like '%'";
    } else {
        var int_days = parseInt(posted_within_day)
        var new_date = addSubtractDate.subtract(today_date, int_days, "days");
        var formatted_date = date.format(new_date, 'YYYY-MM-DD')
        console.log(formatted_date)
        var posted_day_string = "epardesh_ads.date_posted>='" + formatted_date + "'";
    }

    if (title == '') {
        var title_string = "epardesh_ads.ad_tittle like'%'"
    } else {
        var title_string = "epardesh_ads.ad_tittle LIKE '%" + title + "%'"
    }

    if (has_image == '0') {
        var image_string = "epardesh_ads.images like'%'"
    } else {
        var image_string = "epardesh_ads.images !=''"
    }
    if ((min_miles == 0 && max_miles == 0) || (min_miles == '0' && max_miles == '0')) {
        var distance_string = "ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 = '" + min_miles + "'";
    } else if (min_miles == '' && max_miles == '') {
        console.log('i am here')
        console.log(min_miles)
        console.log(max_miles)
        var distance_string = "ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 like '%'";
    } else if (min_miles != '' && max_miles == '') {
        var distance_string = "ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 >=" + min_miles + "";
    } else if (min_miles == '' && max_miles != '') {
        var distance_string = "ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 <=" + max_miles + "";
    } else {
        if (min_miles == max_miles) {
            var distance_string = "ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 = '" + min_miles + "'";
        } else {
            var distance_string = "(ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 BETWEEN '" + min_miles + "' AND '" + max_miles + "')";
        }
    }

    console.log('distance_string')
    console.log(distance_string)
    console.log('distance_string')


    if (category_id == '') {
        var category_string = "epardesh_ads.ad_category like'%'";
    } else {
        var category_string = "epardesh_ads.ad_category = '" + category_id + "'";
    }

    if (sub_category_id == '') {
        var sub_category_string = "epardesh_ads.ad_sub_category like'%'";
    } else {
        var sub_category_string = "epardesh_ads.ad_sub_category ='" + sub_category_id + "'";
    }


    if (user_id == '') {
        var get_ads = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,user.email,user.phone, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 as distance from epardesh_ads join user on epardesh_ads.user_id=user.id where " + price_string + " and " + posted_day_string + " and " + title_string + " and " + image_string + " and " + distance_string + " and " + category_string + " and " + sub_category_string + " and epardesh_ads.block_status!=1 and epardesh_ads.approved_status!=4 and epardesh_ads.expiry_date >=" + formatted_today_date + " order by id desc;"
        console.log(get_ads)
        connection.query(get_ads, function (err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = rows.length;
                for (var i = 0; i < no_of_ads; i++) {
                    var images = rows[i].images;
                    image_array = images.split(",");
                    ad_images.push(image_array)
                    var ad_id = rows[i].id;
                    id_array.push(ad_id)
                }

                async.each(ad_images, function (image_array, callback) {
                    async.each(image_array, function (image_id, callback) {
                        var sql1 = 'select * from images where id=?';
                        var values1 = [image_id]
                        connection.query(sql1, values1, function (err, rows1) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                all_images.push(rows1)
                            }
                            callback();
                        })
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            final_data.push(all_images)
                            all_images = [];
                        }
                        callback();
                    });
                }, function (err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        async.each(id_array, function (ad_id, callback) {
                            var data_obj = rows[key];
                            data_obj.favourite_status = 0
                            console.log(data_obj)
                            key++;
                            callback();
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {

                                for (var k = 0; k < no_of_ads; k++) {
                                    data = {
                                        ad_info: rows[k],
                                        image_info: final_data[k]
                                    }
                                    ads_with_images.push(data)
                                    data = []
                                }
                                sendResponse.sendSuccessData(ads_with_images, res);
                            }
                        });
                    }
                });
            }
        })
    } else {

        var get_ads = "select epardesh_ads.id,epardesh_ads.user_id,epardesh_ads.ad_category,epardesh_ads.ad_sub_category,epardesh_ads.ad_tittle,epardesh_ads.ad_description,epardesh_ads.business_name,epardesh_ads.ad_price,epardesh_ads.state,epardesh_ads.city,epardesh_ads.images,epardesh_ads.ad_type,epardesh_ads.approved_status,epardesh_ads.total_payable,epardesh_ads.date_posted,epardesh_ads.date_approved,epardesh_ads.expiry_date,epardesh_ads.views,user.email,user.phone, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 as distance from epardesh_ads join user on epardesh_ads.user_id=user.id where " + price_string + " and " + posted_day_string + " and " + title_string + " and " + image_string + " and " + distance_string + " and " + category_string + " and " + sub_category_string + " and epardesh_ads.block_status !=1 and epardesh_ads.approved_status!=4 and epardesh_ads.expiry_date >=" + formatted_today_date + " order by id desc;"
        console.log(get_ads)
        connection.query(get_ads, function (err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_ads = rows.length;
                for (var i = 0; i < no_of_ads; i++) {
                    var images = rows[i].images;
                    image_array = images.split(",");
                    ad_images.push(image_array)
                    var ad_id = rows[i].id;
                    id_array.push(ad_id)
                }

                async.each(ad_images, function (image_array, callback) {
                    async.each(image_array, function (image_id, callback) {
                        var sql1 = 'select * from images where id=?';
                        var values1 = [image_id]
                        connection.query(sql1, values1, function (err, rows1) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                all_images.push(rows1)
                            }
                            callback();
                        })
                    }, function (err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            final_data.push(all_images)
                            all_images = [];
                        }
                        callback();
                    });
                }, function (err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        async.each(id_array, function (ad_id, callback) {
                            var check_status = 'select * from favourite_ads where user_id=? and ad_id=?';
                            var check_status_values = [user_id, ad_id]
                            connection.query(check_status, check_status_values, function (err, fav_ads) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data_obj = rows[key];
                                    if (fav_ads.length == '0' || fav_ads.length == 0) {
                                        data_obj.favourite_status = 0
                                    } else {
                                        data_obj.favourite_status = 1
                                    }
                                    key++;
                                    callback();
                                }
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                for (var k = 0; k < no_of_ads; k++) {
                                    data = {
                                        ad_info: rows[k],
                                        image_info: final_data[k]
                                    }
                                    ads_with_images.push(data)
                                    data = []
                                }
                                sendResponse.sendSuccessData(ads_with_images, res);
                            }
                        });
                    }
                });
            }
        })
    }

})

/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : access_token
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `user` WHERE `access_token`=? limit 1";
    var values = [access_token];
    connection.query(sql, values, function (err, userResponse) {
        console.log(err)
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
