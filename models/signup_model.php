<?php

class Signup_Model extends Model {

    public function __construct() {
        parent::__construct();
        
    }
    
    public function getUser() {
            
            
        if (isset($_POST['userId'])) {
            
            $sth = $this->db->prepare("SELECT userid FROM user WHERE login = :id");

            $sth->execute(array(
                    ':id' => $_POST['userId']
                ));

            $count = $sth->rowCount();
            $data = array(
                'numberOfId' => $count
            );
            
            echo json_encode($data);
        }
        
        
        
    }
    
    public function register($data) {
        
        
        $this->db->insert('user', array(
           'login' => $data['login'],
           'password' => $data['password'],
           'email' => $data['email']
        ));
        
//            $sthForRegistering = $this->db->prepare("INSERT INTO user (login, password, email) VALUES (:id, :password, :email)");
//            
//            $userData = array(
//                ':id' => $data['login'],
//                ':password' => $data['password'],
//                ':email' => $data['email']
//                );
//            
//            $sthForRegistering->execute($userData);
            
            $data = array(
                'success' => 1
            );
            
            echo json_encode($data);
        
    }
}
