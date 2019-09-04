var mysql = require('mysql');

//==== Localhost Database====//
//var db_config = {
//  port: '8889',
//  host     : 'localhost',
//  user     : 'deepak',
//  password : '123',
//  database: 'epardesh'
//};

////==== Development server Database ===//
//var db_config = {
//    host: 'localhost',
//    user: 'root',
//    password: 'tarunlive)(*',
//    database: 'epardesh'
//};

//==== Production server Database ===//
var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'epardesh75waytech',
    database: 'epardesh'
};

connection = '';

function handleDisconnect() {
    console.log('in funct')
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();





//Development s3 bucket credentials
//s3_path = "https://s3.amazonaws.com";
//bucket_name = 'ftpstation'
//bucket_key = 'AKIAIUASKUZHUERRAVBA'
//bucket_secret = '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'

//Production s3 bucket credentials
s3_path = "https://s3-us-west-2.amazonaws.com";
bucket_name = 'epardesh'
bucket_key = 'AKIAJLXOSF6HX7D4CZEQ'
bucket_secret = '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'

//connection.connect(function(err) {
//  if (err) {
//    console.error('error connecting: ' + err.stack);
//    return;
//  }
//
//  console.log('connected as id ' + connection.threadId);
//});


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/classifieds/users/users');
var admin = require('./routes/classifieds/admin/admin');
var view = require('./routes/classifieds/users/view_category_and_states');
var top_categories = require('./routes/classifieds/users/top_categories');
var image_uploader = require('./routes/classifieds/users/image_upload');
var manage_ads = require('./routes/classifieds/users/manage_ads');
var view_ads = require('./routes/classifieds/users/view_ads');
var contact_us = require('./routes/classifieds/users/contact_us');
var auto_suggest = require('./routes/classifieds/users/auto_suggest');
var events = require('./routes/classifieds/users/events');
var view_events = require('./routes/classifieds/users/view_events');
var favourite_events = require('./routes/classifieds/users/favourite_events');
var it_training = require('./routes/classifieds/users/it_training');
var event_admin = require('./routes/classifieds/admin/event_admin');
var it_training_admin = require('./routes/classifieds/admin/it_training_admin');
var matrimony_users = require('./routes/matrimony/users/matrimony_user');
var matrimony_views = require('./routes/matrimony/users/matrimony_views');
var matrimony_send_request = require('./routes/matrimony/users/send_request');
var interested_profiles = require('./routes/matrimony/users/interested_profiles');
var matrimony_search = require('./routes/matrimony/users/matrimony_search');
var verify_mobile_email = require('./routes/matrimony/users/verify_mobile_email');
var matrimony_inbox = require('./routes/matrimony/users/matrimony_inbox');
var matrimony_manage_users = require('./routes/matrimony/admin/matrimony_manage_users');
var matrimony_plans = require('./routes/matrimony/admin/matrimony_plans');
var send_push_notifications = require('./routes/matrimony/admin/send_push_notifications');
//var bitcoin_payment = require('./routes/matrimony/users/btcoin_int');




var app = express();
cors = require('cors');
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//create connection for email
var nodemailer = require('nodemailer');
mailConfig = require('./routes/mailer');
transporter = nodemailer.createTransport(mailConfig);

constant = require('./routes/constant');

//Development server global variables
//url = 'http://54.172.109.78/epardesh/epardesh-web/web/app/content/img/'
//classified_url = 'http://54.172.109.78/epardesh/epardesh-web/web/#/'
//matrimony_url = 'http://54.172.109.78/epardesh/epardesh-web/web/#/'

//Production server global variables
url = 'www.epardesh.com/app/content/img/'
classified_url = 'www.epardesh.com/#/'
matrimony_url = 'www.epardesh.com/#/'

// Twilio Credentials
var accountSid = 'AC810f726296235de2772dfae25bb057df';
var authToken = 'dddab36a1dee11387336211337d10337';
admin_number = '+17639511463'



//var accountSid = 'AC3e26d52231c2b723fe1cc57d6aac9ecd';
//var authToken = '0a43c7be8becbfa70e5a990679f7aa3d';
//admin_number = '+12014313681'
//require the Twilio module and create a REST client
client = require('twilio')(accountSid, authToken);
    
    
    
    
    
    
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

app.post('/register_user', users);
app.post('/login_user', users);
app.post('/forgot_password', users);
app.post('/auth/facebook',users);
app.post('/auth/google',users);
app.post('/update_user_type',users);
app.post('/admin_login',admin);
app.post('/epardesh_categories',admin);
app.post('/view_epardesh_categories',view);
app.post('/view_epardesh_sub_categories',view);
app.post('/edit_epardesh_categories',admin);
app.post('/delete_epardesh_categories',admin);
app.post('/view_epardesh_states',view);
app.post('/view_epardesh_cities',view);
app.post('/update_password',users);
app.post('/change_password',users);
app.post('/update_user_profile',users);
app.post('/view_users_profile',view);
app.post('/update_badwords',admin);
app.post('/view_badwords',admin);
app.post('/manage_users',admin);
app.post('/view_plans',admin);
app.post('/edit_plans',admin);
app.post('/add_plans',admin);
app.post('/delete_plans',admin);
app.post('/add_promotional_ad',admin);
app.post('/view_promotional_ads',admin);
app.post('/edit_promotional_ad',admin);
app.post('/delete_promotional_ad',admin);
app.post('/view_subcategories_by_categories',view);
app.post('/view_top_categories',top_categories);
app.post('/upload_image',image_uploader);
app.post('/update_images',manage_ads);
app.post('/delete_images',manage_ads);
app.post('/epardesh_ads',manage_ads);
app.post('/ads_by_category',view_ads);
app.post('/ads_by_sub_category',view_ads);
app.post('/approve_ad',admin);
app.post('/view_ads',admin);
app.post('/edit_epardesh_ads',manage_ads);
app.post('/delete_epardesh_ads_images',manage_ads);
app.post('/cancel_epardesh_ads',manage_ads);
app.post('/upgrade_to_featured',manage_ads);
app.post('/upgrade_to_premium',manage_ads);
app.post('/view_user_ads',manage_ads);
app.post('/upload_promotional_image',admin);
app.post('/view_ads_by_choice',view_ads);
app.post('/display_promotional_ads',view_ads);
app.post('/update_view_count',manage_ads);
app.post('/view_ad_details',view_ads);
app.post('/contact_us',contact_us);
app.post('/change_admin_password',admin);
app.post('/auto_suggest',auto_suggest);
app.post('/check_email',users);
app.post('/view_special_categories',view);
app.post('/contact_business_owner',contact_us);
app.post('/check_ad_tittle',manage_ads);
app.post('/approve_ad_by_user',manage_ads);
app.post('/view_top_featured_ads',view_ads);
app.post('/view_full_ad_info',admin);
app.post('/admin_delete_ad',admin);
app.post('/admin_block_unblock_ad',admin);
app.post('/auto_suggest_tittle',auto_suggest);
app.post('/delete_users',admin);
app.post('/top_categories',view);
app.post('/featured_and_trending_ads',view_ads);
app.post('/global_search',view_ads);
app.post('/add_events',events);
app.post('/approve_events',events);
app.post('/view_my_events',events);
app.post('/edit_event',events);
app.post('/delete/cancel_event',events);
app.post('/upgrade_event_plan',events);
app.post('/contact_event_owner',events);
app.post('/message_event',events);
app.post('/check_event_tittle',events);
app.post('/view_all_events',event_admin);
app.post('/admin_delete_event',event_admin);
app.post('/top_featured_events',view_events);
app.post('/add_favourite_event',favourite_events);
app.post('/remove_favourite_event',favourite_events);
app.post('/view_favourite_event',favourite_events);
app.post('/view_upcoming_events',view_events);
app.post('/filter_events',view_events);
app.post('/add_training_courses',it_training_admin);
app.post('/view_all_courses',it_training_admin);
app.post('/edit_training_course',it_training_admin);
app.post('/admin_delete_course',it_training_admin);
app.post('/view_all_training_ads',it_training_admin);
app.post('/admin_delete_training_ad',it_training_admin);
app.post('/add_it_training',it_training);
app.post('/approve_it_training',it_training);
app.post('/edit_training_ad',it_training);
app.post('/view_my_training_ads',it_training);
app.post('/delete/cancel_training_ad',it_training);
app.post('/upgrade_training_plan',it_training);
app.post('/view_training_ad_details',it_training);
app.post('/add_favourite_training',it_training);
app.post('/remove_favourite_training',it_training);
app.post('/view_favourite_training_ads',it_training);
app.post('/contact_training_owner',it_training);
app.post('/send_email/msg',it_training);
app.post('/view_top_featured_training_ads',it_training);
app.post('/check_training_tittle',it_training);
app.post('/filter_training',it_training);
app.post('/view_nearby_training',it_training);
app.post('/add_favourite_ad',manage_ads);
app.post('/view_favourites',view_ads);
app.post('/add_promocode',admin);
app.post('/delete_promocode',admin);
app.post('/view_all_promocode',users);
app.post('/view_homepage_promocode',users);
app.post('/view_event',view_events);



app.post('/register_matrimony_user',matrimony_users);
app.post('/login_matrimony_user',matrimony_users);
app.post('/matrimony/facebook',matrimony_users);
app.post('/matrimony/google',matrimony_users);
app.post('/change_matrimony_password',matrimony_users);
app.post('/forgot_matrimony_password',matrimony_users);
app.post('/update_matrimony_password',matrimony_users);
app.post('/view_matrimony_religions',matrimony_views);
app.post('/update_matrimony_user_profile',matrimony_users);
app.post('/update_matrimony_partner_preferences',matrimony_users);
app.post('/view_my_profile',matrimony_users);
app.post('/view_partner_preferences',matrimony_users);
app.post('/send_request',matrimony_send_request);
app.post('/send_message',matrimony_send_request);
app.post('/view_full_profile',matrimony_send_request);
app.post('/interested_profiles',interested_profiles);
app.post('/accept_or_reject_request',interested_profiles);
app.post('/remove_from_favourites',interested_profiles);
app.post('/matrimony_search',matrimony_search);
app.post('/generate_otp',verify_mobile_email);
app.post('/verify_otp',verify_mobile_email);
app.post('/generate_email_otp',verify_mobile_email);
app.post('/verify_email_otp',verify_mobile_email);
app.post('/view_matrimony_plans',matrimony_views);
app.post('/view_suggested_profiles',matrimony_views);
app.post('/send_direct_sms',matrimony_send_request);
app.post('/matrimony_inbox',matrimony_inbox);
app.post('/view_message_thread',matrimony_inbox);
app.post('/upgrade_plan',matrimony_users);
app.post('/matrimony_manage_users',matrimony_manage_users);
app.post('/view_details',matrimony_manage_users);
app.post('/admin_view_plans',matrimony_plans);
app.post('/admin_edit_plans',matrimony_plans);
app.post('/plan_expiration_alert',send_push_notifications);
app.post('/view_top_profiles',matrimony_views);
app.post('/profile_completion_alert',send_push_notifications);
app.post('/interested_profile_counts',interested_profiles);
app.post('/matrimony_check_email',matrimony_users);
app.post('/matrimony_admin_blck_user',matrimony_manage_users);
app.post('/matrimony_add_promocode',matrimony_plans);
app.post('/matrimony_view_promocode',matrimony_plans);
app.post('/matrimony_report_spam',matrimony_users);
app.post('/update_matrimony_badwords',matrimony_manage_users);

//app.post('/pay_with_bitcoin',bitcoin_payment);
//app.post('/send_by_bitcoin',bitcoin_payment);
//app.post('/get_transaction_details',bitcoin_payment);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
