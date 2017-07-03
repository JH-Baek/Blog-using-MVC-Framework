<?php

class Dictionary extends Controller {
    
    

    function __construct() {
        parent::__construct();
        Auth::handleLogin();
        $this->view->js =array('dictionary/js/default.js');
        $this->view->css = array('dictionary/css/style.css');
    }
    
    function index($pageNumber = 1) {
        $this->view->title = 'Dictionary';
        $this->view->wordList = $this->model->wordListingForPagination($pageNumber);
        $this->view->partOfSpeechList = $this->model->partOfSpeechList();
        $this->view->definitionList = $this->model->definitionList();
        
        $this->view->numberOfWords = $this->model->numberOfWords();
        $this->view->paginationController = $this->model->paginationController($pageNumber);
        //$this->view->pageNumberForPagination = $this->model->pageNumberForPagination();
        $this->view->lastPageNumberCalculationForPagination = $this->model->lastPageNumberCalculationForPagination();
        $this->view->render('header');
        $this->view->render('dictionary/index');
        
        $this->view->render('footer');
        
    }
    
    function logout() {
        Session::destroy();
        header('location: ../');
        exit;
    }
    
    function search($arg = false, $pageNumber = 1) {
        $this->view->title = 'Dictionary';
        $this->view->wordList = $this->model->wordListingForPagination($pageNumber);
        $this->view->partOfSpeechList = $this->model->partOfSpeechList();
        $this->view->definitionList = $this->model->definitionList();
        
        $this->view->numberOfWords = $this->model->numberOfWords();
        $this->view->paginationController = $this->model->paginationController($pageNumber);
        //$this->view->pageNumberForPagination = $this->model->pageNumberForPagination();
        $this->view->lastPageNumberCalculationForPagination = $this->model->lastPageNumberCalculationForPagination();
        $this->view->search = $this->model->search($arg);
        $this->view->render('header');
        $this->view->render('dictionary/index');
        $this->view->render('footer');
        
        // for url problem see youtube video part 1(8:50)
        // change $arg as a function(?)
    }
    
    
    
    
    function searchDefinition() {
        $data = array();
	$data['word'] = $_GET['dictionary'];
        if(!empty($_GET['save'])) {
            $this->wordSaving($data);
        }
        
        $wordForDefinition = strtolower($_GET['dictionary']);
        
        header('location: search/'.$wordForDefinition);
    }
    
    function wordSaving($data) {
        
        
        
        $this->model->wordSaving($data);
        
    }
    
    function page($pageNumber = 1) {
        $this->view->title = 'Dictionary';
        $this->view->wordList = $this->model->wordListingForPagination($pageNumber);
        $this->view->partOfSpeechList = $this->model->partOfSpeechList();
        $this->view->definitionList = $this->model->definitionList();
        
        $this->view->numberOfWords = $this->model->numberOfWords();
        $this->view->paginationController = $this->model->paginationController($pageNumber);
        //$this->view->pageNumberForPagination = $this->model->pageNumberForPagination();
        $this->view->lastPageNumberCalculationForPagination = $this->model->lastPageNumberCalculationForPagination();
        $this->view->render('header');
        $this->view->render('dictionary/index');
        
        $this->view->render('footer');
    }
    

}