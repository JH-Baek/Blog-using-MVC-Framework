<?php

class Signup extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js =array('signup/js/default.js');
        $this->view->css = array('signup/css/style.css');
        
    }
    
    
    function index() {
        $this->view->title = 'Sign Up';
        $this->view->render('header');
        $this->view->render('signup/index');
        $this->view->render('footer');
    }
    
    function register() {
        $data = array();
        $data['login'] = $_POST['id'];
        $data['email'] = $_POST['email'];
        $data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
        
        $this->model->register($data);
        
        
        
        
    }
    
    function getUser() {
        $this->model->getUser();
    }
}