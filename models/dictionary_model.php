<?php

class Dictionary_Model extends Model {

    function __construct() {
        parent::__construct();
    }
    
    
    
    function search($arg) {
        if(!empty($arg)) {
            $request = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/'.$arg;
            $ch = curl_init($request);
            curl_setopt($ch, CURLOPT_URL, $request);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array('app_id: YOUR_API_ID','app_key: YOUR_APP_PASSWORD'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $results= curl_exec($ch);
            
            
            
            $dic_array = json_decode($results, true);
            $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $search_status = json_decode($http_status, true);
            
            if($search_status == '200') {
                return $dic_array;
            } else if($search_status == '404') {
                $failed_result = array($search_status, $arg);
                return $failed_result;
            }
                
        }
//       echo "<pre>"; 
//       print_r($dic_array);
//       echo "<pre>";
//        foreach($dic_array['results'][0]['lexicalEntries'] as $word) {
//            $lexicalCategory = serialize($word['lexicalCategory']);
//            echo $lexicalCategory;
//                
//            foreach($word['entries'][0]['senses'] as $definition) {
//                $wordDefinition = serialize($definition['definitions'][0]);
//                echo $wordDefinition;
//            if (!empty($definition['subsenses'])) {
//                foreach($definition['subsenses'] as $subsenses) {
//                    $wordSubdefinition = serialize($subsenses['definitions'][0]);
//                    echo $wordSubdefinition;
//                }
//            }
//            }
//        }
        
        
//                if(!empty($dic_array['results'][0]['lexicalEntries'][0]['entries'][0]['senses'])){
//                    echo '<pre>';
//                    print_r($dic_array['results']);
//                    echo '</pre>';
//                }
        
//        foreach($dic_array['results'][0]['lexicalEntries'] as $word) {
//            $lexicalCategory = serialize($word['lexicalCategory']);
//            echo $lexicalCategory;
//        }
//            
//            foreach($dic_array['results'][0]['lexicalEntries'][0]['entries'][0]['senses'] as $definition) {
//                $wordDefinition = serialize($definition['definitions']);
//                echo $wordDefinition;
//            }
//            
//            if (!empty($dic_array['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['subsenses'])) {
//                foreach($dic_array['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['subsenses'] as $subsenses) {
//                    $wordSubdefinition = serialize($subsenses['definitions']);
//                    echo $wordSubdefinition;
//                }
//            }
            
        
        
        
        
        
        
    }
    
    function dictionarySaving() {
        
    }
    
    function wordSaving($data) {
        
            
            $dic_array = $this->search($data['word']);
            
            $word = $dic_array['results'][0]['id'];
            
            if(!empty($word)) {
                $sth = $this->db->prepare('INSERT INTO word 
                                         (`spelling`, `userid`) 
                                          VALUES (:spelling, :userid)
                                        ');

                $sth->execute(array(
                            ':spelling' => $data['word'],
                            ':userid' => $_SESSION['userid']
                            ));

                $wordId = $this->db->lastInsertId();
                
                $this->partOfSpeechSaving($wordId, $data);
                $this->definitionSaving($wordId, $data);
            }
    }
        
    
    
    function partOfSpeechSaving($wordId, $data) {
        

            $dic_array = $this->search($data['word']);
            
            $word = $dic_array['results'][0]['lexicalEntries'];
            $numberOfArray = count($word);
//            $definition = $word[0]['entries'][0]['senses'];
//            $numberOfDefinitions = count($definition);
            for ($i = 0; $i < $numberOfArray; $i++) {
                $lexicalCategory = $word[$i]['lexicalCategory'];
                

                
                                $sth = $this->db->prepare('INSERT INTO partofspeech 
                                            (`wordId`, `type`, `userid`) 
                                            VALUES (:wordId, :type, :userid)
                                            ');

                                $sth->execute(array(
                                        ':wordId' => $wordId,
                                        ':type' => $lexicalCategory,
                                        ':userid' => $_SESSION['userid']
                                ));				
                
            }
            
    }
    
    function definitionSaving($wordId, $data) {
        

            $dic_array = $this->search($data['word']);
            
            $word = $dic_array['results'][0]['lexicalEntries'];
            $numberOfArray = count($word);
//            $definition = $word[0]['entries'][0]['senses'];
//            $numberOfDefinitions = count($definition);
            for ($i = 0; $i < $numberOfArray; $i++) {
                $lexicalCategory = $word[$i]['lexicalCategory'];
                              
                $definition = $word[$i]['entries'][0]['senses'];
                $numberOfDefinitions = count($definition);
                
                for ($n = 0; $n < $numberOfDefinitions; $n++) {
                    $wordDefinition = $definition[$n]['definitions'][0];
                    
                    
                    
//                    echo $wordDefinition.'<br>';
//                    echo $wordId.'<br>';
//                    echo $_SESSION['userid'].'<br>';
//                    echo $wordId.'<br>';
//                    echo $lexicalCategory.'<br>';
//                    echo $_SESSION['userid'].'<br>';
                    
                    
                    
                    
                                $sth = $this->db->prepare('INSERT INTO definition 
                                            (`definition`, `wordId`, `userid`, `partOfSpeechId`) 
                                            VALUES (:definition, :wordIdForDefinition, :useridForDefinition, (SELECT 
                                            partOfSpeechId FROM partofspeech WHERE 
                                            wordId = :wordId AND type = :type AND userid = :userid))
                                            ');

                                $sth->execute(array(
                                        ':definition' => $wordDefinition,
                                        ':wordIdForDefinition' => $wordId,
                                        ':useridForDefinition' => $_SESSION['userid'],
                                        ':wordId' => $wordId,
                                        ':type' => $lexicalCategory,
                                        ':userid' => $_SESSION['userid']
                                ));		
                    
                }
            }
        
    }
    
    function wordList() {
        $sth = $this->db->prepare('SELECT * FROM word WHERE userid = :userid ORDER BY wordId DESC');

        $sth->execute(array(
            ':userid' => $_SESSION['userid'],
        ));
        return $sth->fetchAll();
    }
    
    function partOfSpeechList() {
        $sth = $this->db->prepare('SELECT * FROM partofspeech WHERE userid = :userid');

        $sth->execute(array(
            ':userid' => $_SESSION['userid'],
        ));
        return $sth->fetchAll();
    }
    
    function definitionList() {
        $sth = $this->db->prepare('SELECT * FROM definition WHERE userid = :userid');

        $sth->execute(array(
            ':userid' => $_SESSION['userid'],
        ));
        return $sth->fetchAll();
    }
    
    public function numberOfWords() {
        $sthForCountingWords = $this->db->prepare('SELECT COUNT(wordId) FROM word WHERE userid = :userid');
        
        $sthForCountingWords->execute(array(
            ':userid' => $_SESSION['userid']
        ));
        $row = $sthForCountingWords->fetchAll();
        
        $numberOfWords = '';
        foreach($row as $counting => $Rows) {
            $numberOfWords = $Rows[0];
        }
        return $numberOfWords;
    }
    
    public function lastPageNumberCalculationForPagination() {
        
        
        $pageRows = 10;
        $numberOfWords = $this->numberOfWords();
        
        global $last;
        $last = ceil($numberOfWords/$pageRows);
        
        if($last < 1) {
            $last = 1;
        }
        
        return $last;
    }
    
    public function wordListingPerEachPage() {
        $pageRows = 10;
        return $pageRows;
    }

    public function pageNumberForPagination() {
        $last = $this->lastPageNumberCalculationForPagination();
        
        
        $pageNumber = 1;
        
        if(isset($_GET['page'])) {
        
            $pageNumber = preg_replace('#[^0-9]#', '', $_GET['page']);
        }
        
        if ($pageNumber < 1) {
            $pageNumber = 1;
        } else if ($pageNumber > $last) {
            $pageNumber = $last;
        }
        
        return $pageNumber;
    }
    
    
    
    function paginationController($pageNumber = 1) {
        $last = $this->lastPageNumberCalculationForPagination();
        
        
        
        $paginationControllers = '';
        
        if($last != 1) {
            if($pageNumber > 1) {
                $previous = $pageNumber -1;
                $paginationControllers .= '<a href="'.URL.'dictionary/page/1#note"><<</a> &nbsp; &nbsp; ';
                $paginationControllers .= '<a href="'.URL.'dictionary/page/'.$previous.'#note"><</a> &nbsp; &nbsp; ';
            
                for($i = $pageNumber-4; $i < $pageNumber; $i++) {
                    if($i > 0) {
                        $paginationControllers .= '<a href="'.URL.'dictionary/page/'.$i.'#note">'.$i.'</a> &nbsp; &nbsp; ';
                    }
                }
            }
        }
        
        $paginationControllers .= ''.$pageNumber.' &nbsp; &nbsp; ';
        
        for($i = $pageNumber+1; $i <= $last; $i++) {
            $paginationControllers .= '<a href="'.URL.'dictionary/page/'.$i.'#note">'.$i.'</a> &nbsp; &nbsp; ';
            if($i >= $pageNumber+4) {
                break;
            }
        }
        
        if($pageNumber != $last) {
                $next = $pageNumber + 1;
                $paginationControllers .= '<a href="'.URL.'dictionary/page/'.$next.'#note">></a> &nbsp; &nbsp; ';
                $paginationControllers .= '<a href="'.URL.'dictionary/page/'.$last.'#note">>></a>';
        }
        
        return $paginationControllers;
        
    }
    
    function wordListingForPagination($pageNumber) {
        
        //$pageNumber = $this->pageNumberForPagination();
        $pageRows = $this->wordListingPerEachPage();
        
        
        $limit = 'LIMIT ' . ($pageNumber - 1) * $pageRows .', '. $pageRows;
        
        
        $sthForPagination = $this->db->prepare('SELECT * FROM word WHERE userid = :userid ORDER BY wordId DESC ' . $limit);
        $sthForPagination->execute(array(
            ':userid' => $_SESSION['userid']
        ));
        
        return $sthForPagination->fetchAll();
    }
    
    /**
    public function setPost($postdata) {
	global $db;
				
	$category = serialize($postdata['post_category']);
				
	$query = "INSERT INTO posts (post_title, post_content, post_category)
		VALUES ('$postdata[post_title]', '$postdata[post_content]', '$category')
		";
			
	return $db->insert($query);
    }
     * serialize the data that is an array to save on the database.
     **/ 
}
 