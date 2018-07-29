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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHByb2R1Y3QgPSBcIlwiO1xyXG4kLmFqYXgoe1xyXG4gICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgdXJsOiAnaW5kZXgucGhwP3JvdXRlPWFqYXgvaW5kZXgnLFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGlkOiAnbWZJZCdcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHByb2R1Y3QgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiJdfQ==
