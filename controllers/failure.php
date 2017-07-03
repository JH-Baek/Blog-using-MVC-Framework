<?php

class Failure extends Controller {

    function __construct() {
        parent::__construct();
        
        
    }
    
    function index() {
        $this->view->title = 'Error';
        $this->view->msg = 'This page does not exist!';
        $this->view->render('failure/header');
        $this->view->render('failure/index');
        $this->view->render('failure/footer');
    }

}