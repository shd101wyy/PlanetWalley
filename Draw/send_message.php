<?php

	$message=$_POST['postit'];
	
	$existed_content=file_get_contents('user_message.txt');
	
	$new_content=$existed_content."\n";
	$new_content.=$message;
	file_put_contents('user_message.txt', $new_content);
	echo($new_content);	

?>