<?php

header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');



try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $get = file_get_contents('php://input');

    $data = json_decode($get, true);

    $id = htmlspecialchars($data['id']);
    $status = htmlspecialchars($data['status']);

    $connect = new mysqli('127.0.1.12', 'root', '', 'cookschool');

    $check = "SELECT id FROM orders WHERE id = '$id';";
    $result = $connect->query($check);
    if (mysqli_num_rows($result) === 0) {
        echo json_encode([
            "error" => true,
            "message" => "ID $id не найден в базе"
        ]);
    } else {
        $query = "UPDATE orders SET status='$status' WHERE id=$id;";

        $connect->query($query);

        $connect->close();
        echo json_encode([
            "success" => true,
            "message" => "Статус обновлен"
        ]);
        exit();
    }



} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Ошибка базы данных: ' . $e->getMessage()
    ]);
    exit;
}

?>