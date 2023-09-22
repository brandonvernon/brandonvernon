<?php

//Initialize Blank variables
$Email = $Firstname = $Lastname = $Comments = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $Email = test_input($_POST['email']);
  $Firstname = test_input($_POST['firstname']);
  $Lastname = test_input($_POST['lastname']);
  $Comments = test_input($_POST['comments']);
}

//This will remove any attemtp to hack via script / mysql injection.
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function IsInjected($str)
{
  $injections = array('(\n+)',
    '(\r+)',
    '(\t+)',
    '(%0A+)',
    '(%0D+)',
    '(%08+)',
    '(%09+)'
    );

  $inject = join('|', $injections);
  $inject = "/$inject/i";

  if(preg_match($inject,$str))
  {
    return true;
  }
  else
  {
    return false;
  }
}

if(IsInjected($Email))
{
  echo "Bad email value!";
  exit;
}

$email_subject = "New Contact Request";
$email_body = "You have received a new message from $Firstname $Lastname.\n\n".
"Their email is $Email.\n\n".
"Here is their comment:\n $Comments.\n\n".

$to = "brandontvernon@gmail.com";
$headers = "From: $Email \r\n";
$headers .= "Reply-To: $Email \r\n";
mail($to,$email_subject,$email_body,$headers);

$host = "127.0.0.1";
$dbUsername = "root";
$dbPassword = "";
$dbname = "brandonvernon";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO contact (Email,Firstname,Lastname,Comments) VALUES ('$Email','$Firstname','$Lastname','".mysqli_real_escape_string($conn, $Comments)."')";


if ($conn->query($sql) === TRUE) {
  header("Location: https://www.brandonvernon.com/thanks");
  echo "<script type='text/javascript'>alert('Thank you, I'll get back to you right away!')</script>";
} else {
  echo "<script type='text/javascript'>alert('Opps! Something went wrong. Please return to the form and try again.')</script>";
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
