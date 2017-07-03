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
            <h1 class="title">Forgot your password?</h1>
            <p class="sub-title">Please enter your email. We will send you a link to reset your password.</p>
        </div>
        <div class="account">
            <form id="forgotPasswordForm" action="<?php echo URL; ?>account/sendLink" method="POST">
                <label>E-mail</label><br><input id="email" type="email" name="email" /><br>
                <input id="send" class="btn" value="Send Link" type="submit" />
            </form>
        </div>    
    
</div>

