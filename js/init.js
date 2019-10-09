function changePassword() {
    $("#changePassModal").modal('show');
}

function logout() {
    $.ajax({
        url: 'logout.do',
        success: function(data) {
            if (data.success) {
                window.location.reload();
            } else {
                alert("注销失败");
            }
        },
        error: function() {
            alert("注销异常");
        }
    })
}