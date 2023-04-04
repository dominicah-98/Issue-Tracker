$(function () {
    let useremail = $("#hdEmail").val();
    //let userType = "";
    // ticket List
    TicketList()
    //let userType = String($("#hdEmpType").val());
    //console.log(userType);
    function TicketList() {
        let url = "api/ticket/ticketlist";
        let data = { "username": $("#hdEmail").val() };

        $.get(url, data, function (data) {
            //console.log(data);
            let str = "";
            data.map(function (value) {
                //console.log(value);
                str = str + "<tr>";

                // Raised By 
                str = str + "<td>"
                str = str + "<input type='hidden' id='IDTicket' Value='" + value.idTicket +"'"+ "/>"
                str = str + value.raisedBy
                str = str + "</td>"

                // Raised Date
                str = str + "<td>"
                str = str + value.raisedDate
                str = str + "</td>"

                // Ticket No
                str = str + "<td>"
                str = str + value.ticketNo
                str = str + "</td>"

                // Category
                str = str + "<td>"
                str = str + value.category.name 
                str = str + "</td>"

                // Priority
                if (value.priority.name == "NORMAL") {
                    str = str + "<td class='text-secondary'>" + value.priority.name + "</td>";
                }
                if (value.priority.name == "URGENT") {
                    str = str + "<td class='text-indigo'>" + value.priority.name + "</td>";
                }
                if (value.priority.name == "VERY URGENT") {
                    str = str + "<td class='text-danger'>" + value.priority.name + "</td>";
                }
                if (value.priority.name == "ASAP") {
                    str = str + "<td><span class='badge text-bg-danger'>" + value.priority.name + "<span></td>";
                }

                // Application
                str = str + "<td>"
                str = str + value.application.name
                str = str + "</td>"

                // Issue Desc
                str = str + "<td>"
                str = str + value.issueDesc
                str = str + "</td>"

                // Status
                if (value.status.name == "OPEN") {
                    str = str + "<td class='text-warning fw-bold'>" + value.status.name + "</td>";
                }
                if (value.status.name == "CLOSE") {
                    str = str + "<td class='text-danger fw-bold'>" + value.status.name + "</td>";
                }
                if (value.status.name == "ALLOCATED") {
                    str = str + "<td class='text-success fw-bold'>" + value.status.name + "</td>";
                }
                if (value.status.name == "SOLVED") {
                    str = str + "<td class='text-primary fw-bold'>" + value.status.name + "</td>";
                }
                if (value.status.name == "REVIEW") {
                    txt1 += "<td class='text-info fw-bold'>" + value.status.name + "</td>";
                }

                // Detail<i class="fa-sharp fa-solid fa-calendar-day"></i>
                /*str = str + "<td> <input type='Button' id='btnDetail' class='btn btn-sm btn-success' data-value='" + value.idTicket + "' value='Detail'>"*/
                str = str + "<td> <i class='fa-solid fa-circle-info text-primary fa-2xl me-2' id='btnDetail'  data-value='" + value.idTicket + "'></i>"
                if (value.status.name != "OPEN") {
                    /*str = str + "<input type='Button' id='' class='btn btn-sm btn-warning' disabled data-value='" + value.idTicket + "' value='Edit'>"*/
                    str = str + "<i class='fa-solid fa-pen-to-square text-secondary fa-2xl ms-2 d-none' data-value='" + value.idTicket + "'></i>";
                }
                else {
                    /*str = str + "<input type='Button' id='btnEdit' class='btn btn-sm btn-warning' data-value='" + value.idTicket + "' value='Edit'>";*/
                    str = str + "<i class='fa-solid fa-pen-to-square text-warning fa-2xl ms-2 d-none' id='btnEdit' data-value='" + value.idTicket + "'></i>"
                }
                //});
                str = str + "</td>"
                str = str + "</tr>" 
            });
            $("#tblTicketBody").append(str);
        });

        let url1 = "api/ticket/AdminUserList";
        let param = { "useremail": useremail };
        $.get(url1, param, function (data) {
            data.map(function (x) {
                //console.log(x.admin);
                $("#hdEmpType").val(x.admin);
            });
        });

        //userType = String($("#hdEmpType").val());
        //if (userType == "false") {
        //    $("#divAssignTickets").removeClass("d-none");
        //}
    }

    //Insert Ticket
    $("#btnAddticket").click(function () {
        // Modal Data before modal opening
        ModalDefault()
        $("#divImage").hide();
        $("#txtIssue").val("");
        $('#modalAddticket').modal('show');
    });
    //Closing Insert Modal
    $("#btnClose").click(function () {
        $("#divImage").hide();
        $('#modalAddticket').modal('hide');
    });

    //Saving/ Updating Ticket
    $("#btnSaveTicket").click(function () {
        if (Validation() === true) {
            var file = $("#txtImage").get(0).files[0];
            let filepath = "/TicketImg/" + $("#txtNo").val() + "/" + file.name;

            var formData = new FormData();
            formData.append("IDTicket", $("#hdIDTicket").val());
            formData.append("TicketNo", $("#txtNo").val());
            formData.append("Priority.IDMisc", $("#ddlPriority").val());
            formData.append("Category.IDMisc", $("#ddlCategory").val());
            formData.append("Application.IDMisc", $("#ddlApplication").val());
            formData.append("IssueDesc", $("#txtIssue").val());
            formData.append("Raisedby", useremail);
            formData.append("PicturePath", filepath);
            formData.append("File", $("#txtImage").get(0).files[0]);

            //for (var pair of formData.entries()) {
            //    console.log(pair[0] + ',' + pair[1]);

            let url = "api/ticket/ticketsave";

            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'json',
                //contentType: "multipart/mixed",
                success: function (msg) {
                    alert(msg);
                    window.location.href = "Ticket";
                }
            });
        }
    });

    //Showing Ticket Details
    $("#tblTicket").on('click', '#btnDetail', function () {
        let idTicket = $(this).attr("data-value");
        let userType = String($("#hdEmpType").val());
        //console.log(userType);
        if (userType == "false" || userType == "") {
            //console.log("Test");
            $("#btnAddAssign").addClass("d-none");
        }
        ShowTicketDetails(idTicket);
        $("#ModalTicketDetail").modal('show');
    });

    //Assigning tickets to developers
    $("#btnAddAssign").click(function () {
        $("#lblAssignedDev").addClass("d-none");
        $("#btnAddAssign").addClass("d-none");
        $("#btnAssignDev").removeClass("d-none");
        $("#btnCancelAssign").removeClass("d-none");
        $("#ddlAssignDev").removeClass("d-none");

        // Developer
        url = "api/ticket/DevList";
        $.get(url, function (data) {
            $("#ddlAssignDev").empty();
            $("#ddlAssignDev").append("<option value=''>Assign Developer</option>");
            data.map(function (x) {
                $("#ddlAssignDev").append("<option value=" + x.email + ">" + x.name + "</option>");
            });
        });
    });
    $("#btnAssignDev").click(function () {
        let idTicket = $("#hdDetailIDTicket").val();
        let devMail = $("#ddlAssignDev").val();
        let allocateBy = useremail;
        let url = "api/ticket/DevAssign";
        let param = { IDTicket: idTicket, IDAllocatedTo: devMail, IDAllocateby: allocateBy };
        //console.log(param);

        $.ajax({
            url: url,
            type: "POST",
            data: param,
            success: function (msg) {
                alert("Assigned Successfully!!");
                //window.location.href = "Ticket";
                $("#lblAssignedDev").removeClass("d-none");
                $("#btnAddAssign").removeClass("d-none");
                $("#btnAssignDev").addClass("d-none");
                $("#ddlAssignDev").addClass("d-none");
                $("#btnCancelAssign").addClass("d-none");
                ShowTicketDetails(idTicket);
            }
        });
    });
    $("#btnCancelAssign").click(function () {
        $("#lblAssignedDev").removeClass("d-none");
        $("#btnAddAssign").removeClass("d-none");
        $("#btnAssignDev").addClass("d-none");
        $("#ddlAssignDev").addClass("d-none");
        $("#btnCancelAssign").addClass("d-none");
    });

    //Changing Ticket Status
    $("#btnStatusEdit").click(function () {
        //let userType = String($("#hdEmpType").val());
        $("#lblStatus").addClass("d-none");
        $("#btnStatusEdit").addClass("d-none");
        $("#btnSaveStatus").removeClass("d-none");
        $("#btnCancelStatus").removeClass("d-none");
        $("#ddlChngStatus").removeClass("d-none");

        // Status Dropdown
        url = "api/ticket/statuslist";
        $.get(url, function (data) {
            $("#ddlChngStatus").empty();
            $("#ddlChngStatus").append("<option value=''>Select Status</option>");
            data.map(function (x) {
                if (userType == "false") {
                    if (x.name == 'SOLVED') {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                else {
                    $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                }
            });
        });
    });
    $("#btnSaveStatus").click(function () {
        let idTicket = $("#hdDetailIDTicket").val();
        let idStatus = $("#ddlChngStatus").val();
        let url = "api/ticket/ticketsave";
        let param = { "IDTicket": idTicket, "Status.IDMisc": idStatus };
        //console.log(param);

        $.ajax({
            url: url,
            type: "POST",
            data: param,
            success: function (msg) {
                alert("Status Successfully Changed");
                //window.location.href = "Ticket";
                $("#lblStatus").removeClass("d-none");
                $("#btnStatusEdit").removeClass("d-none");
                $("#ddlChngStatus").addClass("d-none");
                $("#btnCancelStatus").addClass("d-none");
                $("#btnSaveStatus").addClass("d-none");
                ShowTicketDetails(idTicket);
            }
        });
    });
    $("#btnCancelStatus").click(function () {
        $("#lblStatus").removeClass("d-none");
        $("#btnStatusEdit").removeClass("d-none");
        $("#ddlChngStatus").addClass("d-none");
        $("#btnCancelStatus").addClass("d-none");
        $("#btnSaveStatus").addClass("d-none");
    });
    //Closing Details Modal
    $("#btnCloseDetail").click(function () {
        //$("#ModalTicketDetail").modal('hide');
        $("#lblAssignedDev").text("");
        window.location.href = "Ticket";
    });
    $("#tblTicket").on('click', '#btnEdit', function () {
        //let userType = String($("#hdEmpType").val());
        //console.log(userType);
        if (userType == "false") {
            alert("You Can't Edit this Survey!!");
        }
        else {
            ModalDefault1();
            $("#divImage").show();
            $('#modalAddticket').modal('show');
            let IDTicket = $(this).attr("data-value");
            let data = { "IDTicket": IDTicket, "RaisedBy": useremail };
            let url = "api/ticket/TicketDetail";
            $.get(url, data, function (data) {
                data.map(function (value) {
                    console.log(value);
                    $("#txtIssue").val(value.issueDesc);
                    $("#txtNo").val(value.ticketNo);
                    $("#hdIDTicket").val(value.idTicket);
                    $("#Image").attr("src", value.picturePath);
                    $('#ddlPriority option:contains("' + value.priority.name + '")').attr("selected", "selected");
                    $('#ddlApplication option:contains("' + value.application.name + '")').attr("selected", "selected");
                    $('#ddlCategory option:contains("' + value.category.name + '")').attr("selected", "selected");
                })
            })
        }
    })

    $("#txtImage").change(function () {
        var file = $("#txtImage").get(0).files[0];
        console.log(file);
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(event.target.result);
                $("#Image").attr("src", event.target.result);
            }
            reader.readAsDataURL(file);
        }
    });
    $("#Image").hover(function () {
        $(this).css({ width: "100%", height: "100%" });
    }).mouseleave(function () {
        $(this).css({ width: "auto", height: "auto" });
    });

    $("#btnDashboard").click(function () {
        location.replace(window.location.origin + "/Dashboard");
    });

    function Validation() {

        return true;
    }
    function ModalDefault() {
        // Date Format from JQuery UI
        //$("txtStartDate")
        //$("#txtStartDate").datepicker({
        //    dateFormat: 'dd-M-yy'
        //});
        //$("#txtEndDate").datepicker({
        //    dateFormat: 'dd-M-yy'
        //});

        // Ticket NO
        let url = "api/ticket/ticketno";
        $.get(url, function (data) {
            $("#txtNo").val(data);
        });
        // Priority
        url = "api/ticket/prioritylist";
        $.get(url, function (data) {
            $("#ddlPriority").empty();
            data.map(function (x) {
                $("#ddlPriority").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // application list
        url = "api/ticket/applicationlist";
        $.get(url, function (data) {
            //console.log(data);
            $("#ddlApplication").empty();
            data.map(function (x) {
                $("#ddlApplication").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // Category list
        url = "api/ticket/categorylist";
        $.get(url, function (data) {
            $("#ddlCategory").empty();
            data.map(function (x) {
                $("#ddlCategory").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
    }
    function ModalDefault1() {
        // Priority
        url = "api/ticket/prioritylist";
        $.get(url, function (data) {
            $("#ddlPriority").empty();
            data.map(function (x) {
                $("#ddlPriority").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // application list
        url = "api/ticket/applicationlist";
        $.get(url, function (data) {
            console.log(data);
            $("#ddlApplication").empty();
            data.map(function (x) {
                $("#ddlApplication").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // Category list
        url = "api/ticket/categorylist";
        $.get(url, function (data) {
            $("#ddlCategory").empty();
            data.map(function (x) {
                $("#ddlCategory").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
    }
    function ShowTicketDetails(idTicket) {
        let url = "api/ticket/TicketDetail";
        let param = { IDTicket: idTicket, RaisedBy: $("#hdEmail").val() };
        $.ajaxSetup({ async: false });
        $.get(url, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                $("#hdDetailIDTicket").val(x.idTicket);
                $("#lblTicketName").text(x.ticketNo);
                $("#lblTicketDetail").text(x.issueDesc);
                $("#lblPriority").text(x.priority.name);
                $("#lblCategory").text(x.category.name);
                $("#lblStatus").text(x.status.name);
                $("#lblApplication").text(x.application.name);
                $("#lblRaisedBy").text(x.raisedBy);
                $("#lblRaisedDate").text(x.raisedDate);
                $("#imgTicket").attr('src', x.picturePath);
                $("#imgTicket").attr('alt', x.picturePath);

                if (x.priority.name == "NORMAL") {
                    $("#lblPriority").removeClass();
                    $("#lblPriority").addClass("text-secondary");
                }
                else if (x.priority.name == "URGENT") {
                    $("#lblPriority").removeClass();
                    $("#lblPriority").addClass("text-primary");
                }
                else if (x.priority.name == "VERY URGENT") {
                    $("#lblPriority").removeClass();
                    $("#lblPriority").addClass("text-danger");
                }
                else if (x.priority.name == "ASAP") {
                    $("#lblPriority").removeClass();
                    $("#lblPriority").addClass("badge text-bg-danger");
                }

                if (x.status.name == "OPEN") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-dark");
                }
                else if (x.status.name == "CLOSE") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-danger fw-bold");
                }
                else if (x.status.name == "ALLOCATED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-warning fw-bold");
                }
                else if (x.status.name == "SOLVED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-primary fw-bold");
                }
                else if (x.status.name == "REVIEW") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-info fw-bold");
                }

                //For getting Developer Name
                url = "api/ticket/DevAssignedDetails";
                let param = { "IDTicket": x.idTicket };
                /*$.ajaxSetup({ async: false });*/
                $.get(url, param, function (data) {
                    //console.log(data);
                    if (data.length === 0) {
                        $("#lblAssignedDev").text("Not Assigned");
                    }
                    else {
                        data.map(function (x) {
                            $("#lblAssignedDev").text(x.devName);
                        });
                    }
                });
            });
        });
    }
});