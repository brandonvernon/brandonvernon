<?php

// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: https://www.brandonvernon.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Max-Age: 3600");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit;
}

// Database configuration
$host = '127.0.0.1';
$username = 'brandrd9_root';
$password = '42m2liC2dig!';
$database = 'brandrd9_brandonvernon';

// Connect to your database
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read data sent from the client
    $data = json_decode(file_get_contents("php://input"));
    
    if ($data) {
        $player = $data->player;
        $moves = $data->moves;
        $time = $data->time;

        // Insert the data into the 'scores-plus' table
        $sql = "INSERT INTO `scores-plus` (`player`, `moves`, `time`) VALUES ('$player', '$moves', '$time')";

        if ($conn->query($sql) === true) {
            echo "Data inserted successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Error: Invalid data.";
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["retrieve"]) && $_GET["retrieve"] === "true") {
    // Retrieve high scores
    $sql = "SELECT * FROM `scores-plus` ORDER BY `moves`, `time` LIMIT 25";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $scores = array();
        while ($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }
        echo json_encode($scores);
    } else {
        echo "No high scores yet.";
    }
}

$conn->close();
?>
