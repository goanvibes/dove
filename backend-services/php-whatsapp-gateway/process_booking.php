<?php
// Enforce JSON and Secure Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Acquire raw payload inputs
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (
        !empty($inputData['name']) &&
        !empty($inputData['phone']) &&
        !empty($inputData['bookingType']) &&
        !empty($inputData['targetDate'])
    ) {
        // Sanitize parameters securely against XSS
        $clientName  = htmlspecialchars(strip_tags($inputData['name']));
        $clientPhone = htmlspecialchars(strip_tags($inputData['phone']));
        $bookingType = htmlspecialchars(strip_tags($inputData['bookingType']));
        $targetDate  = htmlspecialchars(strip_tags($inputData['targetDate']));

        // Business Logic: Format the target text layout explicitly
        $baseBusinessNumber = "919822182917"; 
        $textPayload = "Hello Dove Nest Management! *New Booking Inquiry Verified*%0A%0A"
                     . "*Name:* " . urlencode($clientName) . "%0A"
                     . "*Contact:* " . urlencode($clientPhone) . "%0A"
                     . "*Package Chosen:* " . urlencode($bookingType) . "%0A"
                     . "*Requested Date:* " . urlencode($targetDate) . "%0A%0A"
                     . "Please confirm calendar reservation status.";

        $whatsappRedirectUrl = "https://api.whatsapp.com/send?phone=" . $baseBusinessNumber . "&text=" . $textPayload;

        // Respond back to frontend to trigger asynchronous redirection safely
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Validation successful. Proceeding to routing gateway.",
            "redirect_url" => $whatsappRedirectUrl
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Incomplete request parameters. Processing aborted."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid Request Protocol. Only POST accepted."]);
}
?>
