var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(process.env.VCAP_APP_PORT||8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.write(data)
    res.end();
  });
}

var online_user=0;
var user_message="Successfully Connected\n";

var usr_name_array=new Array();
var user_name_id_array=new Array();

var my_user_name="null";

var leaving_user_name="null";

io.sockets.on('connection', function (socket) {
   // join public room
   
   console.log("Init Server");
   
   socket.join('public_room');

  //socket.emit('news', { hello: 'world' });
   socket.emit('init',{init:"Successfully Connect to Nodejs Server",data:user_message,now_online_user_num:online_user});     
   
   socket.on('add_one_online_user',function(data){
	   online_user++;
	   io.sockets.emit('update_online_user_num',[online_user,data]);
   });
   
   socket.on('my event', function (data) {
  	console.log("Get data from user");
    console.log(data);
    
    user_message+=data;
    user_message+="\n";
    
    console.log(user_message);
    
    io.sockets.emit("update_textarea",user_message);
       
   });
   
   // request_for_user_information
   socket.on('request_for_user_information',function(data){
	  	socket.emit('return_user_information',usr_name_array); 
   });
   
   // user disconnect
   socket.on("disconnect", function(s) {
   		console.log("user id "+socket.id+" is leaving");
        online_user--;
        
        // remove user_name from user_name_array;
       	for(var i=0;i<user_name_id_array.length;i++){
	       	if(user_name_id_array[i]==socket.id){
	       		console.log("remove "+usr_name_array[i]+" from user information");
	       		
	       		io.sockets.emit('update_online_user_num',[online_user,usr_name_array[i]]);

		       	usr_name_array.splice(i, 1);
		       	user_name_id_array.splice(i,1);
		       	break;
	       	}
       	} 

               	
        console.log("User disconnected from global handler");
    });
       
    // get user name from client
    socket.on('sent_custom_name',function(user_name){
	    console.log("Get user name --> "+user_name);
	    console.log(socket.id);
	    // check whether same user existed.
	    var has_same_user_name=false;
	    for(var i=0;i<usr_name_array.length;i++){
		    if(usr_name_array[i]==user_name){
		    	console.log("same_user_name already existed");
			    has_same_user_name=true;
			    break;
		    }
	    }
	    if(has_same_user_name==false){
	    	usr_name_array.push(user_name);
	    	user_name_id_array.push(socket.id);
	    	my_user_name=user_name;
	    	}
	    socket.emit('has_same_user_name',[has_same_user_name,user_name]);
			    
    })
   
   
  /*
  socket.on('my other event', function (data) {
  	console.log("THAT IS DATA");
    console.log(data);
  });
  */
  
});
