var product = "";
$.ajax({
    type: 'POST',
    url: 'index.php?route=ajax/index',
    data: {
        id: 'mfId'
    },
    success: function (data) {
        product = JSON.parse(data);
        console.log(product);
    }
});

