
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

var user=[];

var user_draw=[];

var saved_data=[];


io.sockets.on('connection', function (socket) {
	
	console.log('Init Server');
	
	// add user
	user.push(socket.id);
	console.log('Now users --> '+user);
			
	
	socket.emit('begin_to_connect_to_server',{message:'Successfully connect to server',id:socket.id, saved_data:saved_data});
      
    socket.on('disconnect',function(data){
	   
	   console.log('user disconnect --> '+socket.id);
	  // console.log(room);
	  	
	   // remove user from user
	   for (var i in user){
	   		if(user[i]==socket.id){
		   		
		   		user.splice(i,1);
		   		
	   		}
	   }
	   console.log('after remove --> '+user);
	  
	  
    });
    
   
    
	socket.on('mouse_move',function(data){
	
	   // add draw data to user
	   // user_draw[data.id].push(data.pos);
	   
	   socket.broadcast.emit('remote_mouse_move',data);
	   
	   saved_data.push(data);
	   
	});
	
	
 })
   
   
   
   
   
   
   
   
   
   
   
   
   

