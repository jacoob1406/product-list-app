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

    function readOnlyChange(bool, color) {
        $("#prod-name").attr("readonly", bool).css('background-color', color);
        if (color === '#e5e0e0')
            $("#prod-number").attr("readonly", bool).css('background-color', color);
        else
            $("#prod-number").attr("readonly", bool).css('background-color', '#EDDBCD');
        $("#prod-desc").attr("readonly", bool).css('background-color', color);
        $("#prod-img").attr("readonly", bool).css('background-color', color);
    }

    function cancelUpdate() {
        showDetails();
        readOnlyChange(true, '#98dafc');
        $('#submit').css('display', 'none');
        $('#cancel-update').css('display', 'none');
        $('#enable-update').css('display', 'inline');
        $('#help').css('display', 'none');
    }

    let index;

    $('.container__list__item').on('click', function () {
        index = $(this).index();
        showDetails();
        $('#prod-info').css('display', 'block');
    });

    $('#enable-update').on('click', function () {
        readOnlyChange(false, '#e5e0e0');
        $(this).hide();
        $('#submit').css('display', 'inline');
        $('#cancel-update').css('display', 'inline');
        $('#help').css('display', 'inline');
    });

    $('#cancel-update').on('click', function () {
        cancelUpdate();
    });

    $('#escape').on('click', function () {
        $('#prod-info').css('display', 'none');
        cancelUpdate();
    });
});


