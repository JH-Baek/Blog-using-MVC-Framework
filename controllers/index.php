<?php

class Index extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->js =array('index/js/default.js');
        $this->view->css = array('index/css/style.css');
    }
    
    function index() {
        $this->view->title = 'JH Blog';
        $this->view->render('index/header');
        $this->view->render('index/index');
        $this->view->render('index/footer');
    }

}