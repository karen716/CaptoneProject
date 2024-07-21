<?php
include "dbcon.php";

$id = $_POST['id'];
$user_id = $_POST['user_id'];
$policeId = $_POST['policeId'];
$notes = $_POST['notes'];

if (isset($_FILES['files'])) {
    $fileArray = $_FILES['files'];

    // Ensure the files directory exists
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Loop through the uploaded files
    for ($i = 0; $i < count($fileArray['name']); $i++) {
        $fileName = basename($fileArray['name'][$i]);
        $fileTmpName = $fileArray['tmp_name'][$i];
        $fileError = $fileArray['error'][$i];

        // Check for upload errors
        if ($fileError === UPLOAD_ERR_OK) {
            $fileDest = $uploadDir . $fileName;

            // Move the uploaded file to the desired directory
            if (move_uploaded_file($fileTmpName, $fileDest)) {
                // Insert file info into database
                $stmt = $conn->prepare("INSERT INTO files (reportId, user_id, filename, notes, police) VALUES (?, ?, ?, ?, ?)");
                // Corrected the bind_param call to include all parameters
                $stmt->bind_param("iissi", $id, $user_id, $fileName, $notes, $policeId);
                if ($stmt->execute()) {
                    echo "File uploaded and info saved successfully: $fileName";
                } else {
                    echo "Error inserting file info into database: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Error moving file: $fileName";
            }
        } else {
            echo "Error uploading file: $fileName";
        }
    }
}

// Redirect or output success message
header("Location: policereport.php"); // Replace with your success page or redirection URL
exit();
?>
