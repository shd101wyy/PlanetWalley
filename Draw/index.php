<html>
	<head>
		<title> Draw </title>
		 <!-- Metro UI CSS -->
        <link href="../metro_ui_css/css/modern.css" rel="stylesheet" type="text/css">
        <link href="../metro_ui_css/css/modern-responsive.css" rel="stylesheet" type="text/css">
        <link href="../metro_ui_css/css/theme-dark.css" rel="stylesheet" type="text/css">
        </style>
        <script type="text/javascript" src="../metro_ui_css/javascript/accordion.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/buttonset.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/carousel.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/dropdown.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/input-control.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/pagecontrol.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/rating.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/slider.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/tile-drag.js"></script>
        <script type="text/javascript" src="../metro_ui_css/javascript/tile-slider.js"></script>
        
        <script type="text/javascript"	src="../jquery.min.js"></script>
	</head>
	<body>
		<style type="text/css">
		
			html, body{
				width:100%;
				height:100%;
				margin:0;
				padding:0;
				background-color: white;
			}
			
			#information_div{
				background-color: #25abb9;
				position: absolute;
				height: 100%;
				width: 30%;
				left: 70%;
				top:0%;
			}
			
			#chat_information{
				position: absolute;
				height: 40%;
				width: 100%;
				top:0%;
				left: 0%
			}
			
			#chat_content{
				background-color: #f493e5;
				position: absolute;
				height: 60%;
				width: 100%;
				top:40%;
				left: 0%;
			}	
		</style>
		<div id="information_div">
			<iframe id="hidden_iframe" style="display:none"></iframe>
			
			<div id="chat_information">
				<h2> Chat Information </h2>
					<h4> &nbsp;&nbsp;&nbsp;&nbsp; user name </h4>
					<input id="name">
					
					
					<form action="./send_message.php" method="post" target="hidden_iframe">
		     				<h4> &nbsp;&nbsp;&nbsp;&nbsp; send message </h4>
							<input name="postit" id="postit" type="text">
							<input type="submit" value="Send Message" >
					</form>
				
			</div>
			<div id="chat_content">
				<h2> Chat Content </h2>
			</div>
		</div>
		
		
		
		<script type="text/javascript">
			$("#send_message").click(function(){
				alert("Clicked Button");
				
				$("#hidden_iframe").load("./send_message.php");
			});
			
			
		</script>
	
	</body>
</html>















