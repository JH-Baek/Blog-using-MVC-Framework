
<div class="mastfoot">
    <div class="inner">
        <p>Cover template for <a href="http://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
    </div>
</div>

<!-- jQuery -->
<script src="<?php echo URL; ?>public/js/jquery.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="<?php echo URL; ?>public/js/bootstrap.min.js"></script>

<!-- Scrolling Nav JavaScript -->
<script src="<?php echo URL; ?>public/js/jquery.easing.min.js"></script>
<script src="<?php echo URL; ?>public/js/scrolling-nav.js"></script>

<!-- JavaScript -->
<?php
if (isset($this->js)) {
    foreach ($this->js as $js) {
        echo '<script type="text/javascript" src="' . URL . 'views/' . $js . '"></script>';
    }
}
?>
</body>

</html>