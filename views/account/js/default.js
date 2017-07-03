$(function () {
    $('#changePasswordForm').submit(function() {
        var formData = $('#changePasswordForm').serialize();
        var formUrl = $('#changePasswordForm').attr('action');
        var modal = document.getElementById('popupBox');
        var password = $.trim($('#password').val());
        var newPassword = $.trim($('#new-password').val());
        var confirmNewPassword = $.trim($('#confirm-new-password').val());
        
        if (password === '' || newPassword === '' || confirmNewPassword === '') {
            $('.explanationArea').empty().append('<p>Please, fill all the fields!</p>')
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
        } else if (newPassword.length < 6) {
            $('.explanationArea').empty().append('<p>Your new password must be longer than 6 characters!</p>')
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
        } else if (newPassword !== confirmNewPassword) {
            $('.explanationArea').empty().append('<p>Your Password and Confirm Password do not match!</p>')
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
        } else if (password == newPassword) {
            $('.explanationArea').empty().append('<p>Your new password must be different from your current password!</p>')
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
                    url: formUrl,
                    method: "POST",
                    data: formData,
                    dataType:"json",
                    success: function(o)
                    {
                        if (o.numberOfLoginId > 0) {
                            $('.explanationArea').empty().append('<p>Your password has successfully been changed!</p>')
                            $('.modal').css({display: "block"});
                            $('.modal-header').css("background-color", "#5cb85c");
                            $('.close').click(function () {
                                $('.modal').css({display: "none"});
                                window.location.href = "https://localhost/mvcWeb/account";
                            });

                            $(document).click(function (event) {
                                if (event.target == modal) {
                                    $('.modal').css({display: "none"});
                                    window.location.href = "https://localhost/mvcWeb/account";
                                }
                            });
                            
                        } else {
                            $('.explanationArea').empty().append('<p>Invalid Password!</p>')
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
            }
        });

    $('#forgotPasswordForm').submit(function(){
        var formData = $('#forgotPasswordForm').serialize();
        var formUrl = $('#forgotPasswordForm').attr('action');
        $.ajax({
                    url: formUrl,
                    method: "POST",
                    data: formData,
                    dataType:"json",
                    success: function(o)
                    {
                        if (o.numberOfEmail > 0) {
                            $('.explanationArea').empty().append('<p>The Link for resetting your password has sent to your email!</p>')
                            $('.modal').css({display: "block"});
                            $('.modal-header').css("background-color", "#5cb85c");
                            $('.close').click(function () {
                                $('.modal').css({display: "none"});
                                window.location.href = "https://localhost/mvcWeb/login";
                            });

                            $(document).click(function (event) {
                                if (event.target == modal) {
                                    $('.modal').css({display: "none"});
                                    window.location.href = "https://localhost/mvcWeb/login";
                                }
                            });
                            
                        } else {
                            $('.explanationArea').empty().append('<p>The following email is not associated with any accounts.</p>')
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
    
//    $('#email').blur(function() {
//        var email = $.trim($('#email').val());
//        var formUrl = 'https://localhost/mvcWeb/account/getUser';
//        $.ajax({
//                    url: formUrl,
//                    method: "POST",
//                    data: {userEmail: email},
//                    dataType:"json",
//                    success: function(html)
//                    {
//                        $('#numberOfEmail').val(html.numberOfEmail);
//                    }
//                });
//    });
    
     $('#resetPasswordForm').submit(function(){
        var formData = $('#resetPasswordForm').serialize();
        var formUrl = $('#resetPasswordForm').attr('action');
        var modal = document.getElementById('popupBox');
        var newPassword = $.trim($('#new-password').val());
        var confirmNewPassword = $.trim($('#confirm-new-password').val());
        
        if (newPassword === '' || confirmNewPassword === '') {
            $('.explanationArea').empty().append('<p>Please, fill all the fields!</p>')
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
        } else if (newPassword.length < 6) {
            $('.explanationArea').empty().append('<p>Your new password must be longer than 6 characters!</p>')
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
        } else if (newPassword !== confirmNewPassword) {
            $('.explanationArea').empty().append('<p>Your Password and Confirm Password do not match!</p>')
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
                    url: formUrl,
                    method: "POST",
                    data: formData,
                    dataType:"json",
                    success: function(o)
                    {
                        if (o.numberOfLoginId > 0) {
                            $('.explanationArea').empty().append('<p>Your password has successfully been changed!</p>')
                            $('.modal').css({display: "block"});
                            $('.modal-header').css("background-color", "#5cb85c");
                            $('.close').click(function () {
                                $('.modal').css({display: "none"});
                                window.location.href = "https://localhost/mvcWeb/login";
                            });

                            $(document).click(function (event) {
                                if (event.target == modal) {
                                    $('.modal').css({display: "none"});
                                    window.location.href = "https://localhost/mvcWeb/login";
                                }
                            });
                            
                        } else {
                            $('.explanationArea').empty().append('<p>Some error has occured! Please try agains, soon.</p>')
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
            }
     });

});