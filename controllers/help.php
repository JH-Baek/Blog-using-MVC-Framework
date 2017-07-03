<?php

class Help extends Controller {

    function __construct() {
        parent::__construct();
        //echo 'we are inside help<br />';
        
    }
    
    function index() {
        $this->view->title = 'Help';
        $this->view->render('header');
        $this->view->render('help/index');
        $this->view->render('footer');
    }
    
    public function other($arg = false) {
        
        
        
        $model = new Help_Model();
        $this->view->blah = $model->blah();
        
    }

}