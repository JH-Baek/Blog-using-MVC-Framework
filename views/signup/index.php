<div class="page">
    <div class="signupArea">
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
        <p class="title">Create your ID and Password<br>to enjoy our service.</p>
        <span id="availability"></span>
        <form id="signupForm" action="<?php echo URL; ?>signup/register" method="POST">
            <label>ID</label><br><input id="id" type="text" name="id" /><br>
            <br><label>Password</label><br><input id="password" type="password" name="password" /><br>
            <br><label>Confirm Password</label><br><input id="confirmPassword" type="password" name="confirm-password" /><br>
            <br><label>Email</label><br><input id="email" type="email" name="email" /><br>
            <input id="numberOfId" class="hidden"/>
            <input class="btn" value="REGISTER" type="submit" />
        </form>

    </div>
</div>