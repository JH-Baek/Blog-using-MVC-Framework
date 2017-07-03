<div class="page">
    <div class="loginArea">
        
        <div id="popupBox" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Warning</h2>
                </div>
                <div class="modal-body">

                    <div class="explanationArea">

                    </div>

                </div>

            </div>

        </div>
        
        <img class="logoImage" src="<?php echo URL; ?>public/images/jhLogo.png" alt="Generic placeholder image">
        
        
        <form class="loginForm" action="<?php echo URL; ?>login/run" method="POST">
            <label>ID</label><br><input type="text" name="login" autofocus /><br />
            <br><label>Password</label><br><input type="password" name="password" /><br />
            <input class="btn" value="LOG IN" type="submit" />
        </form>
        <p class="horizontalDivider">or</p>
        <div class="signupArea">
            <a class="btn" href="<?php echo URL; ?>signup">SIGN UP</a>
        </div>
        <div class="forgotPasswordArea">
            <a class="forgotPassword" href="<?php echo URL; ?>account/forgotPassword">Forgot your password?</a>
        </div>
    </div>
</div>

