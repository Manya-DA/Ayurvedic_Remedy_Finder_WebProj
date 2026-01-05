<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli("localhost", "YOUR_ROOT_USER", "YOUR_ROOT_PASSWORD", "database_name");
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database Connection Failed: ' . $conn->connect_error]));
}
?>
