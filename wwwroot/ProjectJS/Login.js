$(function () {
    // Login Button Click 
    $("#btnLogin").click(function () {
        if (validtion() === true) {
            let uname = $("#txtEmail").val();
            let password = $("#txtPassword").val();
            let url = "api/login/validlogin";
            let info = {
                "Uname": uname,
                "pwd": password
            }
            $.ajax({
                url: url,
                type: "POST",
                data:info,
                success: function (result) {
                    //console.log(result);
                    if (result[0].truefalse === true ) {
                        /*location.href = "Ticket";*/
                        location.href = "Dashboard";
                    }
                    else {
                        location.href = "login";
                    }
                }
            });
        }
    });
    function validtion() {
        let txtEmail = $("#txtEmail");
        let txtPassword = $("#txtPassword");

        if (txtEmail.val() == '') {
            alert("User Email is missing....");
            txtEmail.focus();
            return false;
        }
        if (txtPassword.val() == '') {
            alert("User Password is missing....");
            txtPassword.focus();
            return false;
        }
            return true;
    }

// End 
});