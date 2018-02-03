<?php
        
	$index = $_POST['index'];
	$name = $_POST['name'];
	$number = $_POST['number'];
	$description = $_POST['description'];
	
	$jsonString = file_get_contents('products.json');
	$data = json_decode($jsonString, true);
	
	$data[$index]['name'] = $name;
	$data[$index]['number'] = $number;
	$data[$index]['description'] = $description;
	
	$newJsonString = json_encode($data);
	file_put_contents('products.json', $newJsonString);
?>