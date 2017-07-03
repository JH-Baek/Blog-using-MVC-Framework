<?php

class Login extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js =array('login/js/default.js');
        $this->view->css = array('login/css/style.css');
        
    }
    
    function index() {
        $this->view->title = 'Log In';
        $this->view->render('header');
        $this->view->render('login/index');
        $this->view->render('footer');
    }
    
   
    
    function run() {
        $this->model->run();
    }
    
    

}