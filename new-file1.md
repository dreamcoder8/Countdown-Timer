<html>
<body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
$(document).ready(function(){

        $.ajax({
        	contentType:'application/json',
        	type:'POST',
        	dataType:'jsonp',url: "https://examsoft.test.ku.edu.tr/examsoft/heartbeat/FAF54828F8B3F1DA7EEB219CC86A5", success: function(result){
            console.log(result);
        }});
    });

function mycallback(data)
{
    console.log('hello');
    console.log(data);
}
</script>
</body>
</html>