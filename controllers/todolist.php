<?php

class Todolist extends Controller {

    function __construct() {
        parent::__construct();
        Auth::handleLogin();
        $this->view->js = array('todolist/js/default.js');
        $this->view->css = array('todolist/css/style.css');
    }
    
    public function index() {
        $this->view->title = 'To Do List';
        $this->view->toDoListGetListings = $this->model->toDoListGetListings();
        $this->view->archiveListGetListings = $this->model->archiveListGetListings();
        $this->view->render('header');
        $this->view->render('todolist/index');
        $this->view->render('footer');
    }
    
    function logout() {
        Session::destroy();
        header('location: ../login');
        exit;
    }
    
    
    
//    function toDoListGetListings() {
//        $this->model->toDoListGetListings();
//    }
    
    function toDoListTaskInsert() {
        $this->model->toDoListTaskInsert();
    }
    
    function toDoListTaskValueUpdate() {
         $this->model->toDoListTaskValueUpdate();
    }
    
    function toDoListTaskDelete() {
        $this->model->toDoListTaskDelete();
    }
    
    function toDoListTaskArchive() {
        $this->model->toDoListTaskArchive();
    }
    
    function toDoListTaskOrderUpdate() {
        $this->model->toDoListTaskOrderUpdate();
    }
    
    function singleToDoListGetListings() {
        $this->model->singleToDoListGetListings();
    }
    
}