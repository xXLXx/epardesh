(function() {
    'use strict';
    var controllerId = 'eventDetailsCtrl';
    angular
            .module('app')
            .controller(controllerId, eventDetailsCtrl);
    eventDetailsCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'EventServices', '$stateParams','adDataServices','loginRegiServices'];
    function eventDetailsCtrl($rootScope, $scope, $state, $timeout, EventServices, $stateParams,adDataServices,loginRegiServices) {
        var vm = this;
        vm.viewContact = false;
        vm.addContactInfoModal = false;
        vm.closeModal = closeModal;
        vm.closeimg = closeimg;
        vm.viewContactFun = viewContactFun;
        vm.adContactView = adContactView;
         vm.viewsendemail = viewsendemail;
        vm.eventSendEmailCon = eventSendEmailCon;
        vm.eventSendEmailConlogin = eventSendEmailConlogin;
        vm.showSending = true;
        vm.cnt=4;
        
        var data = {
            event_id: $stateParams.id,
                    user_id:''
        }
        if(localStorage.getItem('user_id'))
        {
            data.user_id = localStorage.getItem('user_id');
        }else
        {
            data.user_id = '';
        }
/***event detail *******/
       vm.hideLoader = true;
      EventServices.eventinfo(data).success(function(response){
          if(response.status == 105)
          {
              vm.hideLoader = false;
              console.log(response);
              //***timezone
               var dt = response.data;              
                    //start date
                    var d = new Date(dt[0].start_date);                  
                    var localTime = d.getTime();
                    var localOffset = d.getTimezoneOffset() * 60000;
                    var utc = localTime;
                    var st = utc + (localOffset);
                    var nd = new Date(st);
                    response.data[0].start_date = nd;                  
                   //end date                   
                     var de = new Date(dt[0].end_date);                
                    var localTime_end = de.getTime();
                    var localOffset_end = de.getTimezoneOffset() * 60000;
                    var utc_end = localTime_end;
                    var end = utc_end + (localOffset_end);
                    var nd_end = new Date(end);
                    response.data[0].end_date = nd_end;
              //*****end timezone
              
              
              
              vm.getData = response.data[0];
              vm.getpername = response.data[0].performer.split("&&");
              vm.getpertype = response.data[0].performance_type.split("&&");
              vm.getData.performer = vm.getpername;
              vm.getData.performance_type = vm.getpertype;
              console.log('event detail above');
              console.log(vm.getData)
              console.log(vm.getpername);
              console.log(vm.getpertype);
              
          }
          
          
      })


 vm.checktrack=checktrack;
       function checktrack()
       {
           //alert('sgdgfg');
          var ch=localStorage.getItem('track_event');
           $state.go(ch);

       }

function closeimg()
{
    $('#myModal').hide();
    
}
  

        vm.viewContactObj = {
            name: null,
            email: null,
            phone: null,
            user_id: null,
        }
        function viewContactFun(data) {
            console.log(data);
            vm.name = data.organisor;
            vm.phone = data.event_phone;
//            vm.email = data.email;
            vm.viewContactObj.user_id = data.user_id;
            if (localStorage.getItem('user_name')) {
                vm.organisor = data.organisor;
                vm.event_phone = data.event_phone;
                vm.viewContact = true; 
            }
            else {
                vm.addContactInfoModal = true;
            }
        }
        function closeModal(status) {
            if (status == 1) {
                vm.viewContact = false;
            }
            else {
                vm.addContactInfoModal = false;
            }
            
            
             if (status == 1) {
                vm.viewContact = false;
            }
            else if (status == 2) {
                vm.addContactInfoModal = false;
                vm.type = '';
                vm.msg = ""
                vm.viewContactObj.name = '';
                vm.viewContactObj.email = '';
                vm.viewContactObj.phone = '';
            }
            else if (status == 3)
            {
                vm.eventSendEmail = false;
                vm.sendEmailObj.sender_name = '';
                vm.sendEmailObj.sender_email = '';
                vm.sendEmailObj.message = '';
            } else if (status == 4)
            {
                vm.eventSendEmaillogin = false;
                vm.sendEmailObj.message = '';
            }
            
            
            
            
        }

        function adContactView() {
            vm.showSending = false;
            EventServices.contactEvent(vm.viewContactObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {
                    vm.organisor= vm.name;
                vm.event_phone = vm.phone;
                    vm.type = 'success';
                    vm.msg = "View contact info sent successfully."
                    $timeout(function() {
                        vm.alert = false;
                        vm.addContactInfoModal = false;
                        vm.viewContact = true;
                    }, 1500);
                }
                else {
                    vm.type = 'danger';
                    vm.msg = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert = false;
                    }, 1500);
                }
            })
        }
        
        
        
             /*========================Search from see all category==============================*/
        
   /*===pop up ====*/
     $scope.$on("ViewAllCat", function(event,data) {
                console.log('all cat');
                console.log(data);
                vm.category = data;                  
        });
        
        
         function open_pop() {
//              alert("dfsfsd");
            $("html, body").animate({scrollTop: 0}, 600);


            var id = '#dialog';

            //Get the screen height and width
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            //Set heigth and width to mask to fill up the whole screen
            $('#mask').css({'width': maskWidth, 'height': maskHeight});

            //transition effect		
            $('#mask').fadeIn(500);
            $('#mask').fadeTo("slow", 0.9);

            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();

            //Set the popup window to center
//		$(id).css('top',  winH/2-$(id).height()/2);
//		$(id).css('left', winW/2-$(id).width()/2);
            $(id).css('display', 'block');
            //transition effect
            $(id).fadeIn(2000);

//	//if close button is clicked
            $('.close').click(function(e) {
                //Cancel the link behavior
                e.preventDefault();

                $('#mask').hide();
                $('.window').hide();
            });
//	
//	//if mask is clicked
            $('#mask').click(function() {
                $(this).hide();
                $('.window').hide();
            });




        }
        
        
        vm.globalsearch = {
            status: "",
            keyword: "",
            category_id: "",
            subcategory_id: "",
            lattitude:"",
            longitude:""
            
        }
         vm.getCat = getCat;
        function getCat(cat) {
            vm.globalsearch.status=1;
           vm.globalsearch.lattitude= localStorage.getItem('current_lat');
           vm.globalsearch.longitude= localStorage.getItem('current_lon');
            vm.globalsearch.category_id = cat;
//            alert(vm.globalsearch.category_id);
           
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })

        }
      
         vm.getSubCat = getsubCat;
        function getsubCat(subcat,cat) {
           
           vm.globalsearch.status=1;
           vm.globalsearch.lattitude= localStorage.getItem('current_lat');
           vm.globalsearch.longitude= localStorage.getItem('current_lon');
            vm.globalsearch.category_id = cat;
            vm.globalsearch.subcategory_id = subcat;
//            alert(vm.globalsearch.subcategory_id);
//            alert(vm.globalsearch.category_id);
              localStorage.setItem('Cat_id',cat)
              localStorage.setItem('subcat_id',subcat)
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })

        }




        /****** Add to Favourite ********/
        vm.favObj = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "event_id": ""

        }
        vm.addtofav = addtofav;

        function addtofav(data)
        {
            console.log(data)
            if (localStorage.getItem('user_name')) {
                vm.favObj.event_id = data.id;
                EventServices.addtoFavEvent(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {
                     data.favourite_status = '1';
                     vm.getData = data;
                     console.log(vm.getData)


                        vm.favpopup = true;
                        console.log('addtofav');
                        console.log(response);
//                        $('.ad_fav').html('added');
                        $timeout(function() {
                            vm.favpopup = false;
                        }, 2000);

                    }
                    else
                    {
                        console.log('failed');
                    }

                })

            }
            else {
                $state.go('login');
            }

        }

//send email
vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            user_id: null,
            event_tittle: null,
            sender_phone:null
        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.user_id = data.user_id;
            vm.sendEmailObj.event_tittle = data.event_tittle;

            if (localStorage.getItem('user_name')) {
                vm.sendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.sendEmailObj.sender_email = localStorage.getItem('email');
                 vm.sendEmailObj.sender_phone = localStorage.getItem('phone');
                vm.eventSendEmaillogin = true;
            }
            else {

                vm.eventSendEmail = true;
            }
        }

     function eventSendEmailCon() {
            vm.showSending = false;
            EventServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {
                    vm.type_email = 'success';
                    vm.msg_email = "Email sent successfully."
                    $timeout(function() {
                        vm.alert_email = false;
                        vm.eventSendEmail = false;
                        vm.sendEmailObj.sender_name = '';
                        vm.sendEmailObj.sender_email = '';
                        vm.sendEmailObj.message = '';
                        vm.type_email = '';
                        vm.msg_email = ""


                    }, 1500);
                }
                else {
                    vm.type_email = 'danger';
                    vm.msg_email = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert_email = false;
                    }, 1500);
                }
            })

        }
        function eventSendEmailConlogin()
        {
            vm.showSending = false;
            EventServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email_login = 'success';
                    vm.msg_email_login = "Email sent successfully."

                    $timeout(function() {
                        vm.alert_email_login = false;
                        vm.eventSendEmaillogin = false;
                        vm.type_email_login = '';
                        vm.msg_email_login = "";
                        vm.sendEmailObj.message = '';

                    }, 1500);
                }
                else {
                    vm.type_email_login = 'danger';
                    vm.msg_email_login = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert_email_login = false;
                    }, 1500);
                }
            })

        }
      





 $('body').removeClass('modal-open');
$('.modal-backdrop').remove();
    }

})();