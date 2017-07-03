<?php

class Account extends Controller {

    function __construct() {
        parent::__construct();
        
        $this->view->js =array('account/js/default.js');
        $this->view->css = array('account/css/style.css');
    }
    
    function index() {
        Auth::handleLogin();
        $this->view->title = 'Manage Your Account';
        $this->view->render('header');
        $this->view->render('account/index');
        $this->view->render('footer');
    }
    
    function changepassword() {
        Auth::handleLogin();
        $this->view->title = 'Reset Your Account';
        $this->view->render('header');
        $this->view->render('account/changepassword');
        $this->view->render('footer');
    }
    
    function resetPassword() {
        $this->view->title = 'Reset Your Account';
        $this->view->render('header');
        $this->view->render('account/resetPassword');
        $this->view->render('footer');
    }
    
    function forgotPassword() {
        $this->view->title = 'Forgot Your Password';
        $this->view->render('header');
        $this->view->render('account/forgotPassword');
        $this->view->render('footer');
    }
    
    function logout() {
        Session::destroy();
        header('location: ../');
        exit;
    }
    
    function editPasswordFromHomePage() {
        
        
        $data = array();
        $data['login'] = $_POST['login'];
        $data['password'] = $_POST['password'];
        $data['newPassword'] = password_hash($_POST['new-password'], PASSWORD_DEFAULT);
       
        
        $this->model->editpassword($data);
    }
    
    function editPasswordFromEmail() {
        $this->model->resetPassword();
    }
    
    function getUser() {
        $this->model->getUser();
    }
    
    function sendLink() {
        $data = array();
        $data['email'] = $_POST['email'];
        $this->model->sendLink($data);
    }
    
    
}