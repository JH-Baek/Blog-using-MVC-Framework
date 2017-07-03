$(function() {
    $('#id').blur(function() {
         var id = $.trim($('#id').val());
         
        $.ajax({
                    url: "signup/getUser",
                    method: "POST",
                    data: {userId: id},
                    dataType:"json",
                    success: function(html)
                    {
                        $('#numberOfId').val(html.numberOfId);
                    }
                });
        });
        
    
    $('#signupForm').submit(function() {
        var signupData = $('#signupForm').serialize();
        var password = $.trim($('#password').val());
        var confirmPassword = $.trim($('#confirmPassword').val());
        var id = $.trim($('#id').val());
        var email = $.trim($('#email').val());
        var modal = document.getElementById('popupBox');
        var numberOfId = $.trim($('#numberOfId').val());
        
        
        if (id === '' || password === '' || confirmPassword === '') {


            $('.explanationArea').empty().append('<p>Please, fill all the fields!</p>');

            $('.modal').css({display: "block"});

            $('.close').click(function () {
                $('.modal').css({display: "none"});
            });

            $(document).click(function (event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else if (numberOfId >= 1) {
            $('.explanationArea').empty().append('<p>The ID is alreday taken!</p>')

            $('.modal').css({display: "block"});

            $('.close').click(function () {
                $('.modal').css({display: "none"});
            });

            $(document).click(function (event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else if (password.length < 6) {
            $('.explanationArea').empty().append('<p>Your Password must be longer than 6 characters!</p>');

            $('.modal').css({display: "block"});

            $('.close').click(function () {
                $('.modal').css({display: "none"});
            });

            $(document).click(function (event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else if (password !== confirmPassword) {
            $('.explanationArea').empty().append('<p>Your Password and Confirm Password are not matched!</p>');

            $('.modal').css({display: "block"});

            $('.close').click(function () {
                $('.modal').css({display: "none"});
            });

            $(document).click(function (event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else if (email === '') {
            $('.explanationArea').empty().append('<p>Email is required to receive a mail when you forget your password!</p>');

            $('.modal').css({display: "block"});

            $('.close').click(function () {
                $('.modal').css({display: "none"});
            });

            $(document).click(function (event) {
                if (event.target == modal) {
                    $('.modal').css({display: "none"});
                }
            });
            return false;
        } else {
            
            $.ajax({
                    url: "signup/register",
                    method: "POST",
                    data: signupData,
                    dataType:"json",
                    success: function(o)
                    {
                        if(o.success > 0) {
                            $('.explanationArea').empty().append('<p>Successfully Registered!</p>');

                            $('.modal').css({display: "block"});
                            $('.modal-header').css("background-color", "#5cb85c");
                            $('.close').click(function () {
                                $('.modal').css({display: "none"});
                                window.location.href = "http://localhost/mvcWeb/login";
                            });

                            $(document).click(function (event) {
                                if (event.target == modal) {
                                    $('.modal').css({display: "none"});
                                    window.location.href = "http://localhost/mvcWeb/login";
                                }
                            });
                        }
                    }
                });
                 return false;
            
        }
        
        
        
        
    });
});