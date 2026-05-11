<?php

    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');


try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $get = file_get_contents('php://input');
    $data = json_decode($get, true);
    $name = htmlspecialchars($data['name']);
    $age = htmlspecialchars($data['age']);
    $email = htmlspecialchars($data['email']);
    $pass = htmlspecialchars($data['pass']);
    $connect = new mysqli('127.0.1.12', 'root', '', 'cookschool');
    $check_sql = "SELECT id FROM clients WHERE email = '$email'";
    $result = $connect->query($check_sql);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode([
            "error" => true,
            "message" => "Такой email уже есть!"
        ]);
    } else {
        $query = "INSERT INTO clients (name, age, email, pass, role) VALUES ('$name', '$age', '$email', '$pass', 1);";
        $connect->query($query);
        $connect->close();
        echo json_encode([
            "success" => true,
            "message" => "Пользователь успешно зарегистрирован"
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