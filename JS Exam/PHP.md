# PHP

```html
<form action="index.php">
<input type="email" name="email" placeholder="Enter your email">
<input type="number" name="age" placeholder="Enter your age">
<input type="submit">
</form>
```

```php
<?php

$email = $_REQUEST["email"];
$age = $_REQUEST["age"];

$conn = mysqli_connect("localhost", "root", "mysql");
mysqli_query($conn, "CREATE DATABASE Learning");


$conno = mysqli_connect("localhost", "root", "mysql", "Learning");
mysqli_query($conno, "CREATE TABLE Students (email varchar(255), age int)");
mysqli_query($conno, "INSERT INTO Students (email, age) VALUES ('.$email.', '.$age.')");


$res = mysqli_query($conno, "SELECT email FROM Students");

if (mysqli_num_rows($res) > 0){
    while($row = mysqli_fetch_assoc($res)){
        print("<p>Hello ".$row["email"].".</p>");
    }
}

?>
```


## Basics
```php
<?php

$text = "I am here";
print(strlen($text)); // 9

$arr = array("Filip", "Petr");

$arb = [];
$arb[] = "Mamka";


// mysqli_query($conno, "INSERT INTO Students (email, age) VALUES ('filip@a.com', '19')");

/*
if ($conn->query($sql) === TRUE){
    print("DATABASE CRATED.");
} else {
    print("ERROR CREATING DATABSE: ". $conn->error);
}
*/
?>
```
