$(document).ready(function () {

    /*    const xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
     if (this.readyState === 4 && this.status === 200) {
     const response = JSON.parse(xhttp.responseText);
     // console.log(response[0].name);
     let output = '';
     for (var i = 0; i < response.length; i++) {
     output += '<li class="product-item" data-key="' + response[i].name + '">' + response[i].name + '</li>';
     
     }
     document.getElementById('prod').innerHTML = output;
     }
     };
     xhttp.open("GET", "products.json", true);
     xhttp.send();
     */
    var json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'products.json',
            'dataType': 'json',
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

    let output = '';
    for (var i = 0; i < json.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = json[i].name;
        li.className = "product-item";
        li.dataset.key = json[i].name;
        $('#prod').append(li);
    }
    let index;

    function showDetails() {
        $('#prod-name').val(json[index].name);
        $('#prod-number').val(json[index].number);
        $('#prod-desc').val(json[index].description);

        let imgs = '';
        for (var i = 0; i < json[index].images.length; i++) {
            imgs += json[index].images[i].url;
            imgs += '\n';
        }

        if (imgs !== '')
            $('#prod-img').val(imgs);
        else
            $('#prod-img').val('no images found');
    }

    $('.product-item').on('click', function () {
        index = $(this).index();
        showDetails()
    });

    $('#enable-update').on('click', function () {
        $("#prod-name").attr("readonly", false);
        $("#prod-number").attr("readonly", false);
        $("#prod-desc").attr("readonly", false);
        $("#prod-img").attr("readonly", false);
    });

    $('#cancel-update').on('click', function () {
        showDetails();
        $("#prod-name").attr("readonly", true);
        $("#prod-number").attr("readonly", true);
        $("#prod-desc").attr("readonly", true);
        $("#prod-img").attr("readonly", true);
    });
    $('#save-changes').on('click', function () {
        json[index].name = $("#prod-name").val();
        json[index].number = $("#prod-number").val();
        json[index].description = $("#prod-desc").val();
        // json[index].images = $("#prod-img").val();
        showDetails();
    });

});


