$(document).ready(function () {

    let json = (function () {
        let json = null;
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

    for (let i = 0; i < json.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = json[i].name;
        li.className = "container__list__item";
        li.dataset.key = json[i].name;
        $('#prod').append(li);
    }

    let index;

    function showDetails() {
        $('#prod-name').val(json[index].name);
        $('#prod-number').val(json[index].number);
        $('#prod-desc').val(json[index].description);
        $('#index').val(index);

        let imgs = '';
        for (let i = 0; i < json[index].images.length; i++) {
            imgs += json[index].images[i].url;
            imgs += '\n';
        }

        if (imgs !== '')
            $('#prod-img').val(imgs);
        else
            $('#prod-img').val('no images found');
    }

    $('.container__list__item').on('click', function () {
        index = $(this).index();
        showDetails();
        $('#prod-info').css('display', 'block');
    });

    $('#escape').on('click', function () {
        $('#prod-info').css('display', 'none');
    });

    $('#enable-update').on('click', function () {
        $("#prod-name").attr("readonly", false).css('background-color', '#e5e0e0');
        $("#prod-number").attr("readonly", false).css('background-color', '#e5e0e0');
        $("#prod-desc").attr("readonly", false).css('background-color', '#e5e0e0');
        $("#prod-img").attr("readonly", false).css('background-color', '#e5e0e0');
        $(this).hide();
        $('#submit').css('display', 'inline');
        $('#cancel-update').css('display', 'inline');
    });

    $('#cancel-update').on('click', function () {
        showDetails();
        $("#prod-name").attr("readonly", true).css('background-color', '#98dafc');
        $("#prod-number").attr("readonly", true).css('background-color', '#EDDBCD');
        $("#prod-desc").attr("readonly", true).css('background-color', '#98dafc');
        $("#prod-img").attr("readonly", true).css('background-color', '#98dafc');
        $('#submit').css('display', 'none');
        $('#cancel-update').css('display', 'none');
        $('#enable-update').css('display', 'inline');
    });
});


