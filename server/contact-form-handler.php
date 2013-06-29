<?php 
$errors = '';
$myemail = 'skveerkamp@gmail.com';//<-----Put Your email address here.
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    echo 2;
    return;
}

$name = $_POST['name']; 
$email_address = $_POST['email'];
$message = $_POST['message'];

$to = $myemail; 
$email_subject = "Portfolio Message: $name, $type";
$email_body = "$name \n $email_address \n $message"; 

$headers = "From: $myemail\n"; 
$headers .= "Reply-To: $email_address";

$result = mail($to,$email_subject,$email_body,$headers);
if ($result == true) {
	echo 0;
} else {
	echo 1;
}
?>
