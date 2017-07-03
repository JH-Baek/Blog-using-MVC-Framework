<?php

class Performance_Model extends Model {

    function __construct() {
        parent::__construct();
    }
    
    function taskInsert() {
        
        $task = $_POST['task'];
        $type = $_POST['type'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $focusLevel = $_POST['focusLevel'];
        
        $sth = $this->db->prepare('INSERT INTO task (taskName, taskType, timeSpent, taskDate, taskFocusLevel, userid) VALUES (:task, :type, :time, :date, :focusLevel, :userid)');
        
         $sth->execute(array(
            ':task' => $task,
            ':type' => $type,
            ':time' => $time,
            ':date' => $date,
            ':focusLevel' => $focusLevel,
            ':userid' => $_SESSION['userid']
        ));
         
        $performance = array(
            'task' => $task,
            'type' => $type,
            'time' => $time,
            'date' => $date,
            'focusLevel' => $focusLevel,
            'id' => $this->db->lastInsertId()
        );
         
        echo json_encode($performance);

    }
    
    function taskGetListings() {
        $sth = $this->db->prepare('SELECT * FROM task WHERE userid = :userid');
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute(array(
            ':userid' => $_SESSION['userid']
        ));
        $data = $sth->fetchAll();
        echo json_encode($data);
    }
    
    function taskDeleteListing() {
        
        
        $sth = $this->db->prepare('DELETE FROM task WHERE taskid = :id');
        $sth->execute(array(
            ':id' => $_POST['taskid']
        ));
        
    }


}
 