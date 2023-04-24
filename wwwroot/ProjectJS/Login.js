$(function () {

    $("#btnShowReg").on('click', function () {
        $(this).addClass("d-none");
        $("#btnShowLogin").removeClass("d-none");
        $("#frmLogin").addClass("d-none");
        $("#frmReg").removeClass("d-none");
        $("#lblFormHeading").text("");
        $("#lblFormHeading").text("User Registration");
    });
    $("#btnShowLogin").on('click', function () {
        $(this).addClass("d-none");
        $("#btnShowReg").removeClass("d-none");
        $("#frmLogin").removeClass("d-none");
        $("#frmReg").addClass("d-none");
        $("#lblFormHeading").text("");
        $("#lblFormHeading").text("User Login");
    });

    $("#btnEmpReg").click(function () {
        let param = { empemail: $("#txtEmpEmail").val(), Empname: $("#txtEmpName").val(), Password: $("#txtEmpPass").val() };
        let url = "api/login/ResgisterEmp";

        $.ajax({
            url: url,
            type: "POST",
            data: param,
            //processData: false,
            //contentType: false,
            //dataType: 'json',
            //contentType: "multipart/mixed",
            success: function (msg) {
                alert(msg);
                window.location.href = "Login";
            }
        });
    })

    // Login Button Click 
    $("#btnLogin").click(function () {
        if (validtion() === true) {
            let uname = $("#txtEmail").val();
            let password = $("#txtPassword").val();
            let url = "api/login/validlogin";
            let info = {
                empemail: uname,
                Password: password
            }
            //$.ajax({
            //    url: url,
            //    type: "POST",
            //    data:info,
            //    success: function (result) {
            //        //console.log(result);
            //        if (result[0].truefalse === true ) {
            //            /*location.href = "Ticket";*/
            //            location.href = "Dashboard";
            //        }
            //        else {
            //            location.href = "login";
            //        }
            //    }
            //});
            $.get(url, info, function (data, status, xhr, dataType) {
                //console.log(data, dataType);
                if (data.includes("Invalid Credentials") == true) {
                    alert(data);
                    location.href = "login";
                }
                else {
                    location.href = "Dashboard";
                }
            })
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

});