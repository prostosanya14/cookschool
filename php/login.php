<?php

    // header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json; charset=utf-8');

try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $get = file_get_contents('php://input');
    $data = json_decode($get, true);
    $login = htmlspecialchars($data['login']);
    $pass = htmlspecialchars($data['pass']);
    $connect = new mysqli('127.0.1.12', 'root', '', 'cookschool');
    $query = "SELECT * FROM clients WHERE email='$login' AND pass='$pass';";
    $result = $connect->query($query);
    $userData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $userData[] = $row;
    }
    echo json_encode($userData);
    
    $connect->close();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Ошибка базы данных: ' . $e->getMessage()
    ]);
    exit;
}

?>