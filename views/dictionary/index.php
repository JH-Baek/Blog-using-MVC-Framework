<div class="loader"></div>

<div class="dictionaryContainer">
    <div class="searchArea">
        <div class="title">
            <h1>Dictionary</h1>

            <form class="dictionary" action="<?php echo URL; ?>dictionary/searchDefinition" method="GET">
                <input type="text" class="text-box" name="dictionary" autofocus />
                            <button class="submitButton" type="submit">Search</button>
                            <br/><br/>
                            <input type="checkbox" name="save"/> Save on my word note
            </form>
        </div>
    </div>
    
        <?php
        if (!empty($this->search)) {
            
            echo '<div class="searchResult">';
            $dic_array = $this->search;
            
            
                if(!empty($dic_array['results'][0]['id'])) {
//                    echo "<pre>"; 
//                    print_r($dic_array);
//                    echo "<pre>";

                    //lexicalCategories such as noun, verb and adjective. Need to show them.
                    //display the words that has been searched before.

                    //die();

                    
                    echo '<div>'
                            . '<h1 class="word"> '.$dic_array['results'][0]['id'].'</h1>'
                        . '</div>'; 

                    foreach($dic_array['results'][0]['lexicalEntries'] as $word) {
                            echo '<hr><div class="partOfSpeech"><p id="searchPartOfSpeech"><b>'.$word['lexicalCategory'].'</b></p></div>';
                                if(!empty($word['entries'][0]['senses'])) {
                                    foreach($word['entries'][0]['senses'] as $definition) {
                                        if(!empty($definition['definitions'])){
                                            echo '<p class="definition" id="searchDefinition">'.$definition['definitions'][0].'</p>';
                                        }

                                            if (!empty($definition['subsenses'])) {
                                                    foreach($definition['subsenses'] as $subsenses) {
                                                        if(!empty($subsenses['definitions'])){
                                                            echo '<p class="subDefinition" style="padding-left: 10px; "> - '.$subsenses['definitions'][0].'</p>';
                                                        }
                                                    }
                                            }
                                    }
                                }
                    } 
                    
                
            
                } else if ($dic_array[0] == '404') {
                    echo '<p class="word" style="font-size: 30px; "> We cannot find a word, "'.$dic_array[1].'". Please, check your spelling!</p>';
                } 
            echo '</div>';
        }
        ?>
        
    
    <?php
    $numberOfWords = $this->numberOfWords;
    $numberOfPages = $this->lastPageNumberCalculationForPagination;
    if ($numberOfWords > 0) {
        echo '<div id="note">';

        //    $rows = '';
        //    foreach ($this->wordListCounting as $counting => $row) {
        //        $rows = $row[0];
        //    }
        //    
        //    echo $rows;




            foreach($this->wordList as $word => $wordValue) {
                //var_dump($value);
                echo '<div>'
                        . '<h1>'.$wordValue['spelling']. '</h1>'
                    . '</div>';

                foreach($this->partOfSpeechList as $pos => $posValue) {
                //var_dump($value);
                    if($wordValue['wordId'] == $posValue['wordId']) {
                         echo '<div class="partOfSpeech">'
                                . '<p><b>'.$posValue['type']. '</b></p>'
                            . '</div>';

                         foreach($this->definitionList as $definition => $definitionValue) {
                             if($wordValue['wordId'] == $posValue['wordId'] && $posValue['partOfSpeechId'] == $definitionValue['partOfSpeechId']) {
                                 echo '<div class="definition">'
                                        . '<p>- '.$definitionValue['definition']. '</p>'
                                    . '</div>';
                             }
                         }
                    }

                }
            }
        if($numberOfPages > 1){    
            echo '<div class="pagination">'. $this->paginationController .'</div>';
        }
    echo '</div>';
    }
    ?>

</div>