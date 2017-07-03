<?php

class Todolist_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    function toDoListGetListings() {
        $sth = $this->db->prepare('SELECT * FROM todolist WHERE userid = :userid ORDER BY listRanking ASC');
        //$sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':userid' => $_SESSION['userid']
        ));
        return $sth->fetchAll();
    }
    
    function singleToDoListGetListings() {
        
        $sth = $this->db->prepare('SELECT * FROM todolist WHERE listId = :listId');
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':listId' => $_GET['item']
        ));
        $data = $sth->fetch();
        echo json_encode($data);
    }
    
    function archiveListGetListings() {
        $sth = $this->db->prepare('SELECT * FROM todolist WHERE listType =:listType AND userid = :userid ORDER BY listUpdatedDate DESC');
        //$sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':listType' => 'Archive',
            ':userid' => $_SESSION['userid']
        ));
        return $sth->fetchAll();
    }

    function toDoListTaskInsert() {
        $listValue = $_POST['cardValue'];
        $listType = $_POST['cardType'];
        
        
        if ($listType == "To Do") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'To Do',
                ':userid' => $_SESSION['userid']
            ));
        } else if ($listType == "Important and Urgent") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'Important and Urgent',
                ':userid' => $_SESSION['userid']
            ));
        } else if ($listType == "Important and Non-urgent") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'Important and Non-urgent',
                ':userid' => $_SESSION['userid']
            ));
        } else if ($listType == "Unimportant and Urgent") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'Unimportant and Urgent',
                ':userid' => $_SESSION['userid']
            ));
        } else if ($listType == "Doing") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'Doing',
                ':userid' => $_SESSION['userid']
            ));
        } else if ($listType == "Done") {
            $sthForGettingLastRankging = $this->db->prepare('SELECT MAX(listRanking) FROM todolist WHERE listType = :listType AND userid = :userid');
            $sthForGettingLastRankging->execute(array(
                ':listType' => 'Done',
                ':userid' => $_SESSION['userid']
            ));
        }
        
        
        $row = $sthForGettingLastRankging->fetchAll();
        $lastRanking = '';
        $numberOfList = '';
        foreach($row as $counting => $Rows) {
            $lastRanking = $Rows[0];
        }   

        $sth = $this->db->prepare('INSERT INTO todolist (listValue, listType, listRanking, userid) VALUES (:listValue, :listType, :listRanking, :userid)');
        
        if($lastRanking == null) {
            $sth->execute(array(
                ':listValue' => $listValue,
                ':listType' => $listType,
                ':listRanking' => 0,
                ':userid' => $_SESSION['userid']
            ));

            $toDoListCard = array(
                'cardValue' => $listValue,
                'cardType' => $listType,
                'cardRanking' => 0,
                'cardId' => $this->db->lastInsertId()
            );
        } else {
            $sth->execute(array(
                ':listValue' => $listValue,
                ':listType' => $listType,
                ':listRanking' => $lastRanking + 1,
                ':userid' => $_SESSION['userid']
            ));

            $toDoListCard = array(
                'cardValue' => $listValue,
                'cardType' => $listType,
                'cardRanking' => $lastRanking + 1,
                'cardId' => $this->db->lastInsertId()
            );
        }
        echo json_encode($toDoListCard);
    }
    
    function toDoListTaskValueUpdate() {
        $listValue = $_POST['editedCardValue'];
        $listId = $_POST['editedCardId'];
        
        $sth = $this->db->prepare('UPDATE todolist SET `listValue` = :listValue WHERE listId = :listId');
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':listValue' => $listValue,
            ':listId' => $listId
        ));
        
        $editedCard = array(
            'cardValue' => $listValue,
            'cardId' => $listId
        );
        echo json_encode($editedCard);
    }
    
    function toDoListTaskDelete() {
        $listId = $_POST['editedCardId'];
        
        $sth = $this->db->prepare('DELETE FROM todolist WHERE listId = :listId');
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':listId' => $listId
        ));
        
        $editedCard = array(
            'cardId' => $listId
        );
        echo json_encode($editedCard);
        
    }
    
    function toDoListTaskArchive() {
        $listId = $_POST['editedCardId'];
        $listValue = $_POST['editedCardValue'];
        
        $sth = $this->db->prepare('UPDATE todolist SET `listType` = :listType WHERE listId = :listId');
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':listId' => $listId,
            ':listType' => 'Archive'
        ));
        
        $sthForArchivedTask = $this->db->prepare('SELECT * FROM todolist WHERE listId = :listId AND userid = :userid');
        $sthForArchivedTask->execute(array(
            ':listId' => $listId,
            ':userid' => $_SESSION['userid']
        ));
        
        $row = $sthForArchivedTask->fetchAll();
        $archivedDate = '';
        
        foreach($row as $counting => $Rows) {
            $archivedDate = $Rows[5];
        }
        
        $editedCard = array(
            'cardId' => $listId,
            'cardValue' => $listValue,
            'cardType' => 'Archive',
            'cardArchivedDate' => $archivedDate
        );
        echo json_encode($editedCard);
        
    }

    function toDoListTaskOrderUpdate() {
        $toDolist = '';
        $importantAndUrgentList = '';
        $importantAndNonUrgentList = '';
        $unimportantAndUrgentList = '';
        $doingList = '';
        $doneList = '';

        parse_str($_POST['toDoList'], $toDolist);
        parse_str($_POST['importantAndUrgentList'], $importantAndUrgentList);
        parse_str($_POST['importantAndNonUrgentList'], $importantAndNonUrgentList);
        parse_str($_POST['unimportantAndUrgentList'], $unimportantAndUrgentList);
        parse_str($_POST['doingList'], $doingList);
        parse_str($_POST['doneList'], $doneList);


        foreach ($toDolist['item'] as $key => $value) {
            $sth = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth->execute(array(
                ':listRanking' => $key,
                ':listType' => 'To Do',
                ':listId' => $value
            ));
        }
        
        foreach ($importantAndUrgentList['item'] as $key => $value) {
            $sth = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth->execute(array(
                ':listRanking' => $key,
                ':listType' => 'Important and Urgent',
                ':listId' => $value
            ));
        }
        
        foreach ($importantAndNonUrgentList['item'] as $key => $value) {
            $sth = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth->execute(array(
                ':listRanking' => $key,
                ':listType' => 'Important and Non-urgent',
                ':listId' => $value
            ));
        }
        
        foreach ($unimportantAndUrgentList['item'] as $key => $value) {
            $sth = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth->execute(array(
                ':listRanking' => $key,
                ':listType' => 'Unimportant and Urgent',
                ':listId' => $value
            ));
        }
        
        foreach ($doingList['item'] as $key => $value) {
            $sth2 = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth2->execute(array(
                ':listRanking' => $key,
                ':listType' => 'Doing',
                ':listId' => $value
            ));
        }
        
        foreach ($doneList['item'] as $key => $value) {
            $sth3 = $this->db->prepare('UPDATE todolist SET `listRanking` = :listRanking, `listType` = :listType WHERE `listId` = :listId');
            $sth3->execute(array(
                ':listRanking' => $key,
                ':listType' => 'Done',
                ':listId' => $value
            ));
        }
    }

}
