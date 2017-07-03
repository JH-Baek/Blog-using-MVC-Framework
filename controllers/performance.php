<?php

class Performance extends Controller {

    function __construct() {
        parent::__construct();
        Auth::handleLogin();
        $this->view->js =array('performance/js/stopwatch.js', 'performance/js/default.js', 'performance/js/performance.js');
        $this->view->css = array('performance/css/style.css');
        
    }
    
    function index() {
        $this->view->title = 'Task Management';
        $this->view->render('header');
        $this->view->render('performance/index');
        $this->view->render('footer');
        
    }
    
    function logout() {
        Session::destroy();
        header('location: ../login');
        exit;
    }
    
    function taskInsert() {
        $this->model->taskInsert();
    }
    
    function taskGetListings() {
        $this->model->taskGetListings();
    }
    
    function taskDeleteListing() {
        $this->model->taskDeleteListing();
        
    }

}