<?php

class Login_Model extends Model {

    public function __construct() {
        parent::__construct();
        
    }
    
    public function run() {
        $sth = $this->db->prepare("SELECT * FROM user WHERE login = :login");
        $sth->execute(array(
            ':login' => $_POST['login']
        ));
        
        //$data = $sth->fetchAll();
        $countingNumberOfLoginId = $sth->rowCount();
        if ($countingNumberOfLoginId > 0) {
            $row = $sth->fetch();
            
            $hash_pwd = $row['password'];
        
            $hash = password_verify($_POST['password'], $hash_pwd);

            if ($hash == 0) {
                // show an error
                $numberOfLoginId = array(
                    'numberOfLoginId' => $hash
                );

                echo json_encode($numberOfLoginId);
            } else {

                $sth = $this->db->prepare("SELECT userid, login FROM user WHERE"
                       . " login = :login AND password = :password");
                $sth->execute(array(
                    ':login' => $_POST['login'],
                    ':password' => $hash_pwd
                ));
                
                $data = $sth->fetch();

                $count = $sth->rowCount();
                if($count > 0) {
                    //login
                    Session::init();
                    Session::set('loggedIn', true);
                    Session::set('login', $data['login']);
                    Session::set('userid', $data['userid']);
                    $numberOfLoginId = array(
                        'numberOfLoginId' => $count
                    );

                    echo json_encode($numberOfLoginId);
                } else {
                    $numberOfLoginId = array(
                        'numberOfLoginId' => $count
                    );

                    echo json_encode($numberOfLoginId);
                }
            }
        } else {
            $numberOfLoginId = array(
                'numberOfLoginId' => $countingNumberOfLoginId
            );
            
            echo json_encode($numberOfLoginId);
        }
        
        
        
    }

}
