$(function () {
    // Login Button Click 
    $("#btnLogout").click(function () {
        $("#hdEmail").val("");
        $("#hdEmpno").val("");
        $("#hdEmpname").val("");
        $("#lblEmpname").val("");
        $("#lblEmpno").val("");
        location.href = "login";
    });
});