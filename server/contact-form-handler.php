<?php 

function spamcheck($email)
{
  if(filter_var($email, FILTER_VALIDATE_EMAIL))
  {
    return TRUE;
  }
  else
  {
    return FALSE;
  }
}


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
$email_address = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$message = $_POST['message'];

if (spamcheck($email_address) == FALSE) {
	echo 3;
	return;
}

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
