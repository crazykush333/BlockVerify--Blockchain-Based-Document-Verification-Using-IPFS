<?php
session_start();

if (isset($_SESSION['username'])) {
    header("location: home.html");
    exit;
}

// Database connection
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Your database username
$password = "ayush"; // Your database password
$dbname = "blockverify"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Register user
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "Passwords do not match";
        exit();
    }

    // Check if username already exists
    $sql_check_username = "SELECT * FROM userdetails WHERE username='$username'";
    $result = $conn->query($sql_check_username);
    if ($result->num_rows > 0) {
        echo "Username already exists";
        exit();
    }

    // Insert user details into the database
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql_register = "INSERT INTO userdetails (username, password) VALUES ('$username', '$hashed_password')";
    if ($conn->query($sql_register) === TRUE) {
        header("location: index.html");
        exit(); // Ensure script execution stops after redirection
    } else {
        echo "Error: " . $sql_register . "<br>" . $conn->error;
    }
}

// Login user
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Retrieve user details from the database
    $sql_login = "SELECT * FROM userdetails WHERE username='$username'";
    $result = $conn->query($sql_login);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Redirect to home.html
            header("location: home.html");
            exit(); // Ensure script execution stops after redirection
        } else {
            echo "Invalid username or password";
        }
    } else {
        echo "Invalid username or password";
    }
}
$conn->close();
?>
