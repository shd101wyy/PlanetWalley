<?php
	// update php every second
	// check update
	
	
	$chat_content=file_get_contents("./user_message.txt");
	$chat_content="Successfully init chat room\n".$chat_content;
	$chat_content.="\n\n\n\n\n\n";
	
	$return_array=array();
	array_push($return_array, $chat_content);
	
	echo json_encode($return_array);

?>