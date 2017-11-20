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
 * matrimony_search
 * --------------------------------------------------------------------------
 */

router.post('/matrimony_search', function (req, res, next) {
    var id = req.body.id;
    var keyword = req.body.keyword;
    var gender = req.body.gender;
    var min_age = req.body.min_age;
    var max_age = req.body.max_age;
    var caste = req.body.caste;
    var country = req.body.country;
    var religion = req.body.religion;
    var min_height = req.body.min_height;
    var max_height = req.body.max_height;
    var mother_tounge = req.body.mother_tounge;
    var current_residence = req.body.current_residence;
    var education = req.body.education;
    var id_array = []

//    if (keyword == '') {
//        var keyword_string = " like'%'";
//    } else {
//        var keyword_string = "LIKE '%" + keyword + "%'"
//    }
    if (gender == '') {
        var gender_string = " like'%'";
    } else {
        var gender_string = "='" + gender + "'";
    }

    if (caste == '') {
        var caste_string = " like'%' or community is null";
    } else {
        var caste_string = "='" + caste + "'";
    }

    if (religion == '') {
        var religion_string = " like'%' or religion is null";
    } else {
        var religion_string = "='" + religion + "'";
    }

    if (country == '') {
        var country_string = " like'%'"
    } else {
        var country_string = "='" + country + "'";
    }

    if (mother_tounge == '') {
        var mother_tounge_string = " like'%' or mother_tounge is null"
    } else {
        var mother_tounge_string = "='" + mother_tounge + "'";
    }

    if (current_residence == '') {
        var current_residence_string = " like'%' or current_residence is null"
    } else {
        var current_residence_string = "='" + current_residence + "'";
    }

    if (education == '') {
        var education_string = " like'%' or education is null";
    } else {
        var education_string = "='" + education + "'";
    }

    if (min_age == '' && max_age == '') {
        var age_string = " like'%' or age is null"
    } else if (min_age == '' && max_age != '') {
        var age_string = " <" + max_age + ""
    } else if (max_age == '' && min_age != '') {
        var age_string = " >" + min_age + ""
    } else {
        var age_string = "between " + min_age + " and " + max_age + ""
    }

    if (min_height == '' && max_height == '') {
        var height_string = " like'%' or age is null"
    } else if (min_height == '' && max_height != '') {
        var height_string = "<" + max_height + ""
    } else if (max_height == '' && min_height != '') {
        var height_string = ">" + min_height + ""
    } else {
        var height_string = "between " + min_height + " and " + max_height + ""
    }

    if (id == '') {
        var get_search_result = "select * from matrimony_user where (profile_id " + keyword_string + " or first_name " + keyword_string + ") and gender " + gender_string + " and (community" + caste_string + ") and (religion " + religion_string + ") and age between " + min_age + " and " + max_age + " and country " + country_string + " and (mother_tounge" + mother_tounge_string + ") and height_in_cm between " + min_height + " and " + max_height + " and block_status=0 order by membership_plan desc";
        console.log(get_search_result)
        connection.query(get_search_result, function (err, result) {
            if (err)
            {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                sendResponse.sendSuccessData(result, res);
            }
        })
    } else {
        if (keyword == '') {
            var keyword_string = " like'%'";
            var get_search_result = "select * from matrimony_user where (profile_id " + keyword_string + " or first_name " + keyword_string + ") and gender " + gender_string + " and (community" + caste_string + ") and (religion " + religion_string + ") and (age " + age_string + ") and country " + country_string + " and (mother_tounge" + mother_tounge_string + ") and (current_residence" + current_residence_string + ") and (education" + education_string + ") and (height_in_cm " + height_string + ") and block_status=0 order by membership_plan desc";
            console.log('keyword empty')
            console.log(get_search_result)
            connection.query(get_search_result, function (err, rows) {
                if (err)
                {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var number_of_profiles = rows.length;
                    for (var i = 0; i < number_of_profiles; i++) {
                        var user_id = rows[i].id;
                        id_array.push(user_id);
                    }
                    var key = 0
                    var key1 = 0
                    async.each(id_array, function (user_id, callback) {
                        var check_status = 'select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=3';
                        var check_status_values = [id, user_id]
                        connection.query(check_status, check_status_values, function (err, favourite_profiles) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var check_req_status = 'select * from matrimony_connect_requests where ((sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?))and status=2 and (approve_status=0 or approve_status=1)';
                                var check_req_status_values = [id, user_id, user_id, id]
                                connection.query(check_req_status, check_req_status_values, function (err, requested_profiles) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var data_obj = rows[key];
                                        if (requested_profiles.length > '0' || requested_profiles.length > 0) {
                                            data_obj.request_status = 1
                                        } else {
                                            data_obj.request_status = 0
                                        }
                                        key++;
                                        var data_obj = rows[key1];
                                        if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                            data_obj.status = 1
                                        } else {
                                            data_obj.status = 0
                                        }
                                        key1++;
                                        console.log(favourite_profiles)
                                        callback();
                                    }
                                })
                            }
                        })
                    }, function (err) {
                        if (err) {
                            console.log('A file failed to process');
                        } else {
                            console.log('in_loop');
                            sendResponse.sendSuccessData(rows, res);
                            console.log("success");
                        }
                    });
                }
            })
        } else {
            
            var splitted_keyword = keyword.split(" ");
            var no_of_keywords = splitted_keyword.length;
            if (no_of_keywords == 1) {
                var length_of_keyword = keyword.length;
                if (length_of_keyword == 9) {

//                    var keyword_string = "LIKE '%" + keyword + "%'"
                    console.log('keyword 9')
                    var get_search_result = "select * from matrimony_user where profile_id = '"+keyword+"' and block_status=0";
                    console.log(get_search_result)
                    connection.query(get_search_result, function (err, rows) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var number_of_profiles = rows.length;

                            if (number_of_profiles > 0) {
                                for (var i = 0; i < number_of_profiles; i++) {
                                    var user_id = rows[i].id;
                                    id_array.push(user_id);
                                }
                                var key = 0
                                var key1 = 0
                                async.each(id_array, function (user_id, callback) {
                                    var check_status = 'select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=3';
                                    var check_status_values = [id, user_id]
                                    connection.query(check_status, check_status_values, function (err, favourite_profiles) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var check_req_status = 'select * from matrimony_connect_requests where ((sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?))and status=2 and (approve_status=0 or approve_status=1)';
                                            var check_req_status_values = [id, user_id, user_id, id]
                                            connection.query(check_req_status, check_req_status_values, function (err, requested_profiles) {
                                                if (err) {
                                                    console.log(err)
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    console.log(requested_profiles)
                                                    var data_obj = rows[key];
                                                    if (requested_profiles.length > '0' || requested_profiles.length > 0) {
                                                        data_obj.request_status = 1
                                                    } else {
                                                        data_obj.request_status = 0
                                                    }
                                                    key++;
                                                    var data_obj = rows[key1];
                                                    if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                                        data_obj.status = 1
                                                    } else {
                                                        data_obj.status = 0
                                                    }
                                                    key1++;
                                                    console.log(favourite_profiles)
                                                    callback();
                                                }
                                            })
                                        }
                                    })
                                }, function (err) {
                                    // if any of the file processing produced an error, err would equal that error
                                    if (err) {
                                        console.log('A file failed to process');
                                    } else {
                                        console.log('in_loop');
                                        sendResponse.sendSuccessData(rows, res);
                                        console.log("success");
                                    }
                                });
                            } else {
                                console.log('keyword 9 else')
                                var keyword_string = "LIKE '%" + keyword + "%'"
                                var get_search_result = "select * from matrimony_user where (profile_id " + keyword_string + " or first_name " + keyword_string + " or last_name " + keyword_string + ") and gender " + gender_string + " and (community" + caste_string + ") and (religion " + religion_string + ") and (age " + age_string + ") and country " + country_string + " and (mother_tounge" + mother_tounge_string + ") and (current_residence" + current_residence_string + ") and (education" + education_string + ") and (height_in_cm " + height_string + ") and block_status=0 order by membership_plan desc";
                                console.log(get_search_result)
                                connection.query(get_search_result, function (err, rows) {
                                    if (err)
                                    {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var number_of_profiles = rows.length;
                                        for (var i = 0; i < number_of_profiles; i++) {
                                            var user_id = rows[i].id;
                                            id_array.push(user_id);
                                        }
                                        var key = 0
                                        var key1 = 0
                                        async.each(id_array, function (user_id, callback) {
                                            var check_status = 'select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=3';
                                            var check_status_values = [id, user_id]
                                            connection.query(check_status, check_status_values, function (err, favourite_profiles) {
                                                if (err) {
                                                    console.log(err)
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    var check_req_status = 'select * from matrimony_connect_requests where ((sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?))and status=2 and (approve_status=0 or approve_status=1)';
                                                    var check_req_status_values = [id, user_id, user_id, id]
                                                    connection.query(check_req_status, check_req_status_values, function (err, requested_profiles) {
                                                        if (err) {
                                                            console.log(err)
                                                            var errorMsg = 'some error occurred';
                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                        } else {
                                                            console.log(requested_profiles)
                                                            var data_obj = rows[key];
                                                            if (requested_profiles.length > '0' || requested_profiles.length > 0) {
                                                                data_obj.request_status = 1
                                                            } else {
                                                                data_obj.request_status = 0
                                                            }
                                                            key++;
                                                            var data_obj = rows[key1];
                                                            if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                                                data_obj.status = 1
                                                            } else {
                                                                data_obj.status = 0
                                                            }
                                                            key1++;
                                                            console.log(favourite_profiles)
                                                            callback();
                                                        }
                                                    })
                                                }
                                            })
                                        }, function (err) {
                                            // if any of the file processing produced an error, err would equal that error
                                            if (err) {
                                                console.log('A file failed to process');
                                            } else {
                                                console.log('in_loop');
                                                sendResponse.sendSuccessData(rows, res);
                                                console.log("success");
                                            }
                                        });
                                    }
                                })

                            }
                        }
                    })
                } else {
                    console.log('keyword not 9')
                    var keyword_string = "LIKE '%" + keyword + "%'"
                    var get_search_result = "select * from matrimony_user where (profile_id " + keyword_string + " or first_name " + keyword_string + " or last_name " + keyword_string + ") and gender " + gender_string + " and (community" + caste_string + ") and (religion " + religion_string + ") and (age " + age_string + ") and country " + country_string + " and (mother_tounge" + mother_tounge_string + ") and (current_residence" + current_residence_string + ") and (education" + education_string + ") and (height_in_cm " + height_string + ") and block_status=0 order by membership_plan desc";
                    console.log(get_search_result)
                    connection.query(get_search_result, function (err, rows) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var number_of_profiles = rows.length;
                            for (var i = 0; i < number_of_profiles; i++) {
                                var user_id = rows[i].id;
                                id_array.push(user_id);
                            }
                            var key = 0
                            var key1 = 0
                            async.each(id_array, function (user_id, callback) {
                                var check_status = 'select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=3';
                                var check_status_values = [id, user_id]
                                connection.query(check_status, check_status_values, function (err, favourite_profiles) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var check_req_status = 'select * from matrimony_connect_requests where ((sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?))and status=2 and (approve_status=0 or approve_status=1)';
                                        var check_req_status_values = [id, user_id, user_id, id]
                                        connection.query(check_req_status, check_req_status_values, function (err, requested_profiles) {
                                            if (err) {
                                                console.log(err)
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                console.log(requested_profiles)
                                                var data_obj = rows[key];
                                                if (requested_profiles.length > '0' || requested_profiles.length > 0) {
                                                    data_obj.request_status = 1
                                                } else {
                                                    data_obj.request_status = 0
                                                }
                                                key++;
                                                var data_obj = rows[key1];
                                                if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                                    data_obj.status = 1
                                                } else {
                                                    data_obj.status = 0
                                                }
                                                key1++;
                                                console.log(favourite_profiles)
                                                callback();
                                            }
                                        })
                                    }
                                })
                            }, function (err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    console.log('A file failed to process');
                                } else {
                                    console.log('in_loop');
                                    sendResponse.sendSuccessData(rows, res);
                                    console.log("success");
                                }
                            });
                        }
                    })
                }






            } else {
                console.log('keyword 2')
                var frst_name = splitted_keyword[0];
                var scnd_name = splitted_keyword[1];
                var keyword_string = "LIKE '%" + frst_name + "%' and last_name LIKE '%" + scnd_name + "%'"
                var get_search_result = "select * from matrimony_user where ((profile_id " + keyword_string + ") or (first_name " + keyword_string + ")) and gender " + gender_string + " and (community" + caste_string + ") and (religion " + religion_string + ") and (age " + age_string + ") and country " + country_string + " and (mother_tounge" + mother_tounge_string + ") and (current_residence" + current_residence_string + ") and (education" + education_string + ") and height_in_cm between " + min_height + " and " + max_height + " and block_status=0 order by membership_plan desc";
                console.log(get_search_result)
                connection.query(get_search_result, function (err, rows) {
                    if (err)
                    {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var number_of_profiles = rows.length;
                        for (var i = 0; i < number_of_profiles; i++) {
                            var user_id = rows[i].id;
                            id_array.push(user_id);
                        }
                        var key = 0
                        var key1 = 0
                        async.each(id_array, function (user_id, callback) {
                            var check_status = 'select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=3';
                            var check_status_values = [id, user_id]
                            connection.query(check_status, check_status_values, function (err, favourite_profiles) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var check_req_status = 'select * from matrimony_connect_requests where ((sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?))and status=2 and (approve_status=0 or approve_status=1)';
                                    var check_req_status_values = [id, user_id, user_id, id]
                                    connection.query(check_req_status, check_req_status_values, function (err, requested_profiles) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            console.log(requested_profiles)
                                            var data_obj = rows[key];
                                            if (requested_profiles.length > '0' || requested_profiles.length > 0) {
                                                data_obj.request_status = 1
                                            } else {
                                                data_obj.request_status = 0
                                            }
                                            key++;
                                            var data_obj = rows[key1];
                                            if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                                data_obj.status = 1
                                            } else {
                                                data_obj.status = 0
                                            }
                                            key1++;
                                            console.log(favourite_profiles)
                                            callback();
                                        }
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
                                console.log('in_loop');
                                sendResponse.sendSuccessData(rows, res);
                                console.log("success");
                            }
                        });
                    }
                })
            }
        }
    }
});

module.exports = router;