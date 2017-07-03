<?php
/**
 * 
 */
class Bootstrap {

    private $_url = null;
    private $_controller = null;
    private $_controllerPath = 'controllers/'; // Always include trailling slash
    private $_modelPath = 'models/'; // Always include trailling slash
    private $_errorFile = 'failure.php';
    private $_defaultFile = 'index.php';
    /**
     * Construct the Bootstrap
     * 
     * @return boolean|string
     */
    public function init() {
        //Sets the protected $_url
        $this->_getUrl();
        //print_r($url);
        
        
        //Load the default controller if no URL is set
        //eg: Visit http://localhost it loads Default controller
        if (empty($this->_url[0])) {
            $this->_loadDefaultController();
            return false;
        }
        
        $this->_loadExistingController();
        
        $this->_callControllerMethod();
         
    }
    
    /**
     * (Optional) Set a custom path to controllers
     * @param string $path
     */
    function setControllerPath($path) {
        $this->_controllerPath = trim($path, '/') . '/';
    }
    
    /**
     * (Optional) Set a custom path to models
     * @param string $path
     */
    function setModelPath($path) {
        $this->_modelPath = trim($path, '/') . '/';
    }
    
    /**
     * (Optional) Set a custom path to error file
     * @param string $path Use the file name of your controller, eg. failure.php
     */
    function setErrorFile($path) {
        $this->_errorFile = trim($path, '/');
    }
    
    /**
     * (Optional) Set a custom path to default file
     * @param string $path Use the file name of your controller, eg. index.php
     */
    function setDefaultFile($path) {
        $this->_defaultFile = trim($path, '/');
    }
    
    
    
    /**
     * Fetches the $_GET from 'url'
     */
    private function _getUrl() {
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $this->_url = explode('/', $url);
    }
    /**
     * This loads if there is NO GET parameter passed
     */
    private function _loadDefaultController() {
            require $this->_controllerPath . $this->_defaultFile;
            $this->_controller = new Index();
            $this->_controller->index();
            
        
    }
    /**
     * Load an existing controller if there IS a GET parameter passed
     * @return boolean
     */
    private function _loadExistingController() {
        $file = $this->_controllerPath . $this->_url[0] . '.php';
        if (file_exists($file)) {
            require $file;
            $this->_controller = new $this->_url[0];
            $this->_controller->loadModel($this->_url[0], $this->_modelPath);
        } else {
             $this->_error();
             return false;
        }
        
      
    }
    
    /**
     * If a method is passed in the GET url parameter
     */
    //http://localhost/controller/method/(param)/(param)
        //url[0] = controller
        //url[1] = method
        //url[2] = param
        //url[3] = param
        //url[4] = param
    private function _callControllerMethod() {
        
        
        $length = count($this->_url);
        
        //Make sure the method we are calling exists
        if($length > 1) {
            
            if(!method_exists($this->_controller, $this->_url[1])) {
             
                $this->_error();
            }
        }
        
        //Determine what do load
        switch ($length) {
            case 5:
                //controller->method(param1, param,2, param3)
                $this->_controller->{$this->_url[1]}($this->_url[2], $this->_url[3], $this->_url[4]);    
                break;
            
            case 4:
                //controller->method(param1, param,2, param3)
                $this->_controller->{$this->_url[1]}($this->_url[2], $this->_url[3]);
                break;
            
            case 3:
                //controller->method(param1, param,2, param3)
                $this->_controller->{$this->_url[1]}($this->_url[2]);
                break;
            
            case 2:
                //controller->method(param1, param,2, param3)
                
                    $this->_controller->{$this->_url[1]}();
                
                break;
            
            default:
                 $this->_controller->index();
                 break;
        }
        
        
             
            
        
    }
    
    /**
     * Display an error page if nothing exists
     * @return boolean
     */
    private function _error() {
        require $this->_controllerPath . $this->_errorFile;
        $this->_controller = new Failure();
        $this->_controller->index();
        exit;
    }

}