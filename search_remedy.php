<?php
include 'db.php';

$symptom = $_GET['symptom'] ?? '';

if(!$symptom) {
    echo json_encode(['error' => 'Symptom missing']);
    exit;
}

$symptom = $conn->real_escape_string($symptom);
$sql = "SELECT * FROM remedies WHERE symptom LIKE '%$symptom%'";
$result = $conn->query($sql);

$remedies = [];
while ($row = $result->fetch_assoc()) {
    $remedies[] = $row;
}

if(count($remedies) > 0){
    echo json_encode($remedies);
} else {
    echo json_encode(['error' => 'No remedy found']);
}
?>
