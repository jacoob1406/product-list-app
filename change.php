<?php

	$index = $_POST['index'];
	$name = $_POST['name'];
	$number = $_POST['number'];
	$description = $_POST['description'];
	$images = $_POST['images'];
	$array = explode("\n", $images);


	$jsonString = file_get_contents('products.json');
	$data = json_decode($jsonString, true);

	$data[$index]['name'] = $name;
	$data[$index]['number'] = $number;
	$data[$index]['description'] = $description;

	array_splice($data[$index]['images'], 0);
	$length = count($array);
	for ($x = 0; $x < $length; $x++) {
		$data[$index]['images'][$x]['url'] = $array[$x];
	}

	$newJsonString = json_encode($data);
	file_put_contents('products.json', $newJsonString);

	header("location:productlist.html");
	header("Refresh:0");
?>