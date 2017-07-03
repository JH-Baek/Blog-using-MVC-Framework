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
            <h1 class="title">Manage Your Account</h1>
            <p class="sub-title">Please fill out all the fields to renew your password.</p>
        </div>
        <div class="account">
            <form id="resetPasswordForm" action="<?php echo URL; ?>account/editPasswordFromEmail" method="POST">
                
                <br><label>New Password</label><br><input id="new-password" type="password" name="new-password" /><br>
                <br><label>Confirm New Password</label><br><input id="confirm-new-password" type="password" name="confirm-new-password" /><br>
                <input id="forgotPasswordCode" class="hidden" name="forgotPasswordCode" value="<?php echo $_REQUEST['fp_code'];?>" readonly/>
                
                <input id="renew" class="btn" value="RENEW" type="submit" />
            </form>
        </div>    
    
</div>

