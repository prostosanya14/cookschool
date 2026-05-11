<?php

    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $get = file_get_contents('php://input');
    $data = json_decode($get, true);
    $email = htmlspecialchars($data['email']);
    $connect = new mysqli('127.0.1.12', 'root', '', 'cookschool');

    $query = "SELECT clients.*, orders.*, orders.id FROM orders JOIN clients ON orders.client_id = clients.id WHERE clients.email = '$email';";
    $result = $connect->query($query);

    $orderData = array();


    while ($row = mysqli_fetch_assoc($result)) {
        $orderData[] = $row;
    }

    echo json_encode($orderData);

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