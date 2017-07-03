$(function () {

    


    $(".addingCard").click(function () {

        var kanbanName = $(this).parent().siblings(':first-child').text();


        if (kanbanName == 'To Do') {
//            console.log(cardWidth);
            $('#toDoCardList').append('<form id="to-do-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="to-do-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="To Do"/>\n\
                                        </form>');

            $('#to-do-card-textbox').focus();

            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="to-do-submit-button" class="submitButton">Add</span><a id="to-do-cancel-button" class="cancelButton">X</a>\n\
                                    </div>');

            $("#to-do-cancel-button").on('click', function () {
                $('#to-do-form').remove();
                $('#addingToDoCard').css('display', 'inline-block');
                $('#addingToDoCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#to-do-submit-button").on("click", function () {
                if ($('#to-do-card-textbox').val().length > 0) {
                    var url = $('#to-do-form').attr('action');
                    var data = $('#to-do-form').serialize();

                    $.post(url, data, function (addedCard) {
                        var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';
                        $('#toDoCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });

                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            deleteButton.style.top = cardPosition.top + "px";
                            deleteButton.style.left = cardPosition.left + 300 + "px";
                            archiveButton.style.top = cardPosition.top + 35 + "px";
                            archiveButton.style.left = cardPosition.left + 300 + "px";


                            modal.style.display = "block";
                            editTextbox.select();

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });
                                }, 'json');

                            });
                        });


                    }, 'json');

                    $('#to-do-form').remove();
                    $('#addingToDoCard').css('display', 'inline-block');
                    $('#addingToDoCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });

        } else if (kanbanName == 'Important and Urgent') {

            $('#importantAndUrgentCardList').append('<form id="important-and-urgent-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="important-and-urgent-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="Important and Urgent"/>\n\
                                        </form>');
            $('#important-and-urgent-card-textbox').focus();


            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="important-and-urgent-submit-button" class="submitButton">Add</span><a id="important-and-urgent-cancel-button" class="cancelButton">X</a>\n\
                                    </div>');

            $("#important-and-urgent-cancel-button").on('click', function () {
                var kanbanBoardFooter = $(this).parent().parent().parent();
                var addingCard = $(this).parent().parent();

                $('#important-and-urgent-form').remove();
                $('#addingImportantAndUrgentCard').css('display', 'inline-block');
                $('#addingImportantAndUrgentCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#important-and-urgent-submit-button").on("click", function () {
                if ($('#important-and-urgent-card-textbox').val().length > 0) {
                    var url = $('#important-and-urgent-form').attr('action');
                    var data = $('#important-and-urgent-form').serialize();

                    $.post(url, data, function (addedCard) {
                        var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';
                        $('#importantAndUrgentCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });

                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            deleteButton.style.top = cardPosition.top + "px";
                            deleteButton.style.left = cardPosition.left + 300 + "px";
                            archiveButton.style.top = cardPosition.top + 35 + "px";
                            archiveButton.style.left = cardPosition.left + 300 + "px";


                            modal.style.display = "block";
                            editTextbox.select();


                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });
                                }, 'json');

                            });
                        });
                    }, 'json');

                    $('#important-and-urgent-form').remove();
                    $('#addingImportantAndUrgentCard').css('display', 'inline-block');
                    $('#addingImportantAndUrgentCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });

        } else if (kanbanName == 'Important and Non-urgent') {
            $('#importantAndNonUrgentCardList').append('<form id="important-and-non-urgent-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="important-and-non-urgent-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="Important and Non-urgent"/>\n\
                                        </form>');
            $('#important-and-non-urgent-card-textbox').focus();

            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="important-and-non-urgent-submit-button" class="submitButton">Add</span><a id="important-and-non-urgent-cancel-button" class="cancelButton">X</a>\n\
                                    </div>');

            $("#important-and-non-urgent-cancel-button").on('click', function () {
                var kanbanBoardFooter = $(this).parent().parent().parent();
                var addingCard = $(this).parent().parent();

                $('#important-and-non-urgent-form').remove();
                $('#addingImportantAndNonUrgentCard').css('display', 'inline-block');
                $('#addingImportantAndNonUrgentCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#important-and-non-urgent-submit-button").on("click", function () {
                if ($('#important-and-non-urgent-card-textbox').val().length > 0) {
                    var url = $('#important-and-non-urgent-form').attr('action');
                    var data = $('#important-and-non-urgent-form').serialize();

                    $.post(url, data, function (addedCard) {
                        var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';
                        $('#importantAndNonUrgentCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });
                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            deleteButton.style.top = cardPosition.top + "px";
                            deleteButton.style.left = cardPosition.left + 300 + "px";
                            archiveButton.style.top = cardPosition.top + 35 + "px";
                            archiveButton.style.left = cardPosition.left + 300 + "px";


                            modal.style.display = "block";
                            editTextbox.select();


                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });
                                }, 'json');

                            });
                        });
                    }, 'json');

                    $('#important-and-non-urgent-form').remove();
                    $('#addingImportantAndNonUrgentCard').css('display', 'inline-block');
                    $('#addingImportantAndNonUrgentCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });

        } else if (kanbanName == 'Unimportant and Urgent') {
            $('#unimportantAndUrgentCardList').append('<form id="unimportant-and-non-urgent-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="unimportant-and-non-urgent-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="Unimportant and Urgent"/>\n\
                                        </form>');
            $('#unimportant-and-non-urgent-card-textbox').focus();

            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="unimportant-and-non-urgent-submit-button" class="submitButton">Add</span><a id="unimportant-and-non-urgent-cancel-button" class="cancelButton">X</a>\n\
                                    </div>');

            $("#unimportant-and-non-urgent-cancel-button").on('click', function () {
                var kanbanBoardFooter = $(this).parent().parent().parent();
                var addingCard = $(this).parent().parent();

                $('#unimportant-and-non-urgent-form').remove();
                $('#addingunImportantAndUrgentCard').css('display', 'inline-block');
                $('#addingunImportantAndUrgentCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#unimportant-and-non-urgent-submit-button").on("click", function () {
                if ($('#unimportant-and-non-urgent-card-textbox').val().length > 0) {
                    var url = $('#unimportant-and-non-urgent-form').attr('action');
                    var data = $('#unimportant-and-non-urgent-form').serialize();

                    $.post(url, data, function (addedCard) {
                        var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';
                        $('#unimportantAndUrgentCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });

                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            deleteButton.style.top = cardPosition.top + "px";
                            deleteButton.style.left = cardPosition.left + 300 + "px";
                            archiveButton.style.top = cardPosition.top + 35 + "px";
                            archiveButton.style.left = cardPosition.left + 300 + "px";


                            modal.style.display = "block";
                            editTextbox.select();


                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });
                                }, 'json');

                            });
                        });
                    }, 'json');

                    $('#unimportant-and-non-urgent-form').remove();
                    $('#addingunImportantAndUrgentCard').css('display', 'inline-block');
                    $('#addingunImportantAndUrgentCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });

        } else if (kanbanName == 'Doing') {
            $('#doingCardList').append('<form id="doing-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="doing-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="Doing"/>\n\
                                        </form>');
            $('#doing-card-textbox').focus();

            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="doing-submit-button" class="submitButton">Add</span><a id="doing-cancel-button" class="cancelButton">X</a>\n\
                                    </div>');

            $("#doing-cancel-button").on('click', function () {
                var kanbanBoardFooter = $(this).parent().parent().parent();
                var addingCard = $(this).parent().parent();

                $('#doing-form').remove();
                $('#addingDoingCard').css('display', 'inline-block');
                $('#addingDoingCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#doing-submit-button").on("click", function () {
                if ($('#doing-card-textbox').val().length > 0) {
                    var url = $('#doing-form').attr('action');
                    var data = $('#doing-form').serialize();

                    $.post(url, data, function (addedCard) {
                        var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';
                        $('#doingCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });

                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            deleteButton.style.top = cardPosition.top + "px";
                            deleteButton.style.left = cardPosition.left + 300 + "px";
                            archiveButton.style.top = cardPosition.top + 35 + "px";
                            archiveButton.style.left = cardPosition.left + 300 + "px";


                            modal.style.display = "block";
                            editTextbox.select();



                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });
                                }, 'json');

                            });
                        });
                    }, 'json');

                    $('#doing-form').remove();
                    $('#addingDoingCard').css('display', 'inline-block');
                    $('#addingDoingCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });

        } else if (kanbanName == 'Done') {
            $('#doneCardList').append('<form id="done-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskInsert/">\n\
                                                <textarea id="done-card-textbox" class="newCardTextBox" name="cardValue" cols="30" rows="4"></textarea>\n\
                                                <input class="hidden" name="cardType" value="Done"/>\n\
                                        </form>');
            $('#done-card-textbox').focus();

            $(this).css('display', 'none');
            $(this).parent().css('padding', '5px 0px');

            $(this).parent().append('<div class="newCardOption">\n\
                                        <span id="done-submit-button" class="submitButton">Add</span><a id="done-cancel-button" class="cancelButton">&times;</a>\n\
                                    </div>');

            $("#done-cancel-button").on('click', function () {
                $('#done-form').remove();
                $('#addingDoneCard').css('display', 'inline-block');
                $('#addingDoneCard').parent().css('padding', '0px');
                $(this).parent().remove();
            });

            $("#done-submit-button").on("click", function () {
                if ($('#done-card-textbox').val().length > 0) {
                    var url = $('#done-form').attr('action');
                    var data = $('#done-form').serialize();
                    var imageUrl = 'https://localhost/mvcWeb/public/images/edit.png';

                    $.post(url, data, function (addedCard) {


                        $('#doneCardList').append('<li id="item_' + addedCard.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding">\n\
                                                        <span class="card-details">\n\
                                                            <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                            <span class="list-group-item-heading">' + addedCard.cardValue + '</span>\n\
                                                        </span>\n\
                                                        <span class="editButton" rel="' + addedCard.cardId + '">\n\
                                                            <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                        </span>\n\
                                                    </li>');

                        $('.list-group-item')
                                .mouseover(function () {
                                    $(this).children('.editButton').css('opacity', '0.5');
                                })
                                .mouseout(function () {
                                    $(this).children('.editButton').css('opacity', '0');
                                });

                        $('.editButton')
                                .mouseover(function () {
                                    $(this).css('background-color', 'gray');
                                })
                                .mouseout(function () {
                                    $(this).css('background-color', '#e2e2e2');

                                });

                        $('.editButton').on('click', function () {

                            var editItem = $(this);
                            var cardName = editItem.parent().parent().attr('id');
                            var editItemId = editItem.attr('rel');
                            var cardPosition = $(this).parent().offset();
                            var cardWidth = $(this).parent().outerWidth();
                            console.log(cardWidth);
                            //alert("Top: " + cardPosition.top + " Left: " + cardPosition.left);

                            $('.kanban-container').append('<div id="modal_' + addedCard.cardId + '" class="modal">\n\
                                                                <div id="modalContent_' + addedCard.cardId + '" class="modal-content">\n\
                                                                    <form id="edit-form" method="POST" action="https://localhost/mvcWeb/todolist/toDoListTaskValueUpdate/">\n\
                                                                        <textarea id="edit-textbox" class="newCardTextBox" name="editedCardValue" type="text">' + addedCard.cardValue + '</textarea>\n\
                                                                        <input class="hidden" name="editedCardId" value="' + addedCard.cardId + '" />\n\
                                                                    </form>\n\
                                                                    <span class="close"></span>\n\
                                                                </div>\n\
                                                                <div id="saveButton_' + addedCard.cardId + '" class="saveButton">\n\
                                                                    <button>Save</button>\n\
                                                                </div>\n\
                                                                <div id="deleteButton_' + addedCard.cardId + '" class="deleteButton">\n\
                                                                    <button>Delete</button>\n\
                                                                </div>\n\
                                                                <div id="archiveButton_' + addedCard.cardId + '" class="archiveButton">\n\
                                                                    <button>Archive</button>\n\
                                                                </div>\n\
                                                            </div>');

                            // Get the modal
                            var modal = document.getElementById('modal_' + editItemId);
                            var modalContent = $('#modalContent_' + editItemId);
                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];
                            var saveButton = document.getElementById("saveButton_" + editItemId);
                            var deleteButton = document.getElementById("deleteButton_" + editItemId);
                            var archiveButton = document.getElementById("archiveButton_" + editItemId);
                            var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


                            modalContent.css('top', cardPosition.top + 'px');
                            modalContent.css('left', cardPosition.left + 'px');
                            modalContent.css('width', cardWidth + 'px');

                            saveButton.style.top = cardPosition.top + 130 + "px";
                            saveButton.style.left = cardPosition.left + "px";
                            
                            if (cardName == 'doneCardList') {
            
                                deleteButton.style.top = cardPosition.top + "px";
                                deleteButton.style.left = cardPosition.left - 75 + "px";

                                archiveButton.style.top = cardPosition.top + 35 + "px";
                                archiveButton.style.left = cardPosition.left - 81 + "px";
                            } else {
                                deleteButton.style.top = cardPosition.top + "px";
                                deleteButton.style.left = cardPosition.left + 300 + "px";

                                archiveButton.style.top = cardPosition.top + 35 + "px";
                                archiveButton.style.left = cardPosition.left + 300 + "px";
                            }


                            modal.style.display = "block";
                            editTextbox.select();



                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                            $('.saveButton').on('click', function () {
                                
                                var savingUrl = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var savingData = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post(savingUrl, savingData, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.deleteButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    modal.style.display = "none";
                                }, 'json');

                            });

                            $('.archiveButton').on('click', function () {

                                var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


                                $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
                                    var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
                                    var modal = document.getElementById('modal_' + o.cardId);
                                    $('#item_' + o.cardId).remove();
                                    $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
                                    modal.style.display = "none";
                                    
                                    $('.list-group-item')
                                        .mouseover(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                                        })
                                        .mouseout(function () {
                                            $(this).children('.deleteArchivedTask').css('opacity', '0');
                                        });

                                    $('.deleteArchivedTask')
                                        .mouseover(function () {
                                            $(this).css('background-color', 'gray');
                                        })
                                        .mouseout(function () {
                                            $(this).css('background-color', '#cccccc');

                                        });
                                        
                                    $('.deleteArchivedTask').on('click', function () {

                                        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
                                        var dataId = $(this).attr('rel');


                                        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                                            var modal = document.getElementById('modal_' + o.cardId);
                                            $('#archivedItem_' + o.cardId).remove();

                                        }, 'json');

                                    });    
                                }, 'json');

                            });
                        });
                    }, 'json');

                    $('#done-form').remove();
                    $('#addingDoneCard').css('display', 'inline-block');
                    $('#addingDoneCard').parent().css('padding', '0px');
                    $(this).parent().remove();
                } else {
                    return false;
                }
            });
        }
    });

    $(".kanban-draggable").sortable({
        cancel: "form",
        tolerance: "pointer",
        sort: function (e, ui) {
            var itemPosition = ui.item.offset();
            var itemWidth = ui.item.outerWidth();
            var itemPositionRight = itemPosition.left + itemWidth;
            var widthOfScreen = $('#content-kanban').width();
            var scrollLeftPosition = $('#content-kanban').scrollLeft();
            var mousePosition = e.clientX;
            ui.helper.css('position', 'absolute');
//            $(this).sortable("option", "cursorAt", {
//                left: Math.floor(ui.helper.width() / 2),
//                top: Math.floor(ui.helper.height() / 2)
//              }); 

            if (itemPositionRight > widthOfScreen - 75) {
                $("#content-kanban").animate({
                    scrollLeft: '+=10'
                }, 1);
                $(this).sortable("refreshPositions");

                //move selected list to the right
            } else if (itemPosition.left < 75) {
                $("#content-kanban").animate({
                    scrollLeft: '-=10'
                }, 1);
                $(this).sortable("refreshPositions");

            }

            console.log(itemPosition.left);
            console.log(itemWidth);
            console.log(widthOfScreen)
        },
        scrollSensitivity: 50,
        scroll: true,
        helper: 'original',
        connectWith: ".ui-sortable",
        over: function (event, ui) {

            ui.item.data('sortableItem').scrollParent = ui.placeholder.parent().parent();
            ui.item.data('sortableItem').overflowOffset = ui.placeholder.parent().parent().offset();

        },
        update: function () {
            $.ajax(
                    {
                        type: "POST",
                        url: "https://localhost/mvcWeb/todolist/toDoListTaskOrderUpdate/",
                        data:
                                {
                                    toDoList: $("#toDoCardList").sortable('serialize'),
                                    importantAndUrgentList: $("#importantAndUrgentCardList").sortable('serialize'),
                                    importantAndNonUrgentList: $("#importantAndNonUrgentCardList").sortable('serialize'),
                                    unimportantAndUrgentList: $("#unimportantAndUrgentCardList").sortable('serialize'),
                                    doingList: $("#doingCardList").sortable('serialize'),
                                    doneList: $("#doneCardList").sortable('serialize')
                                },
                        success: function (html)
                        {
//                            alert($("#toDoCardList").sortable('serialize'));
//                            alert($("#doingCardList").sortable('serialize'));
                        }
                    });
        }


    }).disableSelection();



    $('.list-group-item')
            .mouseover(function () {
                $(this).children('.editButton').css('opacity', '0.5');
            })
            .mouseout(function () {
                $(this).children('.editButton').css('opacity', '0');
            });

    $('.list-group-item')
            .mouseover(function () {
                $(this).children('.deleteArchivedTask').css('opacity', '0.5');
            })
            .mouseout(function () {
                $(this).children('.deleteArchivedTask').css('opacity', '0');
            });

    $('.editButton')
            .mouseover(function () {
                $(this).css('background-color', 'gray');
            })
            .mouseout(function () {
                $(this).css('background-color', '#e2e2e2');

            });
            
    $('.deleteArchivedTask')
            .mouseover(function () {
                $(this).css('background-color', 'gray');
            })
            .mouseout(function () {
                $(this).css('background-color', '#cccccc');

            });

    $('.editButton').on('click', function () {

        var editItem = $(this);
        var cardName = editItem.parent().parent().attr('id');
        
        var editItemId = editItem.attr('rel');
        var cardPosition = $(this).parent().offset();
        
        var cardWidth = $(this).parent().outerWidth();

        var modal = document.getElementById('modal_' + editItemId);
        var modalContent = $('#modalContent_' + editItemId);
        
        var saveButton = document.getElementById("saveButton_" + editItemId);
        var deleteButton = document.getElementById("deleteButton_" + editItemId);
        var archiveButton = document.getElementById("archiveButton_" + editItemId);
        var editTextbox = modalContent.children('#edit-form').children('#edit-textbox');


        modalContent.css('top', cardPosition.top + 'px');
        modalContent.css('left', cardPosition.left + 'px');
        modalContent.css('width', cardWidth + 'px');

        saveButton.style.top = cardPosition.top + 130 + "px";
        saveButton.style.left = cardPosition.left + "px";
        
        if (cardName == 'doneCardList') {
            
            deleteButton.style.top = cardPosition.top + "px";
            deleteButton.style.left = cardPosition.left - 75 + "px";

            archiveButton.style.top = cardPosition.top + 35 + "px";
            archiveButton.style.left = cardPosition.left - 81 + "px";
        } else {
            deleteButton.style.top = cardPosition.top + "px";
            deleteButton.style.left = cardPosition.left + 300 + "px";

            archiveButton.style.top = cardPosition.top + 35 + "px";
            archiveButton.style.left = cardPosition.left + 300 + "px";
        }
        

        modal.style.display = "block";
        editTextbox.select();

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });

    $('.saveButton').on('click', function () {
        var url = $(this).siblings('.modal-content').children('#edit-form').attr('action');
        var data = $(this).siblings('.modal-content').children('#edit-form').serialize();

        $.post(url, data, function (o) {
            var modal = document.getElementById('modal_' + o.cardId);
            $('#item_' + o.cardId).children('.card-details').children('.list-group-item-heading').html(o.cardValue);
            modal.style.display = "none";
        }, 'json');

    });

    $('.deleteButton').on('click', function () {
        var data = $(this).siblings('.modal-content').children('#edit-form').serialize();

        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', data, function (o) {
            var modal = document.getElementById('modal_' + o.cardId);
            
            $('#item_' + o.cardId).remove();
            modal.style.display = "none";
        }, 'json');

    });

    $('.archiveButton').on('click', function () {
        var data = $(this).siblings('.modal-content').children('#edit-form').serialize();


        $.post('https://localhost/mvcWeb/todolist/toDoListTaskArchive', data, function (o) {
            var imageUrl = 'https://localhost/mvcWeb/public/images/delete.png';
            var modal = document.getElementById('modal_' + o.cardId);
            $('#item_' + o.cardId).remove();
            $('#archive-list-content').prepend('<li id="archivedItem_' + o.cardId + '" class="list-group-item cursor-pointer kanban-card no-padding" data-card-id="16360" data-order="0">\n\
                                                    <span class="card-details">\n\
                                                        <i class="fa fa-fw fa-arrows ui-sortable-handle"></i>\n\
                                                        <span class="list-group-item-heading"><strong>' + o.cardValue + '</strong> archived at <span class="archivedDate">' + o.cardArchivedDate + '</span></span>\n\
                                                    </span>\n\
                                                    <span class="deleteArchivedTask" rel="' + o.cardId + '">\n\
                                                        <img class="editSymbol" src="' + imageUrl + '" alt="Generic placeholder image">\n\
                                                    </span>\n\
                                                </li>');
            modal.style.display = "none";
            
            $('.list-group-item')
                .mouseover(function () {
                    $(this).children('.deleteArchivedTask').css('opacity', '0.5');
                })
                .mouseout(function () {
                    $(this).children('.deleteArchivedTask').css('opacity', '0');
                });
        
            $('.deleteArchivedTask')
                .mouseover(function () {
                    $(this).css('background-color', 'gray');
                })
                .mouseout(function () {
                    $(this).css('background-color', '#cccccc');
                });
                
            $('.deleteArchivedTask').on('click', function () {
                var dataId = $(this).attr('rel');
                                
                $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
                    $('#archivedItem_' + o.cardId).remove();
                }, 'json');
            });
        }, 'json');
    });

    $('#archivedListButton').on('click', function () {
        var modal = document.getElementById('archive-list');
        
        modal.style.display = "block";

        $('.close').click(function () {
            modal.style.display = "none";
        });

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
    
    $('.deleteArchivedTask').on('click', function () {
        var dataId = $(this).attr('rel');             

        $.post('https://localhost/mvcWeb/todolist/toDoListTaskDelete', {editedCardId: dataId}, function (o) {
            $('#archivedItem_' + o.cardId).remove();
        }, 'json');

    });



    $.fn.attachDragger = function () {
        var attachment = false, lastPosition, position, difference;
        $('#content-kanban').on("mousedown mouseup mousemove", function (e) {
            if (e.type == "mousedown")
                attachment = true, lastPosition = [e.clientX, e.clientY];
            if (e.type == "mouseup")
                attachment = false;
            if (e.type == "mousemove" && attachment == true) {
                position = [e.clientX, e.clientY];
                difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
                $(this).scrollLeft($(this).scrollLeft() - difference[0]);
                $(this).scrollTop($(this).scrollTop() - difference[1]);
                lastPosition = [e.clientX, e.clientY];
            }
        });
        $(window).on("mouseup", function () {
            attachment = false;
        });
        $(".kanban-container").on("mouseup mousemove mousedown", function () {
            attachment = false;
        });
    };

    $(document).ready(function () {
        $("#content-kanban").attachDragger();
    });


});