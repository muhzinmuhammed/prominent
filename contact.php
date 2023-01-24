<!DOCTYPE html>
<html lang="en"><!-- Basic -->
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">   
   
    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
 
     <!-- Site Metas -->
    <title>Yamifood Restaurant - Responsive HTML5 Template</title>  
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">    
	<!-- Site CSS -->
    <link rel="stylesheet" href="css/style.css">    
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<style>
	#msg{
    color: rgb(208,167,114);
    margin-top: -30px;
	font: optional;
  
    display: block;
}
</style>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
	<!-- Start header -->
	<?php include("navbar.php")?>
	<!-- End header -->
	
	<!-- Start All Pages -->
	<div class="all-page-title page-breadcrumb">
		<div class="container text-center">
			<div class="row">
				<div class="col-lg-12">
					<h1>Contact</h1>
				</div>
			</div>
		</div>
	</div>
	<!-- End All Pages -->
	
	<!-- Start Contact -->
	<!-- <div class="map-full"></div> -->
	<div class="contact-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="heading-title text-center">
						<h2>Contact</h2>
						<p></p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<form name="submit-to-google-sheet" id="submit-form"  action="">
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<input type="text" pattern="[A-Za-z ]{1,32}" class="form-control" id="name" name="Name" placeholder="Your Name"  required data-error="Please enter your name" required>
									
								</div>                                 
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<input type="email"pattern="[^ @]*@[^ @]*" placeholder="Your Email" id="email" class="form-control" name="Email" required data-error="Please enter your email">
									
								</div> 	
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<input type="number" placeholder="Your count" id="count" class="form-control" name="Count" required data-error="Please enter your email">
									
								</div> 
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<input type="number"pattern="[789][0-9]{9}" placeholder="Your Phone Number" id="phone_number" class="form-control" name="Phone" required data-error="Please enter your email">
									
								</div> 
							</div>
							
							<div class="col-md-12">
								
								<div class="submit-button text-center">
									<button class="btn btn-common" id="submit" type="submit"onclick="return btnClicked() ">Send Message</button>
									<div id="msgSubmit" class="h3 text-center hidden"></div> 
									<div class="clearfix"></div> 
								</div>
							</div>
						</div>            
					</form>
					<span id="msg">	</span>
				</div>
			</div>
		</div>
	</div>
	<!-- End Contact -->
	
	<!-- Start Contact info -->
	<?php include("footer.php")?>
	<!-- End Footer -->
	
	<a href="#" id="back-to-top" title="Back to top" style="display: none;">&uarr;</a>

	<!-- ALL JS FILES -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/popper.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
    <!-- ALL PLUGINS -->
	
	<script src="js/jquery.superslides.min.js"></script>
	<script src="js/images-loded.min.js"></script>
	<script src="js/isotope.min.js"></script>
	<script src="js/baguetteBox.min.js"></script>
	<script src="js/jquery.mapify.js"></script>
	<script src="js/form-validator.min.js"></script>
    <script src="js/contact-form-script.js"></script>
    <script src="js/custom.js"></script>
	

	<script>
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwCs6tOLW9xVB-LzPVNaRZd_m5Y_IgeIn3Z1Jk4FqA6idDU7uQCu95KotyOa_pvJ4-R/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg =document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          msg.innerHTML ="Your message has been sent. Thank you!"
          setTimeout(function(){
            msg.innerHTML =""

          },5000)
          form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
  </script>	
<script>
	function btnClicked(){
  let btn;
  var name=document.getElementById("name").value.trim()
  var mail=document.getElementById("email").value.trim()
  var message=document.getElementById("message").value.trim()
  var phone=document.getElementById("phone_number").value.trim()
  var count=document.getElementById("count").value.trim()

  if(name==""||mail==""||message==""){-
    alert("please fill all fields")
  }else if(!/^[a-zA-Z0-9\_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+?$/.test(mail)){
      alert("Please re-check at email")
      btn=false
 }else if(!/^[a-zA-Z]*$/.test(name)){
    alert("Please enter your name correctly")
    btn=false
 }else if(!/^[a-zA-Z]*$/.test(message)){
    alert("Please enter valid message input")
    btn=false
 }

return btn;
  
}
</script>

</body>
</html>