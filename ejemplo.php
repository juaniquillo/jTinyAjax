<?php


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Como usar TinyMCE como un editor AJAX</title>
    <!-- css jquery UI -->
    <link href="js/jquery.ui/css/theme4/theme4.css" rel="stylesheet" type="text/css" />
    <!-- css jTinyMCE -->
    <link href="css/jtinyajax.css" rel="stylesheet" type="text/css" />
    <!-- Scripts -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js" ></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.min.js" ></script>
    <script type="text/javascript" src="js/tiny_mce/tiny_mce.js"></script>
    
    <script type="text/javascript" src="js/jTinyAjax.jquery.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.jtinymceajax, .jtinymceajax2').jTinyAjax();
        });
        
    </script>
    
</head>
<body>
    
    <div class="jtinymceajax" id="id_1"><p>hola otra mas</p></div>
    <p>s</p>
    <div class="jtinymceajax2"><p>hola</p></div>
    
</body>
</html>