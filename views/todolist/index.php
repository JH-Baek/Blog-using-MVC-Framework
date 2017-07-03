
<div id="main-kanban">

    
    <div id="content-kanban">
        <div id="kanban-header">
            <h1>To-Do-List</h1>
        </div>

        <div>
            <button id="archivedListButton">Archive List</button>
        </div>

        <div id="board-container">

            <div class="kanban-border">
                <div class="kanban-board-heading">To Do</div>

                <div class="kanban-container">

                    <div id="archive-list" class="modal">

                        <!-- Modal content -->
                        <div id="archive-list-container" class="modal-content">
                            <span class="close">&times;</span>
                            <div id="archive-list-header"><p><strong>Archive List</strong></p></div>
                            <div id="archive-list-content">
                                <?php
                                foreach ($this->archiveListGetListings as $key => $value) {

                                    echo '<li id="archivedItem_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                            <span class="card-details">
                                                <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                <span class="list-group-item-heading"><strong>' . $value['listValue'] . '</strong> archived at <span class="archivedDate">' . $value['listUpdatedDate'] . '</span></span>
                                            </span>
                                            <span class="deleteArchivedTask" rel="' . $value['listId'] . '">
                                                <img class="editSymbol" src="' . URL . 'public/images/delete.png" alt="Generic placeholder image">
                                            </span>
                                        </li>';
                                }
                                ?>
                            </div>
                        </div>

                    </div>

                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">-->
                    <!--<div class="kanban-column">-->
                    <?php
                    foreach ($this->toDoListGetListings as $key => $value) {
                        echo '<div id="modal_' . $value['listId'] . '" class="modal">

                                            <!-- Modal content -->
                                            <div id="modalContent_' . $value['listId'] . '" class="modal-content">
                                                <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">
                                                    <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue">' . $value['listValue'] . '</textarea>
                                                    <input class="hidden" name="editedCardId" value="' . $value['listId'] . '" />
                                                </form>
                                                <span class="close"></span>
                                            </div>
                                            
                                            <div id="saveButton_' . $value['listId'] . '" class="saveButton"><button>Save</button></div>
                                            <div id="deleteButton_' . $value['listId'] . '" class="deleteButton"><button>Delete</button></div>
                                            <div id="archiveButton_' . $value['listId'] . '" class="archiveButton"><button>Archive</button></div>
                                        </div>';
                    }
                    ?>
                    <ul id="toDoCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0">

                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'To Do') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                
                                                                
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>

                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>-->
                    <!--                                </form>
                                                </div>
                    
                    
                                            </div>-->
                </div>


                <div class="kanban-board-footer"><span id="addingToDoCard" class="addingCard">Add a card</span></div>
            </div>

            <div class="kanban-border">
                <div class="kanban-board-heading">Important and Urgent</div>

                <div class="kanban-container">

                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">
                                                        <div class="kanban-column">-->


                    <ul id="importantAndUrgentCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0">

                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'Important and Urgent') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                
                                                                
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>

                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>
                                                    </form>
                                                </div>
                    
                    
                                            </div>-->
                </div>


                <div class="kanban-board-footer"><span id="addingImportantAndUrgentCard" class="addingCard">Add a card</span></div>
            </div>

            <div class="kanban-border">
                <div class="kanban-board-heading">Important and Non-urgent</div>

                <div class="kanban-container">

                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">
                                                        <div class="kanban-column">-->


                    <ul id="importantAndNonUrgentCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0">

                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'Important and Non-urgent') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                
                                                                
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>

                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>
                                                    </form>
                                                </div>
                    
                    
                                            </div>-->
                </div>


                <div class="kanban-board-footer"><span id="addingImportantAndNonUrgentCard" class="addingCard">Add a card</span></div>
            </div>

            <div class="kanban-border">
                <div class="kanban-board-heading">Unimportant and Urgent</div>

                <div class="kanban-container">

                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">
                                                        <div class="kanban-column">-->



                    <ul id="unimportantAndUrgentCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="292d361e-5ebe-e511-9be8-081196549bf0">

                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'Unimportant and Urgent') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                
                                                                
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>

                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>
                                                    </form>
                                                </div>
                    
                    
                                            </div>-->
                </div>


                <div class="kanban-board-footer"><span id="addingunImportantAndUrgentCard" class="addingCard">Add a card</span></div>
            </div>

            <div class="kanban-border">
                <div class="kanban-board-heading">Doing</div>

                <div class="kanban-container">
                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="15b82351-5ebe-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">
                                                        <div class="kanban-column">-->

                    <ul id="doingCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="15b82351-5ebe-e511-9be8-081196549bf0">

                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'Doing') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>

                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>
                                                    </form>
                                                </div>
                    
                    
                                            </div>-->

                </div>


                <div class="kanban-board-footer"><span id="addingDoingCard" class="addingCard">Add a card</span></div>
            </div>
            <div class="kanban-border">
                <div class="kanban-board-heading">Done</div>
                <div class="kanban-container">

                    <!--                        <div class="kanban-individual">
                                                <div class="kanban-list" data-list-id="9fc177e8-e5bf-e511-9be8-081196549bf0" data-board-id="3366691d-a6bd-e511-9be7-0021cc6e12a5">
                                                    <form action="/Kanban/SelectBoard" class="form-heading" method="post" novalidate="novalidate">
                                                        <div class="kanban-column">-->

                    <ul id="doneCardList" class="kanban-draggable list-unstyled ui-sortable" data-list-id="9fc177e8-e5bf-e511-9be8-081196549bf0">


                        <?php
                        foreach ($this->toDoListGetListings as $key => $value) {
                            if ($value['listType'] == 'Done') {
                                echo '<li id="item_' . $value['listId'] . '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">
                                                                <span class="card-details">
                                                                    <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>
                                                                    <span class="list-group-item-heading">' . $value['listValue'] . '</span>
                                                                </span>
                                                                <span class="editButton" rel="' . $value['listId'] . '">
                                                                    <img class="editSymbol" src="' . URL . 'public/images/edit.png" alt="Generic placeholder image">
                                                                </span>
                                                            </li>';
                            }
                        }
                        ?>
                    </ul>
                    <div class="clearfix"></div>


                    <div class="createCard text-align-center">
                        <i class="fa fa-lg fa-fw padding-10 fa-plus-circle"></i>
                    </div>
                    <!--                                    </div>
                                                    </form>
                                                </div>
                    
                    
                                            </div>-->
                </div>
                <div class="kanban-board-footer"><span id="addingDoneCard" class="addingCard">Add a card</span></div>
            </div>

            <div class="kanban-new-list">
                <span class="txt-color-darken kanban-heading-text cursor-pointer" id="createList"><i class="fa fa-lg fa-fw fa-plus-circle"></i></span>
            </div>

        </div>
    </div>
</div>
