<?php

    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');



try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $get = file_get_contents('php://input');

    $data = json_decode($get, true);
    
    $date = htmlspecialchars($data['date']);
    $email = htmlspecialchars($data['email']);
    $category = htmlspecialchars($data['category']);
    $kurs = htmlspecialchars($data['kurs']);

    $connect = new mysqli('127.0.1.12', 'root', '', 'cookschool');

    $query = "INSERT INTO orders (client_id, date, category, kurs, status) VALUES ((SELECT id FROM clients WHERE email = '$email' LIMIT 1),'$date', '$category', '$kurs', 'На рассмотрении');";

    $connect->query($query);

    $connect->close();

    echo json_encode([
        "success" => true,
        "message" => "Заявка создана"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Ошибка базы данных: ' . $e->getMessage()
    ]);
    exit;
}
?>