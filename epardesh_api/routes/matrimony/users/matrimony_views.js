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
var date = require('date-and-time');
/*
 * --------------------------------------------------------------------------
 * view_matrimony_religions
 * --------------------------------------------------------------------------
 */
router.post('/view_matrimony_religions', function (req, res, next) {
    var country_code = req.body.country_code;
    var get_religion = "select * from matrimony_religions where country_code=? order by name";
    var values = [country_code];
    connection.query(get_religion, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                sendResponse.sendSuccessData(rows, res);
            } else {
                var errorMsg = 'invalid country code';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_matrimony_plans
 * --------------------------------------------------------------------------
 */
router.post('/view_matrimony_plans', function (req, res, next) {
    var get_plans = "select * from matrimony_plans";
    connection.query(get_plans, function (err, rows) {
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
 * view_suggested_profiles
 * --------------------------------------------------------------------------
 */

router.post('/view_suggested_profiles', function (req, res, next) {
    var id = req.body.id;
    var id_array = [];
    var check_user = "select * from matrimony_user where id=?";
    var value = [id];
    connection.query(check_user, value, function (err, result) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (result.length > 0 || result.length > '0') {
                var get_partner_preferences = "select * from matrimony_partner_preferences where user_id=?";
                var values = [id];
                connection.query(get_partner_preferences, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var min_age = rows[0].min_age;
                            var max_age = rows[0].max_age;
                            var martial_status = rows[0].martial_status;
                            var min_height_in_cm = rows[0].min_height_in_cm;
                            var max_height_in_cm = rows[0].max_height_in_cm;
                            var skin_tone = rows[0].skin_tone;
                            var body_type = rows[0].body_type;
                            var religion = rows[0].religion;
                            var community = rows[0].caste;
                            var father_status = rows[0].father_status;
                            var family_values = rows[0].family_values;
                            var affluence_level = rows[0].affluence_level;
                            var education = rows[0].education;
                            var annual_income = rows[0].annual_income;
                            var gender = result[0].gender;
                            if (min_age == null || max_age == null) {
                                var age_string = " like'%'";
                            } else if (min_age != null || max_age == null) {
                                var age_string = ">=" + min_age + "";
                            } else if (min_age == null || max_age != null) {
                                var age_string = "<=" + max_age + "";
                            } else {
                                var age_string = "between " + min_age + " and " + max_age + "";
                            }

                            if (martial_status == null) {
                                var martial_status_string = " like'%'";
                            } else {
                                var martial_status_string = "='" + martial_status + "'";
                            }

                            if (min_height_in_cm == null || max_height_in_cm == null) {
                                var height_string = " like'%'";
                            } else if (min_height_in_cm != null || max_height_in_cm == null) {
                                var height_string = ">=" + min_height_in_cm + "";
                            } else if (min_height_in_cm == null || max_height_in_cm != null) {
                                var height_string = "<=" + max_height_in_cm + "";
                            } else {
                                var height_string = "between " + min_height_in_cm + " and " + max_height_in_cm + "";
                            }

                            if (skin_tone == null) {
                                var skin_tone_string = " like'%'";
                            } else {
                                var skin_tone_string = "='" + skin_tone + "'";
                            }

                            if (body_type == null) {
                                var body_type_string = " like'%'";
                            } else {
                                var body_type_string = "='" + body_type + "'";
                            }

                            if (religion == null) {
                                var religion_string = " like'%'";
                            } else {
                                var religion_string = "='" + religion + "'";
                            }

                            if (community == null) {
                                var community_string = " like'%'";
                            } else {
                                var community_string = "='" + community + "'";
                            }

                            if (father_status == null) {
                                var father_status_string = " like'%'";
                            } else {
                                var father_status_string = "='" + father_status + "'";
                            }

                            if (family_values == null) {
                                var family_values_string = " like'%'";
                            } else {
                                var family_values_string = "='" + family_values + "'";
                            }

                            if (affluence_level == null) {
                                var affluence_level_string = " like'%'";
                            } else {
                                var affluence_level_string = "='" + affluence_level + "'";
                            }

                            if (education == null) {
                                var education_string = " like'%'";
                            } else {
                                var education_string = "='" + education + "'";
                            }

                            if (annual_income == null) {
                                var annual_income_string = " like'%'";
                            } else {
                                var annual_income_string = "='" + annual_income + "'";
                            }

//                          var get_recommended_profile = "select * from matrimony_user where age"+age_string+" and martial_status"+martial_status_string+" and height_in_cm "+height_string+" and body_type "+body_type_string+" and skin_tone "+skin_tone_string+" and religion "+religion_string+" and community "+community_string+" and father_status "+father_status_string+" and family_values "+family_values_string+" and affluence_level "+affluence_level_string+" and education "+education_string+" and annual_income "+annual_income_string+"";

                            var get_recommended_profile = "select * from matrimony_user where (age" + age_string + " or age is null) and (martial_status" + martial_status_string + " or martial_status is null) and (height_in_cm " + height_string + " or height_in_cm is null) and (body_type " + body_type_string + " or body_type is null) and (skin_tone " + skin_tone_string + " or skin_tone is null) and (religion " + religion_string + " or religion is null) and (community " + community_string + " or community is null) and (father_status " + father_status_string + " or father_status is null) and (family_values " + family_values_string + " or family_values is null) and (affluence_level " + affluence_level_string + " or affluence_level is null) and (education " + education_string + " or education is null) and (annual_income " + annual_income_string + " or annual_income is null) and (gender !='" + gender + "' or gender is null) and block_status=0 order by membership_plan desc";
                            console.log(get_recommended_profile)
                            connection.query(get_recommended_profile, function (err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var get_view_count = "SELECT COUNT(*) as count FROM matrimony_connect_requests where receiver_id=? and status=1";
                                    var id_values = [id]
                                    connection.query(get_view_count, id_values, function (err, count) {
                                        if (err) {
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
                                                                console.log(requested_profiles.length)
                                                                if (requested_profiles.length == '0' || requested_profiles.length == 0) {
                                                                    console.log('in = 0')
                                                                    data_obj.request_status = 0
                                                                } else {
                                                                    console.log('in > 0')
                                                                    data_obj.request_status = 1
                                                                }
                                                                key++;
                                                                var data_obj = rows[key1];
                                                                if (favourite_profiles.length > '0' || favourite_profiles.length > 0) {
                                                                    data_obj.status = 1
                                                                } else {
                                                                    data_obj.status = 0
                                                                }
                                                                key1++;
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

                                                    var data = {
                                                        view_count: count[0].count,
                                                        recommended_profiles: rows
                                                    }
                                                    sendResponse.sendSuccessData(data, res);
                                                    console.log("success");
                                                }
                                            });
                                            console.log(id_array)
                                        }
                                    })
                                }
                            });
                        } else {
                            var errorMsg = 'partner preference not found';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            } else {
                var errorMsg = 'invalid id';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
});


/*
 * --------------------------------------------------------------------------
 * view_top_profiles
 * --------------------------------------------------------------------------
 */
router.post('/view_top_profiles', function (req, res, next) {
    var get_profiles = "select * from matrimony_user where membership_plan > 3 order by id desc limit 10";
    connection.query(get_profiles, function (err, rows) {
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
