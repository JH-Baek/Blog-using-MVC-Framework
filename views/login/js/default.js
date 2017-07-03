$(function() {
    
    
    $('.loginForm').submit(function() {
        var loginData = $('.loginForm').serialize();
        var modal = document.getElementById('popupBox');
         $.ajax({
                    url: "login/run",
                    method: "POST",
                    data: loginData,
                    dataType:"json",
                    success: function(o)
                    {
                        if(o.numberOfLoginId > 0) {
                            window.location.href = "http://localhost/mvcWeb/todolist/";
                        } else {
                            $('.explanationArea').empty().append('<p>Invalid ID and/or Password!</p>')
                            $('.modal').css({display: "block"});

                            $('.close').click(function () {
                                $('.modal').css({display: "none"});
                            });

                            $(document).click(function (event) {
                                if (event.target == modal) {
                                    $('.modal').css({display: "none"});
                                }
                            });
            
                        }
                    }
                });
                 return false;
        });
   
});