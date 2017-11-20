var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var fs = require('fs-extra');
var Uploader = require('s3-image-uploader');
var multiparty = require('multiparty');
var date = require('date-and-time');
//var admin_email = 'newads@epardesh.com';
var admin_email = 'newads@epardesh.com';

var uploader = new Uploader({
    aws: {
        key: bucket_key,
        secret: bucket_secret
    },
    websockets: false
            //websocketServerPort : 3004,
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/*
 * --------------------------------------------------------------------------
 * update_images
 * INPUT : image_id
 * ---------------------------------------------------------------------------
 */
router.post('/update_images', function(req, res, next) {
    new multiparty.Form().parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        var file_path = files.profile[0].path;
        console.log(file_path)
        var file_name = files.profile[0].originalFilename;
        var file_size = files.profile[0].size;
        //var file_id = 103;
        var loginTime = new Date();
        var file_id = func.encrypt(loginTime + loginTime);
        uploader.upload({
            fileId: file_id,
            bucket: 'ftpstation',
            source: file_path,
            name: file_name
        },
        function(data) { // success
            console.log('upload success:', data);
            profile_image_path = s3_path + data.path;
            var profile_image_id = s3_path + data.id;
            var image_type = fields.image_type;
            var image_id = fields.image_id
            console.log(image_type)
            var sql = "UPDATE images SET image_path = ?,image_type = ? WHERE id=?;";
            var values = [profile_image_path, image_type, image_id]
            connection.query(sql, values, function(err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var get_image_path = "select * from images where id=?;";
                    var value = [image_id]
                    connection.query(get_image_path, value, function(err, path) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var image_path = path[0].image_path
                            var data = {
                                image_path: image_path
                            }
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                }
            });
        },
                function(errMsg) { //error
                    console.error('unable to upload: ' + errMsg);
                    sendResponse.sendSuccessData(errMsg, res);
                });
    });
});

/*
 * --------------------------------------------------------------------------
 * delete_images
 * INPUT : image_id
 * ---------------------------------------------------------------------------
 */
router.post('/delete_images', function(req, res, next) {
    var image_id = req.body.image_id;
    var sql = "DELETE FROM images WHERE id=?;"
    var values = [image_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = "deleted successfully"
            sendResponse.sendSuccessData(msg, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * epardesh_ads
 * ---------------------------------------------------------------------------
 */

router.post('/epardesh_ads', function(req, res, next) {
    var user_id = req.body.user_id;
    var ad_category = req.body.ad_category_id;
    var ad_sub_category = req.body.ad_sub_category_id;
    var ad_tittle = req.body.ad_tittle;
    var ad_description = req.body.ad_description;
    var business_name = req.body.business_name;
    var ad_price = req.body.ad_price;
    var state = req.body.state;
    var city = req.body.city;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var images = req.body.images;
    var ad_type = req.body.ad_type;
//    var approved_status = req.body.approved_status;
    var total_payable = req.body.total_payable;
    var date_posted = new Date();
    var today_date = new Date();
    var expiry_date = date.addDays(today_date, 30);
    var ad_tittle_array = [];
    var check_duplicate = "select * from epardesh_ads where ad_category=? and ad_sub_category=?;"
    var value = [ad_category, ad_sub_category]
    connection.query(check_duplicate, value, function(err, ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_ads = ads.length;
            for (var i = 0; i < no_of_ads; i++) {
                var tittle = ads[i].ad_tittle;
                ad_tittle_array.push(tittle);
            }
            if (ad_tittle_array.indexOf(ad_tittle) == -1) {
                if (ad_type == 0) {
                    var approved_status = 0
                    var sql = "insert into epardesh_ads(user_id,ad_category,ad_sub_category,ad_tittle,ad_description,business_name,ad_price,state,city,latitude,longitude,images,ad_type,approved_status,total_payable,date_posted) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    var values = [user_id, ad_category, ad_sub_category, ad_tittle, ad_description, business_name, ad_price, state, city, latitude, longitude, images, ad_type, approved_status, total_payable, date_posted]
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var msg = {}
                            var get_email = "SELECT * FROM user where id=?";
                            var values = [user_id]
                            connection.query(get_email, values, function(err, rows) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    console.log(rows)
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var user_last_name = rows[0].last_name;

                                        var get_ad_id = "SELECT * FROM epardesh_ads order by id desc limit 1";
                                        connection.query(get_ad_id, function(err, rows1) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows1.length > '0' || rows1.length > 0) {
                                                    var ad_id = rows1[0].id;
                                                    str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                                    str += '<tbody><tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                                    str += '<tbody><tr>'
                                                    //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                                    str += '<div style="padding:5px">'
                                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                                    str += '</div>'
                                                    str += '</div>'

                                                    str += '</tr>'
                                                    str += '</tbody></table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="10"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                                    str += '<tbody><tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Activate Your AD" style="margin:0;display:block" class="CToWUd"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Activate Your AD</td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="10"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="35"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                                    str += '<tbody><tr>'
                                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="10"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a confirmation of the AD posted by you. </td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center">'
                                                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                    str += '<tbody><tr>'
                                                    str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                    str += '<a href=' + classified_url + "ad_approve/" + ad_id + '/1 style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="">Activate</a>'
                                                    str += '</td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table>'
                                                    str += '</td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="30"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td style="padding:0px 20px">'
                                                    str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" style="padding:0 20px" bgcolor="#f9f9f9">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td height="15"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td style="font-weight:bold;color:#999999;font-size:24px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;text-align:left">BENEFITS</td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="15"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table>'
                                                    str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#f2f2f2" style="padding:0px 20px">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td height="25"></td>'
                                                    str += '<td></td>'
                                                    str += '<td></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td width="10%"><table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td width="41" align="center" style="padding-top:5px"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td width="41" height="59"><table width="2" cellpadding="0" cellspacing="0" border="0" align="center">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td width="2" height="59" style="background-color:#999999"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table></td>'
                                                    str += '<td width="3%"></td>'
                                                    str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY ACTIVATE?</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Activating your AD lets others see all your Ads.</p></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td width="10%" valign="top">'
                                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                    str += '<tbody>'
                                                    str += '<tr>'
                                                    str += '<td width="41" align="center" valign="top"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table></td>'
                                                    str += '<td width="3%"></td>'
                                                    str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">BUTTON NOT WORKING?</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then Activate your AD by pasting the below link into your browser:</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + classified_url + "ad_approve/" + ad_id + '/1 style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + classified_url + "ad_approve/" + ad_id + '/2>' + classified_url + "ad_approve/" + ad_id + '/1</a></p>'
                                                    str += '</td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="25"></td>'
                                                    str += '<td></td>'
                                                    str += '<td></td>'
                                                    str += '</tr>'
                                                    str += '</tbody>'
                                                    str += '</table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="40"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="10"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                                    str += '<tbody><tr>'
//str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="8"></td>'
//str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="8"></td>'
//str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                                    str += '<tbody><tr>'
//str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
                                                    str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="9"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                                                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table>'
                                                    str += '</div>'

                                                    var str1 = "<h2>Hi Admin,</h2>";
                                                    str1 += "<p>A new AD has been posted with following details: </p>";
                                                    str1 += "<p> user_id : " + user_id + "</p>"
                                                    str1 += "<p> user_name : " + user_first_name + " " + user_last_name + "</p>"
                                                    str1 += "<p> AD_Title : " + ad_tittle + "</p>"
                                                    str1 += "<p> plan : " + ad_type + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                                    //send_email(str, email, 'EPardesh : Ad posted successfully');
						var emailSubject = "EPardesh : Please activate your Ad -  EPCA"+ ad_id +'';
						send_email(str, email,emailSubject);
                                                    send_email(str1, admin_email, 'EPardesh : New ad EPCA'+ ad_id +' posted');


                                                    sendResponse.sendSuccessData(msg, res);
                                                }
                                            }
                                        })
                                    } else {
                                        var errorMsg = 'invalid id';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    }
                                }
                            })
                        }
                    });
                } else {
                    var approved_status = 1
                    var sql = "insert into epardesh_ads(user_id,ad_category,ad_sub_category,ad_tittle,ad_description,business_name,ad_price,state,city,latitude,longitude,images,ad_type,approved_status,total_payable,expiry_date,date_posted,date_approved) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    var values = [user_id, ad_category, ad_sub_category, ad_tittle, ad_description, business_name, ad_price, state, city, latitude, longitude, images, ad_type, approved_status, total_payable, expiry_date, date_posted, date_posted]
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var msg = {}

                            var get_email = "SELECT * FROM user where id=?";
                            var values = [user_id]
                            connection.query(get_email, values, function(err, rows) {
                                if (err)
                                {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var user_last_name = rows[0].last_name;
                                        var get_ad_id = "SELECT * FROM epardesh_ads order by id desc limit 1";
                                        connection.query(get_ad_id, function(err, rows1) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows.length > '0' || rows.length > 0) {
                                                    var ad_id = rows1[0].id;
//                                                var str = "<h2>Welcome To EPardesh,</h2>";
//                                                str += "<p> Please click on the below link to verify and approve your ad.</p>"
//                                                str += "<a href="+classified_url+"ad_approve/" + ad_id + ">Click Here</a>";
//                                                str += "<p>Regards,</p>";
//                                                str += "<p>Team EPardesh</p>";

//                                                    str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
//                                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
//                                                    str += '<tbody><tr>'
//                                                    //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
//                                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
//
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="AD Posted Successfully" style="margin:0;display:block" class="CToWUd"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">AD Posted Successfully</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
//                                                    str += '<tbody>'
//                                                    str += '<tr>'
//                                                    str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody>'
//                                                    str += '</table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="35"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your AD has been successfully posted on our website. Share with everyone and accelerate your sale! </td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center">'
//                                                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
//                                                    str += '<a href=' + classified_url + ' style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="' + classified_url + '">Visit EPardesh</a>'
//                                                    str += '</td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table>'
//                                                    str += '</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="30"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="40"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
//                                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                                                    str += '<tbody><tr>'
////str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="8"></td>'
////str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="8"></td>'
////str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                                                    str += '<tbody><tr>'
////str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="9"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
//                                                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table>'
//                                                    str += '</div>'



var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                    str += '<tbody><tr>'
                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                    str += '<div style="padding:5px">'
                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                    str += '</div>'
                                    str += '</div>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td align="center" style="color: #10c710;font-size:25px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">!!! Congratulation !!!</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                    str += '<tbody><tr>'
                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your AD has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your ad EPCA' + ad_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your ad by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/ad-details/'+ad_id+'">EPCA' + ad_id + '</a>'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Thanks,<br>'
                                    str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.ePardesh.com</a></strong></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table>'
                                    str += '</div>'




                                                    var str1 = "<h2>Hi Admin,</h2>";
                                                    str1 += "<p>A new AD has been posted with following details: </p>";
                                                    str1 += "<p> user_id : " + user_id + "</p>"
                                                    str1 += "<p> user_name : " + user_first_name + " " + user_last_name + "</p>"
                                                    str1 += "<p> AD_Title : " + ad_tittle + "</p>"
                                                    str1 += "<p> plan : " + ad_type + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                    send_email(str, email, 'ePardesh: Your Ad EPCA' + ad_id + ' has been activated successfully');

                                                    //send_email(str, email, 'EPardesh : Ad posted successfully');
                                                    send_email(str1, admin_email, 'EPardesh : New ad posted');

                                                    sendResponse.sendSuccessData(msg, res);
                                                }
                                            }
                                        })
                                    } else {
                                        var errorMsg = 'invalid id';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    }
                                }
                            })
                        }
                    });
                }
            } else {
                var errorMsg = 'Ad already exists';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * delete_epardesh_ads_images
 * ---------------------------------------------------------------------------
 */
router.post('/delete_epardesh_ads_images', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var images = req.body.images;
    var update_image_string = "update epardesh_ads set images=? where id=?;"
    var values = [images, ad_id]
    connection.query(update_image_string, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
});



/*
 * --------------------------------------------------------------------------
 * edit_epardesh_ads
 * ---------------------------------------------------------------------------
 */
router.post('/edit_epardesh_ads', function(req, res, next) {
    var ad_id = req.body.ad_id
    var ad_tittle = req.body.ad_tittle;
    var ad_description = req.body.ad_description;
    var images = req.body.images;
    var business_name = req.body.business_name;
    var ad_price = req.body.ad_price;
    var user_email = req.body.user_email;
    var user_first_name = req.body.user_first_name;
    var user_last_name = req.body.user_last_name;
    var today_date = new Date()

    var sql = "update epardesh_ads set ad_tittle=?, ad_description=?, images=?,ad_price=?, business_name=?, updated_on=? where id=?;"
    var values = [ad_tittle, ad_description, images, ad_price, business_name, today_date, ad_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var str1 = "<h2>Hi Admin,</h2>";
            str1 += "<p>" + user_first_name + " " + user_last_name + " has edited An AD with Ad-ID " + ad_id + ". </p>";
            str1 += "<p>Regards,</p>";
            str1 += "<p>Team EPardesh</p>";
//            var mailOptions = {to: "deepakssit022@gmail.com", subject: 'EPardesh: An Ad has been edited', html: str};
//            transporter.sendMail(mailOptions, function (error, info) {
//                if (error) {
//                    console.log("Error Found:");
//                    console.log(error);
//                } else {
            console.log('message_sent1')
            var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
            str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
            str += '<tbody><tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
            str += '<tbody><tr>'
            //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
            str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

            str += '<div style="text-align:Right;margin-bottom:10px">'
            str += '<div style="padding:5px">'
            str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
            str += '</div>'
            str += '</div>'
            str += '</tr>'
            str += '</tbody></table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="10"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
            str += '<tbody><tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '</tr>'
//            str += '<tr>'
//            str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Ad Updated Successfully</td>'
//            str += '</tr>'
            str += '<tr>'
            str += '<td height="10"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
            str += '<tbody>'
            str += '<tr>'
            str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
            str += '</tr>'
            str += '</tbody>'
            str += '</table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="35"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
            str += '<tbody><tr>'
            str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="10"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your Ad has been successfully updated. View your updated Ad using following link.</td>'
            str += '</tr>'

            str += '<tr>'
            //str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">' + ad_id + ' : <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>' + classified_url + 'setting</a></td>'
            
            
             str += '<td style="text-align:center;font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><a style="font-size: 22px;margin:20px;font-weight:bold;" href="'+classified_url + 'setting">EPCA'+ ad_id + '</a></td>';
            
            str += '</tr>'

            str += '<tr>'
            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You can also view your ad in your <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>"My Account"</a></td>'
            str += '</tr>'

            str += '<tr>'
            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Thanks for posting ad with <a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>ePardesh</a></td>'
            str += '</tr>'

            str += '<tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td align="center">'
            str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
            str += '<tbody><tr>'
            str += '</tr>'
            str += '</tbody></table>'
            str += '</td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="30"></td>'
            str += '</tr>'
            str += '</tbody></table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="40"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Sincerely,<br>'
            str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
            str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.ePardesh.com</a></strong></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '</tbody></table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="10"></td>'
            str += '</tr>'
            str += '<tr>'
//            str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
            str += '<tbody><tr>'
            str += '<td width="8"></td>'
            str += '<td width="8"></td>'
            str += '</tr>'
            str += '</tbody></table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="20"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
            str += '<tbody><tr>'
            str += '<td width="6"></td>'
            str += '<td width="6"></td>'
            str += '<td width="6"></td>'
            str += '<td width="6"></td>'
            str += '</tr>'
            str += '</tbody></table></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td height="9"></td>'
            str += '</tr>'
            str += '<tr>'
            str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">To view/edit your account information anytime, login to <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>"My Account"</a>@<a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a>.</p>'
//            str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
//            str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
            str += '</tr>'
//            str += '<tr>'
//            str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//            str += '</tr>'
            str += '</tbody></table>'
            str += '</div>'

            send_email(str, user_email, 'ePardesh :Your Ad ' + ad_id + ' has been updated successfully');
            send_email(str1, admin_email, 'EPardesh : Ad updated successfully');


            var msg = {}
            sendResponse.sendSuccessData(msg, res);

        }
    });
});

/*
 * --------------------------------------------------------------------------
 * cancel_epardesh_ads
 * ---------------------------------------------------------------------------
 */
router.post('/cancel_epardesh_ads', function(req, res, next) {
    var ad_id = req.body.ad_id
    var date_posted = req.body.date_posted;
    var today = new Date();
    var formatted_date = date.format(today, 'YYYY-MM-DD');
    var sql = "update epardesh_ads set approved_status='4' where id=?;"
    var values = [ad_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var get_email = "select user.email, user.first_name, user.last_name from user join epardesh_ads on user.id=epardesh_ads.user_id where epardesh_ads.id=?;"
            var value = [ad_id]
            connection.query(get_email, value, function(err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var email = rows[0].email;
                    var user_first_name = rows[0].first_name;
                    var user_last_name = rows[0].last_name;

                    var date1 = new Date(date_posted);
                    var date2 = new Date(formatted_date);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (diffDays <= 1) {
//                        var str = "<h2>Welcome To EPardesh,</h2>";
//                        str += "<p>Your AD have been successfully removed. </p>";
//                        str += "<p>You will get your amount refunded. </p>";
//                        str += "<p> Please click on the below link to enjoy our services.</p>"
//                        str += "<a href=" + classified_url + "home/>Click Here</a>";
//                        str += "<p>Regards,</p>";
//                        str += "<p>Team EPardesh</p>";


                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                        str += '<tbody><tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                        str += '<tbody><tr>'
                        //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                        str += '<tbody><tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">AD Removed Successfully</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                        str += '<tbody>'
                        str += '<tr>'
                        str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                        str += '</tr>'
                        str += '</tbody>'
                        str += '</table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="35"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                        str += '<tbody><tr>'
                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your AD have been successfully removed. You will get your amount refunded. Please click on the below link to enjoy our services. </td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += "<a href=" + classified_url + "home/>Click Here</a>";
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center">'
                        str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                        str += '<tbody><tr>'
                        str += '</tr>'
                        str += '</tbody></table>'
                        str += '</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="30"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="40"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                        str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
//                        str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                        str += '<tbody><tr>'
                        str += '<td width="8"></td>'
                        str += '<td width="8"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                        str += '<tbody><tr>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="9"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                        str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                        str += '</tr>'
                        str += '</tbody></table>'
                        str += '</div>'




                    } else {
//                        var str = "<h2>Welcome To EPardesh,</h2>";
//                        str += "<p>Your AD have been successfully removed. </p>";
//                        str += "<p> Please click on the below link to enjoy our services.</p>"
//                        str += "<a href=" + classified_url + "home/>Click Here</a>";
//                        str += "<p>Regards,</p>";
//                        str += "<p>Team EPardesh</p>";

                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                        str += '<tbody><tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                        str += '<tbody><tr>'
                        //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'


                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                        str += '<tbody><tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">AD Removed Successfully</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                        str += '<tbody>'
                        str += '<tr>'
                        str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                        str += '</tr>'
                        str += '</tbody>'
                        str += '</table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="35"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                        str += '<tbody><tr>'
                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your AD have been successfully removed. Please click on the below link to enjoy our services. </td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += "<a href=" + classified_url + "home/>Click Here</a>";
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center">'
                        str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                        str += '<tbody><tr>'
                        str += '</tr>'
                        str += '</tbody></table>'
                        str += '</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="30"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="40"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                        str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
//                        str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                        str += '<tbody><tr>'
                        str += '<td width="8"></td>'
                        str += '<td width="8"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="20"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                        str += '<tbody><tr>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '<td width="6"></td>'
                        str += '</tr>'
                        str += '</tbody></table></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="9"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                        str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                        str += '</tr>'
                        str += '</tbody></table>'
                        str += '</div>'


                    }
                    var mailOptions = {to: email, subject: 'ePardesh: Ad removed Successfully', html: str};
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log("Error Found:");
                            console.log(error);
                        } else {
                            console.log('Message sent: ');
                        }
                    });
                    var msg = {}
                    sendResponse.sendSuccessData(msg, res);
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * upgrade_to_featured
 * ---------------------------------------------------------------------------
 */
router.post('/upgrade_to_featured', function(req, res, next) {
    var ad_id = req.body.ad_id
    var sql = "update epardesh_ads set ad_type='2' where id=?;"
    var values = [ad_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var get_email = "select user.email,user.first_name,user.last_name from user join epardesh_ads on user.id=epardesh_ads.user_id where epardesh_ads.id=?;"
            var value = [ad_id]
            connection.query(get_email, value, function(err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var email = rows[0].email;
                    var user_first_name = rows[0].first_name;
                    var user_last_name = rows[0].last_name;
                    console.log(email)
//                    var str = "<h2>Welcome To EPardesh,</h2>";
//                    str += "<p>Congratulations! Your AD have been successfully upgraded to featured. </p>";
//                    str += "<p> Please click on the below link to enjoy our services.</p>"
//                    str += "<a href=" + classified_url + "home/>Click Here</a>";
//                    str += "<p>Regards,</p>";
//                    str += "<p>Team EPardesh</p>";

                    var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                    str += '<tbody><tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                    str += '<tbody><tr>'
                    //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                    str += '<tbody><tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">AD Upgraded Successfully</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                    str += '<tbody>'
                    str += '<tr>'
                    str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                    str += '</tr>'
                    str += '</tbody>'
                    str += '</table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="35"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                    str += '<tbody><tr>'
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Congratulations! Your AD have been successfully upgraded to featured. Please click on the below link to enjoy our services. </td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += "<a href=" + classified_url + "home/>Click Here</a>";
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center">'
                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                    str += '<tbody><tr>'
                    str += '</tr>'
                    str += '</tbody></table>'
                    str += '</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="30"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="40"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
//                    str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                    str += '<tbody><tr>'
                    str += '<td width="8"></td>'
                    str += '<td width="8"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                    str += '<tbody><tr>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="9"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                    str += '</tr>'
                    str += '</tbody></table>'
                    str += '</div>'

                    var mailOptions = {to: email, subject: 'ePardesh: Ad successfully upgraded to featured', html: str};
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log("Error Found:");
                            console.log(error);
                        } else {
                            console.log('Message sent: ');
                        }
                    });
                    var msg = {}
                    sendResponse.sendSuccessData(msg, res);
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * upgrade_to_premium
 * ---------------------------------------------------------------------------
 */
router.post('/upgrade_to_premium', function(req, res, next) {
    var ad_id = req.body.ad_id
    var sql = "update epardesh_ads set ad_type='1' where id=?;"
    var values = [ad_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var get_email = "select user.email, user.first_name, user.last_name from user join epardesh_ads on user.id=epardesh_ads.user_id where epardesh_ads.id=?;"
            var value = [ad_id]
            connection.query(get_email, value, function(err, rows) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var email = rows[0].email;
                    var user_first_name = rows[0].first_name;
                    var user_last_name = rows[0].last_name;
//                    var str = "<h2>Welcome To EPardesh,</h2>";
//                    str += "<p>Congratulations! Your AD have been successfully upgraded to premium. </p>";
//                    str += "<p> Please click on the below link to enjoy our services.</p>"
//                    str += "<a href=" + classified_url + "home/>Click Here</a>";
//                    str += "<p>Regards,</p>";
//                    str += "<p>Team EPardesh</p>";

                    var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                    str += '<tbody><tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                    str += '<tbody><tr>'
                    //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                    str += '<tbody><tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">AD Successfully Upgraded</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                    str += '<tbody>'
                    str += '<tr>'
                    str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                    str += '</tr>'
                    str += '</tbody>'
                    str += '</table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="35"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                    str += '<tbody><tr>'
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ,</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Congratulations! Your AD have been successfully upgraded to premium. Please click on the below link to enjoy our services. </td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += "<a href=" + classified_url + "home/>Click Here</a>";
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center">'
                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                    str += '<tbody><tr>'
                    str += '</tr>'
                    str += '</tbody></table>'
                    str += '</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="30"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="40"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
//                    str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                    str += '<tbody><tr>'
                    str += '<td width="8"></td>'
                    str += '<td width="8"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                    str += '<tbody><tr>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '<td width="6"></td>'
                    str += '</tr>'
                    str += '</tbody></table></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="9"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                    str += '</tr>'
                    str += '</tbody></table>'
                    str += '</div>'

                    var mailOptions = {to: email, subject: 'ePardesh: Ad successfully upgraded to featured', html: str};
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log("Error Found:");
                            console.log(error);
                            //throw err;
                            //return console.log(error);
                        } else {
                            console.log('Message sent: ');
                        }
                    });
                    var msg = {}
                    sendResponse.sendSuccessData(msg, res);
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_user_ads
 * ---------------------------------------------------------------------------
 */

router.post('/view_user_ads', function(req, res, next) {
    var user_id = req.body.user_id;
    var views = 0;
    var ad_images = [];
    var all_images = [];
    var final_data = [];
    var image_array = [];
    var ads_with_images = [];
    var category_array = [];
    var sub_category_array = [];
    var category_name = [];
    var sub_category_name = [];
    var data = [];
    var sql = "select * from epardesh_ads where user_id=? order by id desc;"
    var values = [user_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var length = rows.length;
            for (var i = 0; i < length; i++) {
                var data_obj = rows[i];
                var expiry_date = rows[i].expiry_date;
                if (expiry_date == null || expiry_date == '0000-00-00') {
                    data_obj.renew_status = 0;
                } else {
                    var formatted_expiry_date = date.format(expiry_date, 'YYYY-MM-DD');
                    var today = new Date();
                    var formatted_date = date.format(today, 'YYYY-MM-DD');
                    if (formatted_expiry_date < formatted_date) {
                        var date1 = new Date(formatted_expiry_date);
                        var date2 = new Date(formatted_date);
                        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (diffDays < 7 || diffDays < '7')
                        {
                            data_obj.renew_status = 1;
                        } else {
                            data_obj.renew_status = 0;
                        }
                    } else {
                        data_obj.renew_status = 0;
                    }
                }
                var images = rows[i].images;
                var category_id = rows[i].ad_category;
                var sub_category_id = rows[i].ad_sub_category;
                category_array.push(category_id);
                sub_category_array.push(sub_category_id);
                views += rows[i].views;
                image_array = images.split(",");
                ad_images.push(image_array)
            }
            async.each(ad_images, function(image_array, callback) {
                async.each(image_array, function(image_id, callback) {
                    var sql1 = 'select * from images where id=?';
                    var values1 = [image_id]
                    connection.query(sql1, values1, function(err, rows1) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            all_images.push(rows1)
                        }
                        callback();
                    })
                }, function(err) {
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
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
//                    console.log('A file failed to process');
                } else {
                    async.each(category_array, function(category_id, callback) {
                        var get_category = 'select name from epardesh_categories where id=?';
                        var values2 = [category_id]
                        connection.query(get_category, values2, function(err, rows2) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                if (rows2.length > 0) {
                                    category_name.push(rows2[0].name)
                                }
                            }
                            callback();
                        })
                    }, function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            async.each(sub_category_array, function(sub_category_id, callback) {
                                var get_sub_category = 'select name from epardesh_categories where id=?';
                                var values3 = [sub_category_id]
                                connection.query(get_sub_category, values3, function(err, rows3) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        if (rows3.length > 0) {
                                            sub_category_name.push(rows3[0].name)
                                        }
                                    }
                                    callback();
                                })
                            }, function(err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    // One of the iterations produced an error.
                                    // All processing will now stop.
                                    console.log('A file failed to process');
                                } else {
                                    for (var k = 0; k < length; k++) {
                                        data = {
                                            ad_info: rows[k],
                                            image_info: final_data[k],
                                            category: category_name[k],
                                            sub_category: sub_category_name[k]
                                        }
                                        ads_with_images.push(data)
                                        data = []
                                    }
                                    var all_ads = {
                                        ads: ads_with_images,
                                        views: views
                                    }
                                    sendResponse.sendSuccessData(all_ads, res);
                                    console.log("success2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});




//router.post('/view_stats', function(req, res, next) {
//    var user_id = req.body.user_id;
//    var total_views = 0;
//    var total_ads = 0;
//    var sql = "select * from epardesh_ads where user_id=?;"
//    var values = [user_id]
//    connection.query(sql, values, function(err, epardesh_ad) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            //var count = 0;
//            total_ads = total_ads + epardesh_ad.length;
//            for (var i = 0; i < epardesh_ad.length; i++) {
////                if (parseInt(count) <= i) {
//
////                    console.log("i" + i);
//                total_views = total_views + epardesh_ad[i].views
//                //count = parseInt(count) + 1;
//
//                if (i == epardesh_ad.length - 1) {
//                    console.log("in events");
//
//
//                    var sql1 = "select * from epardesh_events where user_id=?;"
//                    var values = [user_id]
//                    connection.query(sql1, values, function(err, epardesh_events) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            total_ads = total_ads + epardesh_events.length;
//                            for (var j = 0; j < epardesh_events.length; j++) {
//                                total_views = total_views + epardesh_events[j].views
//
//                                if (j == epardesh_events.length - 1) {
//                                    console.log("in training");
//                                    var sql2 = "select * from epardesh_training where user_id=?;"
//                                    var values = [user_id]
//                                    connection.query(sql2, values, function(err, epardesh_training) {
//                                        if (err) {
//                                            console.log(err)
//                                            var errorMsg = 'some error occurred';
//                                            sendResponse.sendErrorMessage(errorMsg, res);
//                                        } else {
//
//                                            //var count2 = 0;
//                                            total_ads = total_ads + epardesh_training.length;
//                                            for (var k = 0; k < epardesh_training.length; k++) {
//                                                total_views = total_views + epardesh_training[k].views
//                                                if (k == epardesh_training.length - 1) {
//                                                    console.log("in end");
//                                                    var all_ads = {
//                                                        total_views: total_views,
//                                                        total_ads: total_ads
//                                                    }
//                                                    sendResponse.sendSuccessData(all_ads, res);
//
//                                                }
//
//                                            }
//                                        }
//                                    });
//
//
//
//                                }
//
//
//
//                            }
//
//                        }
//                    })
//
//
//
//
//                }
//
//                //}
//                //else {
//                //console.log("in lese");
////                    var sql1 = "select * from epardesh_events where user_id=?;"
////                    var values = [user_id]
////                    connection.query(sql1, values, function(err, epardesh_events) {
////                        if (err) {
////                            console.log(err)
////                            var errorMsg = 'some error occurred';
////                            sendResponse.sendErrorMessage(errorMsg, res);
////                        } else {
////                            var count1 = 0;
////                            total_ads = total_ads + epardesh_events.length;
////                            for (var j = 0; j < epardesh_events.length; j++) {
////
////                                if (parseInt(count1) <= j) {
////                                    console.log("count1" + count1);
////                                    console.log("j" + j);
////                                    total_views = total_views + epardesh_ad[j].views
////                                    count1 = parseInt(count1) + 1;
////                                }
////                                else {
////                                    var sql2 = "select * from epardesh_training where user_id=?;"
////                                    var values = [user_id]
////                                    connection.query(sql2, values, function(err, epardesh_training) {
////                                        if (err) {
////                                            console.log(err)
////                                            var errorMsg = 'some error occurred';
////                                            sendResponse.sendErrorMessage(errorMsg, res);
////                                        } else {
////
////                                            var count2 = 0;
////                                            total_ads = total_ads + epardesh_training.length;
////                                            for (var k = 0; k < epardesh_training.length; k++) {
////                                                if (parseInt(count2) <= k) {
////                                                    console.log("count2" + count2);
////                                                    console.log("k" + k);
////                                                    total_views = total_views + epardesh_ad[k].views
////                                                    count2 = parseInt(count2) + 1;
////                                                }
////                                                else {
////
////                                                    var all_ads = {
////                                                        total_views: total_views,
////                                                        total_ads: total_ads
////                                                    }
////                                                    sendResponse.sendSuccessData(all_ads, res);
////
////                                                }
////                                            }
////
////
////                                        }
////                                    });
////
////
////
////
////                                }
////
////
////
////                            }
////
////
////
////
////
////
////                        }
////                    });
//
//                // }
//            }
//
//
//
//
//
//
//        }
//    });
//});



router.post('/view_stats', function(req, res, next) {
    var user_id = req.body.user_id;
    var manValues = [user_id];
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function(err, updatePopup, critical) {

        var data = [];
        var dataText = [];
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var epardesh_ads_count = 0;
        var epardesh_ads_views = 0;

        var epardesh_events_count = 0;
        var epardesh_events_views = 0;

        var epardesh_training_count = 0;
        var epardesh_training_views = 0;

        console.log("in search");


        function getAds(user_id) {
            console.log("in ad finction");
            var sql = "select * from epardesh_ads where user_id=?;"
            var values = [user_id]
            connection.query(sql, values, function(err, epardesh_ad) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    //var count = 0;
                    epardesh_ads_count = epardesh_ad.length;
                    if (epardesh_ad.length > 0) {
                        console.log("in if of ad " +   epardesh_ad.length);
                        for (var i = 0; i < epardesh_ad.length; i++) {
                            if (parseInt(count1) == (parseInt(epardesh_ad.length))- 1) {
                                epardesh_ads_views = parseInt(epardesh_ads_views) + epardesh_ad[i].views
                                data.push(epardesh_ads_views);
                                dataText.push("epardesh_ad_views");
                                var func_res = sendResponseForGetPeople(data, dataText);
                                return func_res;
                            }
                            else {
                                console.log("epardesh_ads_views  "+ epardesh_ads_views)
                                epardesh_ads_views = parseInt(epardesh_ads_views) + epardesh_ad[i].views
                                count1 = parseInt(count1) + 1
                            }

                        }
                    }
                    else {
                        epardesh_ads_count = 0;
                        epardesh_ads_views = 0;
                        data.push(epardesh_ads_views);
                        dataText.push("epardesh_ad_views");
                        var func_res = sendResponseForGetPeople(data, dataText);
                        return func_res;
                    }

                }
            });
        }


        function getEvents(user_id) {
            console.log("in event finction");
            var sql1 = "select * from epardesh_events where user_id=?;"
            var values = [user_id]
            connection.query(sql1, values, function(err, epardesh_events) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    
                    //var count = 0;
                    epardesh_events_count = epardesh_events.length;
                    if (epardesh_events.length > 0) {
                        console.log("in event if ");
                        for (var j = 0; j < epardesh_events.length; j++) {
                            if (parseInt(count2) == (parseInt(epardesh_events.length)) -1) {
                            epardesh_events_views = parseInt(epardesh_events_views) + epardesh_events[j].views

                                data.push(epardesh_events_views);
                                dataText.push("epardesh_events_views");
                                var func_res = sendResponseForGetPeople(data, dataText);
                                return func_res;
                            }
                            else {
                                console.log("epardesh_events_views  "+ epardesh_events_views);
                                epardesh_events_views = parseInt(epardesh_events_views) + epardesh_events[j].views
                                count2 = parseInt(count2) + 1
                            }

                        }
                    }
                    else {
                        epardesh_events_count = 0;
                        epardesh_events_views = 0;
                        data.push(epardesh_events_views);
                        dataText.push("epardesh_events_views");
                        var func_res = sendResponseForGetPeople(data, dataText);
                        return func_res;
                    }

                }
            });
        }

        function getTraining(user_id) {
            console.log("in traing finction");
            var sql2 = "select * from epardesh_training where user_id=?;"
            var values = [user_id]
            connection.query(sql2, values, function(err, epardesh_training) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    console.log("in if of training");
                    epardesh_training_count = epardesh_training.length;
                    if (epardesh_training.length > 0) {
                        for (var k = 0; k < epardesh_training.length; k++) {
                            if (parseInt(count3) == (parseInt(epardesh_training.length)) - 1) {
                            epardesh_training_views = parseInt(epardesh_training_views) + epardesh_training[k].views
                                data.push(epardesh_training_views);
                                dataText.push("epardesh_training_views");
                                var func_res = sendResponseForGetPeople(data, dataText);
                                return func_res;
                            }
                            else {
                                console.log("epardesh_training_views   "+ epardesh_training_views)
                                epardesh_training_views = parseInt(epardesh_training_views) + epardesh_training[k].views
                                count3 = parseInt(count3) + 1
                            }

                        }
                    }
                    else {
                        epardesh_training_count = 0;
                        epardesh_training_views = 0;
                        data.push(epardesh_training_views);
                        dataText.push("epardesh_training_views");
                        var func_res = sendResponseForGetPeople(data, dataText);
                        return func_res;
                    }

                }
            });
        }


        function sendResponseForGetPeople(req_data, req_data_text) {
            if (req_data.length == 3 || req_data.length == "3") {
                var total_ad_count = parseInt(epardesh_training_count) + parseInt(epardesh_events_count) + parseInt(epardesh_ads_count)
                var total_views_count = parseInt(epardesh_training_views) + parseInt(epardesh_events_views) + parseInt(epardesh_ads_views)
                var data = {
                    "total_ad_count": total_ad_count,
                    "total_views_count": total_views_count,
                }
                sendResponse.sendSuccessData(data, res);
            }
            else {
                return 1;
            }
        }
        getAds(user_id); // direct on 0
        getEvents(user_id); // direct on 0
        getTraining(user_id); // direct on 0

    }
    )

});


/*
 * --------------------------------------------------------------------------
 * update_view_count
 * ---------------------------------------------------------------------------
 */
router.post('/update_view_count', function(req, res, next) {
    var ad_id = req.body.ad_id
    var check_ad = "select * from epardesh_ads where id=?"
    var values = [ad_id]
    connection.query(check_ad, values, function(err, ad) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (ad.length > '0' || ad.length > 0) {
                var update_count = "update epardesh_ads set views=views+1 where id=?;"
                var values = [ad_id]
                connection.query(update_count, values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                });
            } else {
                var errorMsg = 'invalid ad id';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    });

});

/*
 * --------------------------------------------------------------------------
 * check_ad_tittle
 * ---------------------------------------------------------------------------
 */
router.post('/check_ad_tittle', function(req, res, next) {
    var ad_tittle = req.body.ad_tittle;
    var ad_category_id = req.body.ad_category_id;
    var ad_sub_category_id = req.body.ad_sub_category_id;
    var user_id = req.body.user_id;
    console.log(ad_tittle)
    console.log(ad_category_id)
    console.log(ad_sub_category_id)
    var check_ad = "select * from epardesh_ads where user_id=? and ad_category=? and ad_sub_category=? and ad_tittle=?"
    var values = [user_id, ad_category_id, ad_sub_category_id, ad_tittle]
    connection.query(check_ad, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var data = {
                    status: '0'
                }
                sendResponse.sendSuccessData(data, res);
            } else {
                var data = {
                    status: '1'
                }
                sendResponse.sendSuccessData(data, res);
            }
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * approve_ad_by_user
 * ---------------------------------------------------------------------------
 */
router.post('/approve_ad_by_user', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var status = req.body.status;
    var date_approved = new Date();
    var expiry_date = date.addDays(date_approved, 30);
    var manValues = [ad_id, expiry_date]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                if (status == 1) {
                    var sql = "select epardesh_ads.ad_type,user.email,user.first_name,user.last_name from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?";
                    var values = [ad_id];
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (rows.length > 0) {
                                if (rows[0].ad_type == '0') {
                                    var email = rows[0].email;
                                    var user_first_name = rows[0].first_name;

                                    var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                    str += '<tbody><tr>'
                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                    str += '<div style="padding:5px">'
                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                    str += '</div>'
                                    str += '</div>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td align="center" style="color: #10c710;font-size:25px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">!!! Congratulation !!!</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                    str += '<tbody><tr>'
                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your AD has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your ad EPCA' + ad_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your ad by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/ad-details/'+ad_id+'">EPCA' + ad_id + '</a>'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Thanks,<br>'
                                    str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.ePardesh.com</a></strong></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table>'
                                    str += '</div>'

                                    send_email(str, email, 'ePardesh: Your Ad EPCA' + ad_id + ' has been activated successfully');

                                    var sql1 = "UPDATE epardesh_ads SET approved_status='1', date_approved=?,expiry_date=? WHERE id=?;"
                                    var values1 = [date_approved, expiry_date, ad_id];
                                    connection.query(sql1, values1, function(err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                          


//                                            var mailOptions = {to: email, subject: 'ePardesh: Your Ad ' + ad_id + ' has been activated successfully', html: str};
//                                            transporter.sendMail(mailOptions, function (error, info) {
//                                                if (error) {
//                                                    var errorMsg = 'some error occurred';
//                                                    sendResponse.sendErrorMessage(errorMsg, res);
//                                                } else {
//                                                    console.log(info)
                                            var data = {}
                                            sendResponse.sendSuccessData(data, res);
//                                                }
//                                            });

                                        }
                                    })
                                }

                            } else {
                                var errorMsg = 'Ad does not exist';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        }
                    })
                } else if (status == 2) {

                    var event_id = ad_id;
                    var sql = "select user.email,user.first_name,user.last_name from epardesh_events join user on epardesh_events.user_id=user.id where epardesh_events.id=?";
                    var values = [event_id];
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (rows.length > 0) {
                                var email = rows[0].email;
                                var user_first_name = rows[0].first_name;
                                var appprove_event = "update epardesh_events set approved_status=1, date_approved=?,expiry_date=? where id=?"
                                var event_values = [date_approved, expiry_date, event_id]
                                connection.query(appprove_event, event_values, function(err, rows) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {

                                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                    str += '<tbody><tr>'
                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                    str += '<div style="padding:5px">'
                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                    str += '</div>'
                                    str += '</div>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td align="center" style="color: #10c710;font-size:25px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">!!! Congratulation !!!</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                    str += '<tbody><tr>'
                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your Event has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your event EPCE' + event_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your event by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/event-details/'+event_id+'">EPCE' + event_id + '</a>'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Thanks,<br>'
                                    str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.ePardesh.com</a></strong></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table>'
                                    str += '</div>'
                                    
                                        var mailOptions = {to: email, subject: 'ePardesh: Your Event EPCE' + event_id + ' has been activated successfully', html: str};
                                        transporter.sendMail(mailOptions, function(error, info) {
                                            if (error) {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                console.log('Message sent: ');
                                            }
                                        });
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                })
                            } else {
                                var errorMsg = 'invalid event id';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        }
                    })
                } else if (status == 3) {
                    var training_id = ad_id;
                    var sql = "select user.email,user.first_name,user.last_name from epardesh_training join user on epardesh_training.user_id=user.id where epardesh_training.id=?";
                    var values = [training_id];
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (rows.length > 0) {
                                var email = rows[0].email;
                                var user_first_name = rows[0].first_name;
                                var user_last_name = rows[0].last_name;
                                var appprove_training = "update epardesh_training set approved_status=1, date_approved=?,expiry_date=? where id=?"
                                var training_values = [date_approved, expiry_date, training_id]
                                connection.query(appprove_training, training_values, function(err, rows) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        
                                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                    str += '<tbody><tr>'
                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                    str += '<div style="padding:5px">'
                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                    str += '</div>'
                                    str += '</div>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td align="center" style="color: #10c710;font-size:25px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">!!! Congratulation !!!</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                    str += '<tbody><tr>'
                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your IT Training Ad has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your IT Training Ad EPCT' + training_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your IT Training Ad by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/training-details/'+training_id+'">EPCT' + training_id + '</a>'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Thanks,<br>'
                                    str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.ePardesh.com</a></strong></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="10"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table>'
                                    str += '</div>'

                                        var mailOptions = {to: email, subject: 'ePardesh: Your IT Training Ad EPCT' + training_id + ' has been activated successfully', html: str};
                                        transporter.sendMail(mailOptions, function(error, info) {
                                            if (error) {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                console.log('Message sent: ');
                                            }
                                        });
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                })
                            } else {
                                var errorMsg = 'invalid event id';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        }
                    })
                }
            });
});

/*
 * --------------------------------------------------------------------------
 * add_favourite_ad
 * ---------------------------------------------------------------------------
 */

router.post('/add_favourite_ad', function(req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    var ad_id = req.body.ad_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var add_to_favourite_query = "insert into favourite_ads (user_id, ad_id) values(?,?)"
                var favourite_values = [user_id, ad_id]
                connection.query(add_to_favourite_query, favourite_values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * remove_favourite_ad
 * ---------------------------------------------------------------------------
 */

router.post('/remove_favourite_ad', function(req, res, next) {
    var access_token = req.body.access_token;
    var favourite_id = req.body.favourite_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var remove_from_favourite_query = "delete from favourite_ads where id=?"
                var favourite_values = [favourite_id]
                connection.query(remove_from_favourite_query, favourite_values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            })
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
    connection.query(sql, values, function(err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}

/*
 * --------------------------------------------------------------------------
 * to send email
 * ---------------------------------------------------------------------------
 */
function send_email(email_data, email, subject, callback) {

    var mailOptions = {to: email, subject: subject, html: email_data};
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('in send_email function')
            return true;
        }
    })
}



module.exports = router;
