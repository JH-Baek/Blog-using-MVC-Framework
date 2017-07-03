<div class="row">
    <div id="popupBox" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Warning</h2>
            </div>
            <div class="modal-body">
                
                <div class="explanationArea">
                    <p>Fill the Task Name or Task Type, please.</p>
                </div>

            </div>

        </div>

    </div>
    
    <div class="col-lg-12" id="measurementAreaWrap">
        <div class="title">
            <h1>Task Management</h1>
        </div>
        
        <div class="measurementArea" id="taskNameAndTypeArea">
            <h1>Performance Measurement</h1><br /><br />
            <div class="form">
                <form id="performanceInsert" action="<?php echo URL; ?>performance/taskInsert/" method="POST">
                    <label>Name</label><br><input id="taskName" class="text-box" type="text" name="task" autofocus /><br /><br />
                    <label >Type</label><br><input id="taskType" class="text-box" type="text" name="type" /><br /><br />
                    <label>Focus Level</label><span class="colorVisualiser"></span><input type="text" name="focusLevel" id="radioValue" value="Great" readonly/><br />

                    <input type="hidden" class="text-box" name="date" value="<?php date_default_timezone_set('NZ'); echo date('Y-m-d'); ?>" />
                </form>
                <div class="btn-group" data-toggle="buttons">
                    <label id="greatBtn" class="btn btn-primary active">Great
                        <input class="radioButton" type="radio" name="options" id="option1" autocomplete="off" checked />
                    </label>
                    <label id="satisfactoryBtn" class="btn btn-primary">Satisfactory
                        <input class="radioButton" type="radio" name="options" id="option2" autocomplete="off" />
                    </label>
                    <label id="badBtn" class="btn btn-primary">Poor
                        <input class="radioButton" type="radio" name="options" id="option3" autocomplete="off" />
                    </label>
                    </label>
                </div>
            </div>
        </div>

        <div class="measurementArea" id="stopwatchArea">
            <h1>Stopwatch</h1>


            <h2 id="timer">00 : 00 . 000</h2>
            <button class="sw-btn" id="toggle">Start</button>
            <button class="sw-btn" id="reset">Reset</button>
        </div>
    </div>
    
    <div class="col-lg-12" id="taskSubmitButton" >
        <form id="performanceForm" action="<?php echo URL; ?>performance/taskInsert/" method="POST">
            
            <input class="sw-btn" value="Submit" type="submit" />
        </form>
    </div>
    
    <div class="col-lg-12" id="wrap">
        <div class="listingByDate">
            <div id="loadingImage" style="display: none">
                <img id="loader" src="<?php echo URL; ?>public/images/preloader.gif" />
            </div>
        </div>
    </div>
    
    <div class="col-lg-12">
        <div class="buttonForTaskListing">
            
            <button id="show" class="btn">Load More</button>
            
        </div>
    </div>
</div>