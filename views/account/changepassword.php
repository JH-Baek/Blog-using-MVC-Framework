<div class="page">
    
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
        <div class="title-container">
            <h1 class="title">Manage your Account</h1>
            <p class="sub-title">Please fill out all the fields to reset your password.</p>
        </div>
        <div class="account">
            <form id="changePasswordForm" action="<?php echo URL; ?>account/editPasswordFromHomePage" method="POST">
                <label>Password</label><br><input id="password" type="password" name="password" /><br>
                <br><label>New Password</label><br><input id="new-password" type="password" name="new-password" /><br>
                <br><label>Confirm New Password</label><br><input id="confirm-new-password" type="password" name="confirm-new-password" /><br>
                <input id="login" class="hidden" name="login" value="<?php echo $_SESSION['login'];?>" />
                
                <input id="reset" class="btn" value="RESET" type="submit" />
            </form>
        </div>    
    
</div>

