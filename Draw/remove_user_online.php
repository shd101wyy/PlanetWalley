<?php
	// save user name to public_room_now_online_user.txt
	$room_name='public_room_now_online_user.txt';
	$user_name=$_POST['user_name'];
	
	
	$content_in_file=file_get_contents($room_name);
	
	$same_online=false;
	
	$piece=explode("\n", $content_in_file);
	$i=0;
	$length_of_piece=count($piece);
	for($i=0;$i<$length_of_piece;$i++){
		if($piece[$i]==$user_name){
			unset($piece[$i]);
			break;
		}
		
	}	
	
	
	// change new_content_pieces to string
	$new_string="";
	$length_of_piece=count($piece);
	for($i=0;$i<$length_of_piece;$i++){
		$new_string.=$piece[$i];
		$new_string.="\n";
	}	
	
	file_put_contents($room_name, $new_string);
		
	echo json_encode(null);
?>