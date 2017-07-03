<?php

class Account_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    function editpassword($data) {
//$data['login'] = $_POST['login'];
//        $data['password'] = $_POST['password'];
//        $data['newPassword'] = password_hash($_POST['new-password'], PASSWORD_DEFAULT);
        
//        $userid = $_POST['login'];
//        $password = $_POST['password'];
//        $newPassword = $_POST['new-password'];
//        $newPasswordConfirm = $_POST['confirm-new-password'];

        $sth = $this->db->prepare('SELECT * FROM user WHERE login = :login');
        $sth->execute(array(
            ':login' => $data['login']
        ));

        $countingNumberOfLoginId = $sth->rowCount();
        
        if ($countingNumberOfLoginId > 0) {
            $row = $sth->fetch();
            $hash_pwd = $row['password'];

            $hash = password_verify($data['password'], $hash_pwd);
            
            if ($hash == 0) {
                $loginFailed = array(
                    'numberOfLoginId' => $hash
                );

                echo json_encode($loginFailed);
                
//                echo 'error';
            } else {
                
                //$this->db->update('user', array('password' => $data['newPassword']), "`login` = {$data['login']}");
                
                $sth = $this->db->prepare('UPDATE user SET `password` = :newPassword WHERE `login` = :login AND password = :oldPassword');
                $sth->execute(array(
                    ':newPassword' => $data['newPassword'],
                    ':login' => $data['login'],
                    ':oldPassword' => $hash_pwd
                ));
                
                $loginSucceeded = array(
                    'numberOfLoginId' => $countingNumberOfLoginId
                );

                echo json_encode($loginSucceeded);
//                echo 'success';
            }
        }
    }

    function getUser() {
        if (!empty($_POST['userEmail'])) {
            $sth = $this->db->prepare("SELECT userid FROM user WHERE email = :email");

            $sth->execute(array(
                ':email' => $_POST['userEmail']
            ));

            $count = $sth->rowCount();
            $data = array(
                'numberOfEmail' => $count
            );

            echo json_encode($data);
        }
    }

    function sendLink($data) {
        
            $sth = $this->db->prepare("SELECT * FROM user WHERE email = :email");

            $sth->execute(array(
                ':email' => $data['email']
            ));
            
            $count = $sth->rowCount();
            if ($count > 0) {
                $userDetails = $sth->fetch();
                $uniqidStr = md5(uniqid(mt_rand()));
                
                //phpmailer
                    require 'PHPMailer-master/PHPMailerAutoload.php';
                //
                
                //$this->db->update('user', array('forgot_pass_identity' => $data['newPassword']), "`email` = {$data['email']}");
                
                $sth = $this->db->prepare("UPDATE user SET `forgot_pass_identity` = :forgot_pass_identity WHERE `email` = :email");
                
                $sth->execute(array(
                    ':forgot_pass_identity' => $uniqidStr,
                    ':email' => $data['email']
                ));
                
                $resetPassLink = 'https://localhost/mvcWeb/account/resetPassword?fp_code=' . $uniqidStr;

                //phpmailer
                    $mail = new PHPMailer;

                    $mail->isSMTP();                            // Set mailer to use SMTP
                    $mail->Host = 'smtp.gmail.com';             // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                     // Enable SMTP authentication
                    $mail->Username = 'jeonghyun.b@gmail.com';          // SMTP username
                    $mail->Password = 'jh108125'; // SMTP password
                    $mail->SMTPSecure = 'tls';                  // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 587;                          // TCP port to connect to

                    $mail->setFrom('jeonghyun.b@gmail.com', 'CodexWorld');
                    $mail->addReplyTo('jeonghyun.b@gmail.com', 'CodexWorld');
                    $mail->addAddress('jeonghyun.b@gmail.com');   // Add a recipient
                    //$mail->addCC('cc@example.com');
                    //$mail->addBCC('bcc@example.com');

                    $mail->isHTML(true);  // Set email format to HTML

                    $bodyContent = '<h3>Dear, ' . $userDetails['login'] . '</h3>';
                    $bodyContent .= '<br/>Recently a request was submitted to reset a password for your account. If this was a mistake, just ignore this email and nothing will happen.'
                            . '     <br/>To reset your password, visit the following link: <a href="' . $resetPassLink . '">' . $resetPassLink . '</a>
                                    <br/><br/>Regards,
                                    <br/>JH Blog';

                    $mail->Subject = 'Request from Localhost by JH Blog';
                    $mail->Body    = $bodyContent;

                    if(!$mail->send()) {
//                        echo 'Message could not be sent.';
//                        echo 'Mailer Error: ' . $mail->ErrorInfo;
                        $data = array(
                            'numberOfEmail' => 0
                        );

                        echo json_encode($data);
                    } else {
                        $data = array(
                            'numberOfEmail' => $count
                        );

                        echo json_encode($data);
                    }
                //
                
//                $to = $userDetails['email'];
//                $subject = "Password Update Request";
//                $mailContent = 'Dear ' . $userDetails['login'] . ', 
//                    <br/>Recently a request was submitted to reset a password for your account. If this was a mistake, just ignore this email and nothing will happen.
//                    <br/>To reset your password, visit the following link: <a href="' . $resetPassLink . '">' . $resetPassLink . '</a>
//                    <br/><br/>Regards,
//                    <br/>CodexWorld';
//                //set content-type header for sending HTML email
//                $headers = "MIME-Version: 1.0" . "\r\n";
//                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
//                //additional headers
//                $headers .= 'From: CodexWorld<jeonghyun.b@gmail.com>' . "\r\n";
//                //send email
//                mail($to, $subject, $mailContent, $headers);
                
                
                
            } else {
                $data = array(
                    'numberOfEmail' => 0
                );

                echo json_encode($data);
            }
        
    }

    function resetPassword() {
        $forgotPasswordCode = $_POST['forgotPasswordCode'];
        $newPassword = $_POST['new-password'];
        $newPasswordConfirm = $_POST['confirm-new-password'];
        
        if ($forgotPasswordCode == '') {
            $data = array(
                'numberOfLoginId' => 0
            );

            echo json_encode($data);
        } else {
        
            $sth = $this->db->prepare('SELECT * FROM user WHERE forgot_pass_identity = :forgotPasswordCode');
            $sth->execute(array(
                ':forgotPasswordCode' => $forgotPasswordCode
            ));

            $countingNumberOfLoginId = $sth->rowCount();

            if ($countingNumberOfLoginId > 0) {
                $row = $sth->fetch();
                $hash_pwd = $row['password'];


                    $encrypted_password = password_hash($newPassword, PASSWORD_DEFAULT);
                    $sth = $this->db->prepare('UPDATE user SET `password` = :newPassword WHERE `forgot_pass_identity` = :forgotPasswordCode AND password = :oldPassword');
                    $sth->execute(array(
                        ':newPassword' => $encrypted_password,
                        ':forgotPasswordCode' => $forgotPasswordCode,
                        ':oldPassword' => $hash_pwd
                    ));

                    $data = array(
                        'numberOfLoginId' => $countingNumberOfLoginId
                    );

                    echo json_encode($data);

            } else {
                $data = array(
                        'numberOfLoginId' => 0
                    );

                    echo json_encode($data);
            }
        }
    }
    

}
