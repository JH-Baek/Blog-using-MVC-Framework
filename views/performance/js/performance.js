$(function() {
    
    function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    
    var todayDate = new Date();
    var formattedTodayDate = formatDate(todayDate);
    
    
    $("#loadingImage").show();
    $.get('performance/taskGetListings', function(o) {
        
        
        
        Array.prototype.diff = function(arr2) {
            var ret = [];
            for(var i in this) {   
                if(arr2.indexOf( this[i] ) > -1){
                    ret.push( this[i] );
                }
            }
            return ret;
        };
        
        
        var arrayOfTaskDate = [];
        for (var i = o.length-1; i >= 0; i--) {
//            var startDate = '2017-03-17';
//            var endDate = new Date('2017-12-30');
            //var convertedTaskDate = new Date(o[i].taskDate)
            arrayOfTaskDate.push(o[i].taskDate);
//            console.log(startDate);
//            console.log(o[i].taskDate);    
            
            
            //for loop for date -> range of date such as between 2017-03-17 and 2099-12-30
            // if o[i].date == date from range then make div
            $('#listInserts').append('<div><p>Task Name: ' + o[i].taskName + ' Task Type: ' + o[i].taskType  + ' Date: ' + o[i].taskDate +  ' Time: ' + o[i].timeSpent + '<a class="del" rel="'+ o[i].taskId +'" href="#">X</a></p></div>');
        }
        
        
        
        var day = 1000*60*60*24;
        date1 = new Date('2017-03-16');
        date2 = new Date("2027-04-01");
        
        var datesBetweenTwoDates = [];
        var difference = (date2.getTime()- date1.getTime())/day;
        for(var i=0;i<=difference; i++)
        {
           var xx = date1.getTime()+day*i;
           var yy = new Date(xx);
           var formattedDate = formatDate(yy);
           
           datesBetweenTwoDates.push(formattedDate)
           
        }
        
        //console.log(datesBetweenTwoDates);
        //console.log(arrayOfTaskDate);
        
        var taskDates = datesBetweenTwoDates.diff(arrayOfTaskDate);
        //console.log(taskDates);
        
        var dataset = [2,2,4,2,6,4,7,8];
        var results = [];
        for ( i=0; i < dataset.length; i++ ){
            if ( dataset[i] == 2 ){
                results.push( i );
            }
        }

        console.log(results);
        
        for (var n = taskDates.length-1; n >= 0; n--) {
            //console.log(taskDates[n]);
            $('.listingByDate').append('<div class="orderByDates">\n\
                                            <p class="date">'+taskDates[n]+'</p>\n\
                                            <div class="'+taskDates[n]+'" style="width: 100%; background-color: white;"></div>\n\
                                        </div>');
            
            
            
            for (var i = o.length-1; i >= 0; i--) {
                if(o[i].taskDate == taskDates[n]) {
                    $('.'+taskDates[n]).append('<div class="task">\n\
                                                    <a class="del" rel="'+ o[i].taskId +'" href="#">X</a></br>\n\
                                                    <p>Task Name: ' + o[i].taskName + '</br>\n\
                                                        Task Type: ' + o[i].taskType  + '</br>\n\
                                                        Date: ' + o[i].taskDate + '</br>\n\
                                                        Time: ' + o[i].timeSpent + '</br>\n\
                                                        Focus Level: <input type="text" name="focusLevel" class="focusLevel" id="'+ o[i].taskId +'" value="' + o[i].taskFocusLevel + '" readonly/>\
                                                    </p>\n\
                                                </div>');
                    
    
//                        if (window.matchMedia('(max-width: 960px)').matches) {
//                            $('.'+ o[i].taskDate).css("background-color", "#eee");
//                            $('.'+ o[i].taskDate).css("margin", "2%");
//                            $('.'+ o[i].taskDate).css("padding", "2%");
//                            $('.'+ o[i].taskDate).css("text-align", "left");
//                            $('.'+ o[i].taskDate).css("padding-top", "0.5%");
//                            $('.'+ o[i].taskDate).css("display", "inline-block");
//                            $('.'+ o[i].taskDate).css("float", "left");
//                            $('.'+ o[i].taskDate).css("width", "45%");
//                            $('.'+ o[i].taskDate).slice(3).hide();
//                        } else {
//                            $('.'+ o[i].taskDate).css("background-color", "#eee");
//                            $('.'+ o[i].taskDate).css("margin", "2%");
//                            $('.'+ o[i].taskDate).css("padding", "2%");
//                            $('.'+ o[i].taskDate).css("text-align", "left");
//                            $('.'+ o[i].taskDate).css("padding-top", "0.5%");
//                            $('.'+ o[i].taskDate).css("display", "inline-block");
//                            $('.'+ o[i].taskDate).css("float", "left");
//                            $('.'+ o[i].taskDate).css("width", "28%");
//                            $('.'+ o[i].taskDate).slice(3).hide();
//                        }
                    
                    
                    
                   
                   
                    
                    if ($.trim($('#'+ o[i].taskId).val()) === 'Great') {
                        $('#'+ o[i].taskId).css("background-color", "#33cc00");
                        $('#'+ o[i].taskId).css("color", "#33cc00");
                    } else if ($.trim($('#'+ o[i].taskId).val()) === 'Satisfactory') {
                        $('#'+ o[i].taskId).css("background-color", "#ff9933");
                        $('#'+ o[i].taskId).css("color", "#ff9933");
                    } else if ($.trim($('#'+ o[i].taskId).val()) === 'Poor') {
                        $('#'+ o[i].taskId).css("background-color", "#ff3333");
                        $('#'+ o[i].taskId).css("color", "#ff3333");
                    }
                    
                   
                    
                }
    //            var startDate = '2017-03-17';
    //            var endDate = new Date('2017-12-30');
                //var convertedTaskDate = new Date(o[i].taskDate)
                //arrayOfTaskDate.push(o[i].taskDate);
    //            console.log(startDate);
    //            console.log(o[i].taskDate);    


                //for loop for date -> range of date such as between 2017-03-17 and 2099-12-30
                // if o[i].date == date from range then make div
                
                
            }
             
        }
        
        
        

        $("#loadingImage").hide();
        
        $('.orderByDates').slice(0, 2).show();

        $('.buttonForTaskListing').on('click', '#show', function (e) {
            e.preventDefault();

            $('.orderByDates:hidden').slice(0, 2).slideDown();
            if ($('.orderByDates:hidden').length == 0) {
                $('#show').fadeOut('slow');
            }

            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1500);
        });
        
        
        
//        var result = [];
//        for (var i = 0; i < taskDates.length; i++) {
//            console.log(taskDates[i]);
//            $('.listingByDate').append('<div class="'+taskDates[i]+'">'+taskDates[i]+'</div>');
//            for (var n = 0; n < arrayOfTaskDate.length; n++) {
//                if(arrayOfTaskDate[n] == taskDates[i]) {
//                    console.log(arrayOfTaskDate[n]);
//                     $('.listingByDate').append('<p>'+arrayOfTaskDate[n]+'</p>');
//                    
//                }
//            }
////            var index = arrayOfTaskDate.indexOf(taskDates[i]);
////            console.log(index);
////            console.log(taskDates[i]);
//        
//        }
        
        //console.log(result);
        
        $('.listingByDate').on('click', '.del', function() {
            
            
            delItem = $(this);
            var id = $(this).attr('rel');
            var selectedTaskListing = delItem.parent();
            var selectedDivArea = delItem.parent().parent().parent();
            var numberOfTaskAddedInSelectedDivArea = delItem.parent().parent().children().length;
            
            $.post('performance/taskDeleteListing', {'taskid': id}, function(o) {
                //$('#listInserts').append('<div>' + o.text + '<a class="del" rel="'+ o.id +'" href="#">X</a></div>');
                //alert(1);
//                delItem.parent().remove();
//                console.log(numberOfTaskAdded);
                if(numberOfTaskAddedInSelectedDivArea <= 1) {
                    selectedDivArea.remove();
                    $('.orderByDates').slice(0, 2).show();
                } else {
                    selectedTaskListing.remove();
                }
//                for (var n = taskDates.length-1; n >= 0; n--) {
//                    console.log(numberOfTaskAdded);
////                    if($('.'+taskDates[n]).length == 1) {
////                        delItem.parent().remove();
////                        delItem.parent().parent().parent().remove();
////                    } else {
////                        delItem.parent().remove();
////                    }
//                }
                
            });
            
            return false;
        });
        
    }, 'json');
    
    
    
    $(".btn-primary").click(function () {
        if ($("input[type='radio']").is(':checked')) {
            $("#radioValue").val($(this).text());
        }
    });
    
    if ($('#option1').is(':checked')) {
        $("#radioValue").css("background-color", "#33cc00");
        $("#radioValue").css("color", "#33cc00");
    }
    
    $(".btn-primary").change(function () {
        if ($('#option1').is(':checked')) {
            $("#radioValue").css("background-color", "#33cc00");
            $("#radioValue").css("color", "#33cc00");
        } else if ($('#option2').is(':checked')) {
            $("#radioValue").css("background-color", "#ff9933");
            $("#radioValue").css("color", "#ff9933");
        } else if ($('#option3').is(':checked')) {
            $("#radioValue").css("background-color", "#ff3333");
            $("#radioValue").css("color", "#ff3333");
        }
    });
    $('#performanceForm').submit(function() {
        var url = $('#performanceInsert').attr('action');
        var sw = $('#timer').text();
        var sw_data = {time: sw};
        var data = $('#performanceInsert').serialize() + '&' + $.param(sw_data);
        
        if ($.trim($("#taskName").val()) === "" || $.trim($("#taskName").val()) ==="") {
            var modal = document.getElementById('popupBox');
            
            $('.modal').css({display: "block"});
            
            $('.close').click(function() {
                $('.modal').css({display: "none"});
            });
            
            $(document).click(function(event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else {
        
            $.post(url, data, function(o) {
                console.log(o);

                //console.log($('.'+formattedTodayDate).length);

                if ($('.'+formattedTodayDate).length > 0) {
                    $('.'+formattedTodayDate).prepend('<div class="task">\n\
                                                            <a class="del" rel="'+ o.id +'" href="#">X</a></br>\n\
                                                            <p>Task Name: ' + o.task +  '</br>\n\
                                                                Task Type: ' + o.type  + '</br>\n\
                                                                Date: ' + o.date + '</br>\n\
                                                                Time: ' + o.time + '</br>\n\
                                                                Focus Level: <input type="text" name="focusLevel" class="focusLevel" id="'+ o.id +'" value="' + o.focusLevel + '" readonly/>\
                                                            </p>\n\
                                                        </div>');
                    
                    if ($.trim($('#'+ o.id).val()) === 'Great') {
                        $('#'+ o.id).css("background-color", "#33cc00");
                        $('#'+ o.id).css("color", "#33cc00");
                    } else if ($.trim($('#'+ o.id).val()) === 'Satisfactory') {
                        $('#'+ o.id).css("background-color", "#ff9933");
                        $('#'+ o.id).css("color", "#ff9933");
                    } else if ($.trim($('#'+ o.id).val()) === 'Poor') {
                        $('#'+ o.id).css("background-color", "#ff3333");
                        $('#'+ o.id).css("color", "#ff3333");
                    }
                    
                    $('.orderByDates').slice(2).hide();
                    if ($('.orderByDates > :hidden').length > 1) {
                        $('#show').show();
                    }
                } else {
                    $('.listingByDate').prepend('<div class="orderByDates" style="display: block;">\n\
                                                        <p class="date">'+formattedTodayDate+'</p>\n\
                                                        <div class="'+formattedTodayDate+'"></div>\n\
                                                </div>');
                    $('.'+formattedTodayDate).append('<div class="task">\n\
                                                            <a class="del" rel="'+ o.id +'" href="#">X</a></br>\n\
                                                            <p>Task Name: ' + o.task +  '</br>\n\
                                                                Task Type: ' + o.type  + '</br>\n\
                                                                Date: ' + o.date + '</br>\n\
                                                                Time: ' + o.time + '</br>\n\
                                                                Focus Level: <input type="text" name="focusLevel" class="focusLevel" id="'+ o.id +'" value="' + o.focusLevel + '" readonly/>\
                                                            </p>\n\
                                                        </div>');
                    
                    if ($.trim($('#'+ o.id).val()) === 'Great') {
                        $('#'+ o.id).css("background-color", "#33cc00");
                        $('#'+ o.id).css("color", "#33cc00");
                    } else if ($.trim($('#'+ o.id).val()) === 'Satisfactory') {
                        $('#'+ o.id).css("background-color", "#ff9933");
                        $('#'+ o.id).css("color", "#ff9933");
                    } else if ($.trim($('#'+ o.id).val()) === 'Poor') {
                        $('#'+ o.id).css("background-color", "#ff3333");
                        $('#'+ o.id).css("color", "#ff3333");
                    }

                    $('.orderByDates').slice(2).hide();
                    if ($('.orderByDates > :hidden').length > 1) {
                        $('#show').show();
                    }
                }
                //alert(sw);

            }, 'json');
        
        return false;
    }
    
    });
    
});