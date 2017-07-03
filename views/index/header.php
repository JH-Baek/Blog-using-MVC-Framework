<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?=(isset($this->title)) ? $this->title : 'JH Blog'; ?></title>

    <link rel="icon" href="<?php echo URL; ?>public/images/jh.png">
    
    <!-- Jquery -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- Bootstrap Core CSS -->
    <link href="<?php echo URL; ?>public/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<?php echo URL; ?>public/css/scrolling-nav.css" rel="stylesheet">
    <?php
    if (isset($this->css)) {
        foreach ($this->css as $css) {
            echo '<link href="' . URL . 'views/' . $css . '" rel="stylesheet">';
        }
    }
    ?>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
</head>

<!-- The #page-top ID is part of the scrolling feature - the data-spy and data-target are part of the built-in Bootstrap scrollspy function -->

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

    <?php Session::init(); ?>
    
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">JH Blog</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                    <li class="hidden">
                        <a class="page-scroll" href="#page-top"></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#about">Education</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#services">Skills</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Experience</a>
                    </li>
                    <?php if(Session::get('loggedIn') == true): ?>
                    <li>
                        <a class="item" href="<?php echo URL; ?>todolist">To-Do-List</a>
                    </li>
                    <li>
                        <a class="item" href="<?php echo URL; ?>performance">Task</a>
                    </li>
                    <li>
                        <a class="item" href="<?php echo URL; ?>dictionary">Dictionary</a>
                    </li>
                    <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Hi, <?php echo $_SESSION['login'];?><span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a class="page-scroll" href="<?php echo URL; ?>">Home</a></li>
                            <li><a class="page-scroll" href="<?php echo URL; ?>account">Your Account</a></li>
                            <li><a class="" href="<?php echo URL; ?>dictionary/logout">Logout</a></li>
                        </ul>
                    </li>
                    <li class="hidden">
                        <a class="" href="<?php echo URL; ?>signup">Signup</a>
                    </li>
                    <?php else: ?>
                    <li>
                        <a class="item" href="<?php echo URL; ?>login">Login</a>
                    </li>
                    <li>
                        <a class="item" href="<?php echo URL; ?>signup">Signup</a>
                    </li>
                    <?php endif; ?>
                    
                    
                    
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>