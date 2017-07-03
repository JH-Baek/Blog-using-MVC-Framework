<div class="page">
    <div class="title-container">
        <h1 class="title">Manage your Account</h1>
        <p class="sub-title">Please click "Change your password" to reset your password.</p>
    </div>
        <div class="account">
            <div>ID: <?php echo $_SESSION['login'];?></div>
            <div>Password: <a href="<?php echo URL; ?>account/changepassword">Chnage your password</a></div>
        </div>    
    
</div>

