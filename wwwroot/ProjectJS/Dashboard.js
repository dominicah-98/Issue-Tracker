$(function () {
    let useremail = $("#hdEmail").val();
    let username = $("#lblEmpname").text();
    let url1 = "api/ticket/AdminUserType";
    let param = { "useremail": useremail };

    //Default();
    $.get(url1, param, function (data) {
        //console.log(data);
        if (data.length > 0) {
            data.map(function (x) {
                //console.log(x);
                $("#hdEmpType").val(String(x.admin));
                if (x.admin == true) {
                    //Admin();
                    $("#lblSwitch").text("");
                    $("#lblSwitch").text("Admin");
                }
                else if (x.admin == false) {
                    //Developer();
                    $("#lblSwitch").text("");
                    $("#lblSwitch").text("Developer");
                }
            });
        }
        else {
            $("#chkSwitch").attr("disabled", "disabled");
            $("#lblSwitch").text("");
            $("#lblSwitchUser").addClass("fw-bold");
            //User();
        }
    });
    User();
    userBarChart();
    //User/Developer/Admin dashboard switch
    $("#chkSwitch").click(function () {
        if(this.checked) {
            if ($("#hdEmpType").val() == "true") {
                Admin();
                adminBarChart();
                adminLineChart();
                $("#lblSwitchUser").removeClass("fw-bold");
                $("#lblSwitchUser").addClass("small");
                $("#lblSwitch").addClass("fw-bold");
                $("#lblSwitch").removeClass("small");
                $("#hdDashType").val("Admin");
            }
            else {
                Developer();
                devLineChart();
                $("#lblSwitchUser").removeClass("fw-bold");
                $("#lblSwitch").addClass("fw-bold");
                $("#lblSwitchUser").addClass("small")
                $("#lblSwitch").removeClass("small");
                $("#hdDashType").val("Developer");
            }
        }
        else {
            location.reload(true);
        }
    });

    //User
    $("#tblTicketList").on('click','#lblIssueDash',function () {
        alert($(this).attr("data-content"));
    });
    $("#btnAllTicketList").click(function () {
        let listType = $(this).attr("data-type");
        $("#hdListStatusType").val("");
        $("#hdListStatusType").val(listType);
        //console.log(listType);
        let url = "";
        if (listType == "all") {
            if ($("#cardTotalTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketdashlistAllUser";
            }
        }
        else if (listType == "open") {
            if ($("#cardOpenTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketopenListAllUser";
            }
            
        }
        else if (listType == "solved") {
            if ($("#cardSolvedTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketsolvedListAllUser";
            }
        }
        else if (listType == "close") {
            if ($("#cardClosedTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketclosedListAllUser";
            }
        }
        //console.log(url);
        //let url = "api/ticket/ticketlist";
        TicketList(url);
        $("#ModalTicketDetail").modal('show');
    })
    $("#btnAllTicket").click(function () {
        let url1 = "api/ticket/ticketdashlist";
        let param1 = { "username": useremail };
        TicketDashList(url1, param1);
        $("#btnAllTicketList").attr("data-type", "");
        $("#btnAllTicketList").attr("data-type", "all");
    })
    $("#btnOpenTicketList").click(function () {
        let url1 = "api/ticket/ticketopenListDash";
        let param1 = { "username": useremail };
        TicketDashList(url1, param1);
        $("#btnAllTicketList").attr("data-type","");
        $("#btnAllTicketList").attr("data-type","open");
    });
    $("#btnSolvedTicketList").click(function () {
        let url1 = "api/ticket/ticketsolvedListDash";
        let param1 = { "username": useremail };
        TicketDashList(url1, param1);
        $("#btnAllTicketList").attr("data-type", "");
        $("#btnAllTicketList").attr("data-type", "solved");
    });
    $("#btnClosedTicketList").click(function () {
        let url1 = "api/ticket/ticketclosedListDash";
        let param1 = { "username": useremail };
        TicketDashList(url1, param1);
        $("#btnAllTicketList").attr("data-type", "");
        $("#btnAllTicketList").attr("data-type", "close");
    });
    $("#btnCloseTicketList").click(function () {
        $("#ModalTicketDetail").modal('hide');
        let userType = $("#hdDashType").val();
        console.log(userType);
        if (userType == "Admin") {
            //userRole = "Admin";
            Admin();
            adminBarChart();
            adminLineChart();
        }
        else if (userType == "Developer") {
            //userRole = "Developer";
            Developer();
            devLineChart();
        }
        else {
            //userRole = "User";
            User();
            userBarChart();
        }
        //window.location.href = "Dashboard";
    });

    //Developer
    $("#btnDevAllTicketList").click(function () {
        let listType = $(this).attr("data-type");
        let param = { "useremail": useremail };
        $("#hdListDevType").val("");
        $("#hdListDevType").val(listType);

        let url = "";
        if (listType == "all") {
            if ($("#cardTotalTicketDev").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/dashboardticketlistDevAll";
            }
        }
        else if (listType == "allocated") {
            if ($("#cardAllocatedTicketDev").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketDevAssignedListAll";
            }
        }
        else if (listType == "solved") {
            if ($("#cardSolvedTicketDev").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketsolvedDevListAll";
            }
        }
        else if (listType == "close") {
            if ($("#cardClosedTicketDev").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketclosedDevListAll";
            }
        }
        //console.log(listType);
        DevList(url, param);
        $("#ModalDeveloperList").modal('show');
    });
    $("#btnAllTicketDev").click(function () {
        let url1 = "api/ticket/dashboardticketlistDev";
        let param1 = { "useremail": useremail };
        TicketDashListDev(url1, param1);
        $("#btnDevAllTicketList").attr("data-type", "");
        $("#btnDevAllTicketList").attr("data-type", "all");
    })
    $("#btnAllocTicketDev").click(function () {
        let url1 = "api/ticket/ticketDevAssignedListDash";
        let param1 = { "useremail": useremail };
        TicketDashListDev(url1, param1);
        $("#btnDevAllTicketList").attr("data-type", "");
        $("#btnDevAllTicketList").attr("data-type", "allocated");
    });
    $("#btnSolvedTicketDev").click(function () {
        let url1 = "api/ticket/ticketsolvedDevListDash";
        let param1 = { "useremail": useremail };
        TicketDashListDev(url1, param1);
        $("#btnDevAllTicketList").attr("data-type", "");
        $("#btnDevAllTicketList").attr("data-type", "solved");
    });
    $("#btnClosedTicketDev").click(function () {
        let url1 = "api/ticket/ticketclosedDevListDash";
        let param1 = { "useremail": useremail };
        TicketDashListDev(url1, param1);
        $("#btnDevAllTicketList").attr("data-type", "");
        $("#btnDevAllTicketList").attr("data-type", "close");
    });
    $("#btnCloseDevTicketList").click(function () {
        $("#ModalDeveloperList").modal('hide');
        let userType = $("#hdDashType").val();
        console.log(userType);
        if (userType == "Admin") {
            //userRole = "Admin";
            Admin();
            adminBarChart();
            adminLineChart();
        }
        else if (userType == "Developer") {
            //userRole = "Developer";
            Developer();
            devLineChart();
        }
        else {
            //userRole = "User";
            User();
            userBarChart();
        }
        //Developer();
        //devLineChart();
    });

    //Admin
    $("#btnAllTicketListAdm").click(function () {
        let listType = $(this).attr("data-type");
        let param = { "useremail": useremail };
        $("#hdListAdmType").val("");
        $("#hdListAdmType").val(listType);

        let url = "";
        if (listType == "all") {
            if ($("#adminDashCardTable").find("#cardTotalTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketlist";
            }
        }
        else if (listType == "open") {
            if ($("#adminDashCardTable").find("#cardOpenTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketlistOpen";
            }

        }
        else if (listType == "solved") {
            if ($("#adminDashCardTable").find("#cardSolvedTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketlistSolved";
            }
        }
        else if (listType == "close") {
            if ($("#adminDashCardTable").find("#cardClosedTicket").html() == 0) {
                alert("There are no tickets to show");
                return false;
            }
            else {
                url = "api/ticket/ticketlistClosed";
            }
        }
        //console.log(url);
        //let url = "api/ticket/ticketlist";
        TicketList(url);
        $("#ModalTicketDetail").modal('show');
    });
    $("#btnAllTicketadm").click(function () {
        let url1 = "api/ticket/ticketlistAdminDash";
        let param1 = { "username": useremail };
        TicketDashListAdm(url1, param1);
        $("#btnAllTicketListAdm").attr("data-type", "");
        $("#btnAllTicketListAdm").attr("data-type", "all");
    })
    $("#btnOpenTicketListadm").click(function () {
        let url1 = "api/ticket/ticketOpenAdminDashList";
        let param1 = { "username": useremail };
        TicketDashListAdm(url1, param1);
        $("#btnAllTicketListAdm").attr("data-type", "");
        $("#btnAllTicketListAdm").attr("data-type", "open");
    });
    $("#btnSolvedTicketListadm").click(function () {
        let url1 = "api/ticket/ticketlistSolvedAdminDash";
        let param1 = { "username": useremail };
        TicketDashListAdm(url1, param1);
        $("#btnAllTicketListAdm").attr("data-type", "");
        $("#btnAllTicketListAdm").attr("data-type", "solved");
    });
    $("#btnClosedTicketListadm").click(function () {
        let url1 = "api/ticket/ticketlistClosedAdminDash";
        let param1 = { "username": useremail };
        TicketDashListAdm(url1, param1);
        $("#btnAllTicketListAdm").attr("data-type", "");
        $("#btnAllTicketListAdm").attr("data-type", "close");
    });
    $("#btnCloseTicketList").click(function () {
        $("#ModalTicketDetail").modal('hide');
        let userType = $("#hdDashType").val();
        console.log(userType);
        if (userType == "Admin") {
            //userRole = "Admin";
            Admin();
            adminBarChart();
            adminLineChart();
        }
        else if (userType == "Developer") {
            //userRole = "Developer";
            Developer();
            devLineChart();
        }
        else {
            //userRole = "User";
            User();
            userBarChart();
        }
        //window.location.href = "Dashboard";
    });
    $("#btnDevAllcTicketList").click(function () {
        //let listType = $(this).attr("data-type");
        //let param = { "useremail": useremail };
        //$("#hdListDevType").val("");
        //$("#hdListDevType").val(listType);

        let url = "api/ticket/dashboardAllocticketlistAdmall";
        
        //console.log(listType);
        DevListAdm(url);
        $("#ModalDeveloperList").modal('show');
    });

    //Insert Ticket
    $("#btnAddticket").click(function () {
        // Modal Data before modal opening
        ModalDefault()
        $("#divImage").hide();
        $("#txtIssue").val("");
        $('#modalAddticket').modal('show');
        //console.log(String($("#hdEmpType").val()));
    });
    //Closing Insert Modal
    $("#btnClose").click(function () {
        //$("#divImage").hide();
        $('#modalAddticket').modal('hide');
    });
    $("#btnSaveTicket").click(function () {
        if (Validation() == true) {
            var file = $("#txtImage").get(0).files[0];
            if (file != null) {
                filepath = "/TicketImg/" + $("#txtNo").val() + "/" + file.name;
            }
            else {
                filepath = "";
            }
            //let filepath = "/TicketImg/" + $("#txtNo").val() + "/" + file.name;

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

            let url = "api/ticket/ticketsaveDash";

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
                    window.location.href = "Dashboard";
                }
            });
        }
    });

    //Ticket Detail
    //Showing Ticket Details
    $("#tblTicket").on('click', '#btnDetail', function () {
        let idTicket = $(this).attr("data-value");
        let listType = $(this).attr("data-type");
        let userType = String($("#hdEmpType").val());
        let dashType = $("#hdDashType").val();
        //console.log(userType);
        if ($("#hdDashType").val() != "Admin") {
            $("#btnAddAssign").addClass("d-none");
        }
        else {
            $("#btnAddAssign").removeClass("d-none");
        }
        ShowAssignedTicketDetails(idTicket, listType);
        $("#ModalPerTicketDetail").modal('show');
    });
    $("#tblDevTicket").on('click', '#btnDevTicketDetail', function () {
        let idTicket = $(this).attr("data-value");
        let listType = $(this).attr("data-type");
        //console.log(listType);
        let userType = String($("#hdEmpType").val());
        //console.log(userType);
        if (userType == "false" || userType == "") {
            //console.log("Test");
            $("#btnAddAssign").addClass("d-none");
        }
        ShowAssignedTicketDetails(idTicket, listType);
        $("#ModalPerTicketDetail").modal('show');
    });
    //Closing Details Modal
    $("#btnCloseDetail").click(function () {
        let listTypeUser = $("#hdListStatusType").val();
        let listTypeDev = $("#hdListDevType").val();
        let listTypeAdm = $("#hdListAdmType").val();
        $("#ModalPerTicketDetail").modal('hide');
        console.log(listTypeUser);
        ClearModalDetails();
        if (listTypeUser != "") {
            let url = "";
            if (listTypeUser == "all") {
                url = "api/ticket/ticketdashlistAllUser";
            }
            else if (listTypeUser == "allocated") {
                url = "api/ticket/ticketopenListAllUser";
            }
            else if (listTypeUser == "solved") {
                url = "api/ticket/ticketsolvedListAllUser";
            }
            else if (listTypeUser == "close") {
                url = "api/ticket/ticketclosedListAllUser";
            }
            else if (listTypeUser == "open") {
                url = "api/ticket/ticketopenListAllUser";
            }
            TicketList(url);
        }
        if (listTypeAdm != "") {
            let url = "";
            if (listTypeAdm == "all") {
                url = "api/ticket/ticketlist";
            }
            else if (listTypeAdm == "allocated") {
                url = "api/ticket/ticketopenListAllUser";
            }
            else if (listTypeAdm == "solved") {
                url = "api/ticket/ticketlistSolved";
            }
            else if (listTypeAdm == "close") {
                url = "api/ticket/ticketlistClosed";
            }
            else if (listTypeAdm == "open") {
                url = "api/ticket/ticketlistOpen";
            }
            TicketList(url);
        }
        if (listTypeDev != "") {
            let param = { "useremail": useremail };
            let url = "";
            if (listTypeDev == "all") {
                url = "api/ticket/dashboardticketlistDevAll";
            }
            else if (listTypeDev == "allocated") {
                url = "api/ticket/ticketDevAssignedListAll";
            }
            else if (listTypeDev == "solved") {
                url = "api/ticket/ticketsolvedDevListAll";
            }
            else if (listTypeDev == "close") {
                url = "api/ticket/ticketclosedDevListAll";
            }
            DevList(url,param);
        }
        //window.location.href = "Dashboard";
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
        let param = {
            IDTicket: idTicket,
            IDAllocatedTo: devMail,
            IDAllocateby: allocateBy,
            "sessionUName": username,
            "raisedBy": $("#lblRaisedBy").text(),
            "appName": $("#lblApplication").text()
        };
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
        let listType = $("#hdListType").val();
        let userType = $("#hdEmpType").val();
        let userRole = "";
        if (userType == "true") {
            userRole = "Admin";
        }
        else if (userType == "false") {
            userRole = "Developer";
        }
        else {
            userRole = "User";
        }
        //console.log(listType);
        //console.log(userRole);
        $("#lblStatus").addClass("d-none");
        $("#btnStatusEdit").addClass("d-none");
        $("#btnSaveStatus").removeClass("d-none");
        $("#btnCancelStatus").removeClass("d-none");
        $("#ddlChngStatus").removeClass("d-none");
        $("#txtStatRemarks").removeClass("d-none");

        // Status Dropdown
        let url = "";
        if ($("#hdDashType").val()=="Admin") {
            url = "api/ticket/statuslistAdmin";
        }
        else if ($("#hdDashType").val() == "Developer") {
            url = "api/ticket/statuslistDev";
        }
        else {
            url = "api/ticket/statuslistUser";
        }
        //console.log(listType);
        let param = { "userrole": userRole };
        //let url2 = "api/ticket/TicketDetail";
        //let param2 = { IDTicket: $("#hdDetailIDTicket").val(), RaisedBy: $("#hdEmail").val() };
        $.get(url, param, function (data) {
            $("#ddlChngStatus").empty();
            $("#ddlChngStatus").append("<option value=''>Select Status</option>");
            data.map(function (x) {
                if ($("#lblStatus").text() == "REVIEW") {
                    if (x.name == "OPEN" || x.name == "REVIEW") {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + " disabled='disabled'>" + x.name + "</option>");
                    }
                    else {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                else if ($("#lblStatus").text() == "ALLOCATED") {
                    if (x.name == "OPEN" || x.name == "REVIEW" || x.name == "ALLOCATED") {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + " disabled='disabled'>" + x.name + "</option>");
                    }
                    else {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                else if ($("#lblStatus").text() == "SOLVED") {
                    if (x.name == "OPEN" || x.name == "REVIEW" || x.name == "ALLOCATED" || x.name == "SOLVED") {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + " disabled='disabled'>" + x.name + "</option>");
                    }
                    else {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                else if ($("#lblStatus").text() == "CLOSE") {
                    if (x.name == "OPEN" || x.name == "REVIEW" || x.name == "ALLOCATED" || x.name == "SOLVED" || x.name == "CLOSE") {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + " disabled='disabled'>" + x.name + "</option>");
                    }
                    else {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                else if ($("#lblStatus").text() == "OPEN") {
                    if (x.name == "OPEN") {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + " disabled='disabled'>" + x.name + "</option>");
                    }
                    else {
                        $("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
                    }
                }
                //$("#ddlChngStatus").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });


    });
    $("#btnSaveStatus").click(function () {
        let idTicket = $("#hdDetailIDTicket").val();
        let idStatus = $("#ddlChngStatus").val();
        let url = "api/ticket/ticketsaveDash";
        let param = { "IDTicket": idTicket, "Status.IDMisc": idStatus, "RaisedBy": $("#hdEmail").val(), "Remarks.Remarks": $("#txtStatRemarks").val(), "changedBy": useremail };
        //console.log(param);

        $.ajax({
            url: url,
            type: "POST",
            data: param,
            success: function (msg) {
                //alert(msg);
                alert("Status Successfully Changed");
                //window.location.href = "Ticket";
                $("#lblStatus").removeClass("d-none");
                $("#btnStatusEdit").removeClass("d-none");
                $("#ddlChngStatus").addClass("d-none");
                $("#txtStatRemarks").addClass("d-none");
                $("#btnCancelStatus").addClass("d-none");
                $("#btnSaveStatus").addClass("d-none");
                //ShowTicketDetails(idTicket);
                ShowAssignedTicketDetails(idTicket, "");
            }
        });
    });
    $("#btnCancelStatus").click(function () {
        $("#lblStatus").removeClass("d-none");
        $("#btnStatusEdit").removeClass("d-none");
        $("#ddlChngStatus").addClass("d-none");
        $("#txtStatRemarks").addClass("d-none");
        $("#btnCancelStatus").addClass("d-none");
        $("#btnSaveStatus").addClass("d-none");
    });
    $("#ddlApplication").change(function () {
        let data = parseInt($(this).val());
        let url = "api/ticket/ApplicationCategoryMap";
        let param = { "Application": data };
        //console.log(param);
        $.get(url, param, function (data) {
            data.map(function (x) {
                //console.log(x);

                $("#ddlCategory option[value = " + x.idCat + "]").attr('selected', 'selected');
            });
        });
    });

    function Admin() {
        $("#userDashCardTable").addClass("d-none");
        $("#btnAddticket").addClass("d-none");
        $("#devDashCardTable").addClass("d-none");
        $("#adminDashCardTable").removeClass("d-none");

        let url1 = "api/ticket/ticketlistAdminNo";
        let param1 = { "username": useremail };
        $.get(url1, param1, function (data) {
            $("#adminDashCardTable").find("#cardTotalTicket").html(data);
        });

        let url2 = "api/ticket/ticketlistOpenAdminNo";
        //let param1 = { "username": useremail };
        $.get(url2, param1, function (data) {
            $("#adminDashCardTable").find("#cardOpenTicket").html(data);
        });

        let url3 = "api/ticket/ticketlistClosedAdminNo";
        //let param1 = { "username": useremail };
        $.get(url3, param1, function (data) {
            $("#adminDashCardTable").find("#cardClosedTicket").html(data);
        });

        let url4 = "api/ticket/ticketlistSolvedAdminDashNo";
        //let param1 = { "username": useremail };
        $.get(url4, param1, function (data) {
            $("#adminDashCardTable").find("#cardSolvedTicket").html(data);
        });

        let url5 = "api/ticket/ticketlistAdminDash";
        TicketDashListAdm(url5, param1);
        $("#divRecentActivities").removeClass("d-none");

        let url6 = "api/ticket/ticketAssigned";
        //let param1 = { "username": useremail };
        let txt2 = "";
        $("#tblAssignedListAdm").empty();
        $.get(url6, function (data) {
            let count2 = 1;
            data.map(function (x) {
                //console.log(x);
                txt2 += "<tr>";
                txt2 += "<td>" + count2 + "</td>";
                txt2 += "<td>" + x.ticketNo + "</td>";
                txt2 += "<td>" + x.allocationDate + "</td>";
                txt2 += "<td>" + x.applicationName + "</td>";
                if (x.priority == "NORMAL") {
                    txt2 += "<td class='text-secondary'>" + x.priority + "</td>";
                }
                if (x.priority == "URGENT") {
                    txt2 += "<td class='text-indigo'>" + x.priority + "</td>";
                }
                if (x.priority == "VERY URGENT") {
                    txt2 += "<td class='text-danger'>" + x.priority + "</td>";
                }
                if (x.priority == "ASAP") {
                    txt2 += "<td><span class='badge text-bg-danger'>" + x.priority + "<span></td>";
                }
                txt2 += "<td>" + x.allocatedTo + "</td>";
                txt2 += "</tr>";
                count2++;
            })
            $("#tblAssignedListAdm").append(txt2);
        });
        $("#divDevActivities").removeClass("d-none");
        $("#admChart2").removeClass("d-none");
    }
    function Developer() {
        //$("#cardClosed").addClass("d-none");
        $("#userDashCardTable").addClass("d-none");
        $("#btnAddticket").addClass("d-none");
        $("#adminDashCardTable").addClass("d-none");
        $("#devDashCardTable").removeClass("d-none");
        //$("#lblAllTicket").text("");
        //$("#lblAllTicket").text("Tickets Allocated");
        //$("#lblAllocTickets").text("");
        //$("#lblAllocTickets").text("Currently Allocated");

        let url1 = "api/ticket/dashboardticketlistDevNo";
        let param1 = { "useremail": useremail };
        $.get(url1, param1, function (data) {
            $("#cardTotalTicketDev").html(data);
        });

        //let url2 = "api/ticket/ticketopenDev";
        ////let param1 = { "username": useremail };
        //$.get(url2, param1, function (data) {
        //    $("#cardOpenTicket").html(data);
        //});

        let url3 = "api/ticket/ticketDevAssignedCount";
        //let param1 = { "username": useremail };
        $.get(url3, param1, function (data) {
            $("#cardAllocatedTicketDev").html(data);
        });

        let url4 = "api/ticket/ticketsolvedDev";
        //let param1 = { "username": useremail };
        $.get(url4, param1, function (data) {
            //$("#lblCard2").html("");
            //$("#lblCard2").html("Assigned Tickets");
            $("#cardSolvedTicketDev").html(data);
        });

        let url5 = "api/ticket/ticketclosedDev";
        //let param1 = { "username": useremail };
        $.get(url5, param1, function (data) {
            $("#cardClosedTicketDev").html(data);
        });

        //$("#divRecentActivities").addClass("d-none");

        //let url5 = "api/ticket/ticketAssignedPerDev";
        ////let param1 = { "username": useremail };
        //let txt2 = "";
        //$.get(url5, param1, function (data) {
        //    let count2 = 1;
        //    data.map(function (x) {
        //        //console.log(x);
        //        txt2 += "<tr>";
        //        txt2 += "<td>" + count2 + "</td>";
        //        txt2 += "<td>" + x.ticketNo + "</td>";
        //        txt2 += "<td>" + x.allocationDate + "</td>";
        //        txt2 += "<td>" + x.applicationName + "</td>";
        //        if (x.priority == "NORMAL") {
        //            txt2 += "<td class='text-secondary'>" + x.priority + "</td>";
        //        }
        //        if (x.priority == "URGENT") {
        //            txt2 += "<td class='text-indigo'>" + x.priority + "</td>";
        //        }
        //        if (x.priority == "VERY URGENT") {
        //            txt2 += "<td class='text-danger'>" + x.priority + "</td>";
        //        }
        //        if (x.priority == "ASAP") {
        //            txt2 += "<td><span class='badge text-bg-danger'>" + x.priority + "<span></td>";
        //        }
        //        txt2 += "<td>" + x.allocatedTo + "</td>";
        //        txt2 += "</tr>";
        //        count2++;
        //    })
        //    $("#tblAssignedList").append(txt2);
        //});

        let url6 = "api/ticket/dashboardticketlistDev";
        TicketDashListDev(url6, param1);
    }
    function User() {
        $("#btnAddticket").removeClass("d-none");
        let url1 = "api/ticket/dashboardticketlist";
        let param1 = { "username": useremail };
        $.get(url1, param1, function (data) {
            //console.log(data);
            $("#userDashCardTable").find("#cardTotalTicket").html(data);
        });

        let url2 = "api/ticket/ticketopen";
        //let param1 = { "username": useremail };
        $.get(url2, param1, function (data) {
            $("#userDashCardTable").find("#cardOpenTicket").html(data);
        });

        //let url3 = "api/ticket/ticketallocated";
        ////let param1 = { "username": useremail };
        //$.get(url3, param1, function (data) {
        //    $("#cardAllocatedTicket").html(data);
        //});

        let url4 = "api/ticket/ticketsolved";
        //let param1 = { "username": useremail };
        $.get(url4, param1, function (data) {
            $("#userDashCardTable").find("#cardSolvedTicket").html(data);
        });

        let url6 = "api/ticket/ticketclosed";
        //let param1 = { "username": useremail };
        $.get(url6, param1, function (data) {
            $("#userDashCardTable").find("#cardClosedTicket").html(data);
        });

        $("#divDevActivities").addClass("d-none");
        $("#admChart2").addClass("d-none");

        let url5 = "api/ticket/ticketdashlist";
        TicketDashList(url5, param1);
        //$("#lblRecentActivities").html("Recent Tickets Generated");
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
            $("#ddlPriority").append("<option value='0'>Select Priority</option>");
            data.map(function (x) {
                $("#ddlPriority").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // application list
        url = "api/ticket/applicationlist";
        $.get(url, function (data) {
            //console.log(data);
            $("#ddlApplication").empty();
            $("#ddlApplication").append("<option value='0'>Select an Application</option>");
            data.map(function (x) {
                $("#ddlApplication").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
        // Category list
        url = "api/ticket/categorylist";
        $.get(url, function (data) {
            $("#ddlCategory").empty();
            $("#ddlCategory").append("<option value='0'>Select a Category</option>");
            data.map(function (x) {
                $("#ddlCategory").append("<option value=" + x.idMisc + ">" + x.name + "</option>");
            });
        });
    }
    function Validation() {
        //console.log($("#ddlApplication").val());
        if ($("#txtIssue").val() == "") {
            alert("Enter the Issue Description");
            $("#txtIssue").focus();
            return false;
        }
        else if ($("#ddlPriority").val() == 0) {
            alert("Choose a priority");
            $("#ddlPriority").focus();
            return false;
        }
        else if ($("#ddlApplication").val() == 0) {
            alert("Choose an Application");
            $("#ddlApplication").focus();
            return false;
        }
        else {
            return true;
        }
    }
    function TicketList(url) {
        let data = { "username": $("#hdEmail").val() };
        $.get(url, data, function (data) {
            //console.log(data);
            $("#tblTicketBody").empty();
            let str = "";
            data.map(function (value) {
                //console.log(value);
                str = str + "<tr>";

                // Raised By 
                str = str + "<td>"
                str = str + "<input type='hidden' id='IDTicket' Value='" + value.idTicket + "'" + "/>"
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
                    str += "<td class='text-info fw-bold'>" + value.status.name + "</td>";
                }

                // Detail<i class="fa-sharp fa-solid fa-calendar-day"></i>
                /*str = str + "<td> <input type='Button' id='btnDetail' class='btn btn-sm btn-success' data-value='" + value.idTicket + "' value='Detail'>"*/
                str = str + "<td> <i class='fa-solid fa-circle-info text-primary fa-2xl me-2' id='btnDetail'  data-value='" + value.idTicket + "' data-type='ticketall'></i>"
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
    }
    function DevList(url, param) {
        let txt2 = "";
        $("#tblAssignedListAll").empty();
        $.get(url, param, function (data) {
            let count2 = 1;
            data.map(function (x) {
                console.log(x);
                txt2 += "<tr>";
                txt2 += "<td>" + count2 + "</td>";
                txt2 += "<td>" + x.ticketNo + "</td>";
                txt2 += "<td>" + x.allocationDate + "</td>";
                txt2 += "<td>" + x.applicationName + "</td>";
                if (x.priority == "NORMAL") {
                    txt2 += "<td class='text-secondary'>" + x.priority + "</td>";
                }
                if (x.priority == "URGENT") {
                    txt2 += "<td class='text-primary'>" + x.priority + "</td>";
                }
                if (x.priority == "VERY URGENT") {
                    txt2 += "<td class='text-danger'>" + x.priority + "</td>";
                }
                if (x.priority == "ASAP") {
                    txt2 += "<td><span class='badge text-bg-danger'>" + x.priority + "<span></td>";
                }
                txt2 += "<td>" + x.allocatedBy + "</td>";
                if (x.status == "OPEN") {
                    txt2 += "<td class='text-warning fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "CLOSE") {
                    txt2 += "<td class='text-danger fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "ALLOCATED") {
                    txt2 += "<td class='text-success fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "SOLVED") {
                    txt2 += "<td class='text-primary fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "REVIEW") {
                    txt2 += "<td class='text-info fw-bold'>" + x.status + "</td>";
                }
                //txt2 += "<td>" + x.status + "</td>";
                txt2 += "<td> <i class='fa-solid fa-circle-info text-primary fa-2xl me-2' id='btnDevTicketDetail' data-value='" + x.idTicket + "' data-type='alloc'></i>";
                txt2 += "</tr>";
                count2++;
            });
            $("#tblAssignedListAll").append(txt2);
        });
    }
    function DevListAdm(url) {
        $("#tblHdrAssigned").text("");
        $("#tblHdrAssigned").text("Assigned To");
        let txt2 = "";
        $("#tblAssignedListAll").empty();
        $.get(url, function (data) {
            console.log(data);
            let count2 = 1;
            data.map(function (x) {
                console.log(x);
                txt2 += "<tr>";
                txt2 += "<td>" + count2 + "</td>";
                txt2 += "<td>" + x.ticketNo + "</td>";
                txt2 += "<td>" + x.allocationDate + "</td>";
                txt2 += "<td>" + x.applicationName + "</td>";
                if (x.priority == "NORMAL") {
                    txt2 += "<td class='text-secondary'>" + x.priority + "</td>";
                }
                if (x.priority == "URGENT") {
                    txt2 += "<td class='text-primary'>" + x.priority + "</td>";
                }
                if (x.priority == "VERY URGENT") {
                    txt2 += "<td class='text-danger'>" + x.priority + "</td>";
                }
                if (x.priority == "ASAP") {
                    txt2 += "<td><span class='badge text-bg-danger'>" + x.priority + "<span></td>";
                }
                txt2 += "<td>" + x.allocatedTo + "</td>";
                if (x.status == "OPEN") {
                    txt2 += "<td class='text-warning fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "CLOSE") {
                    txt2 += "<td class='text-danger fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "ALLOCATED") {
                    txt2 += "<td class='text-success fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "SOLVED") {
                    txt2 += "<td class='text-primary fw-bold'>" + x.status + "</td>";
                }
                if (x.status == "REVIEW") {
                    txt2 += "<td class='text-info fw-bold'>" + x.status + "</td>";
                }
                //txt2 += "<td>" + x.status + "</td>";
                txt2 += "<td> <i class='fa-solid fa-circle-info text-primary fa-2xl me-2' id='btnDevTicketDetail' data-value='" + x.idTicket + "' data-type='alloc'></i>";
                txt2 += "</tr>";
                count2++;
            });
            $("#tblAssignedListAll").append(txt2);
        });
    }
    function ShowTicketDetails(idTicket) {
        //console.log(listType);
        //$("#hdListType").val("");
        //$("#hdListType").val(listType);
        let url = "api/ticket/TicketDetail";
        let param = { IDTicket: idTicket, RaisedBy: $("#hdEmail").val() };
        //let param = { IDTicket: idTicket };
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
                if (x.picturePath != "") {
                    $("#imgTicket").removeClass("d-none");
                    $("#imgTicket").attr('src', x.picturePath);
                    $("#imgTicket").attr('alt', x.picturePath);
                }
                else {
                    $("#imgTicket").addClass("d-none");
                }

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
                    $("#lblStatus").addClass("text-warning");
                }
                else if (x.status.name == "CLOSE") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-danger fw-bold");
                }
                else if (x.status.name == "ALLOCATED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-success fw-bold");
                }
                else if (x.status.name == "SOLVED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-primary fw-bold");
                }
                else if (x.status.name == "REVIEW") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-info fw-bold");
                }

                if (x.status.name == "ALLOCATED" && $("#hdEmpType").val() == "") {
                    $("#btnStatusEdit").addClass("d-none");
                }
                else {
                    $("#btnStatusEdit").removeClass("d-none");
                }
                //For Getting Status Remarks
                let url2 = "api/ticket/StatusRemarks";
                let param2 = { "IDTicket": x.idTicket, "Status": x.status.name };
                $.get(url2, param2, function (data) {
                    //console.log(data);
                    data.map(function (x) {
                        $("#lblStatRemarks").text(x.remarks);
                    })
                });

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
    function ClearModalDetails() {
        $("#lblAssignedDev").text("");
        $("#hdDetailIDTicket").val("");
        $("#lblTicketName").text("");
        $("#lblTicketDetail").text("");
        $("#lblPriority").text("");
        $("#lblCategory").text("");
        $("#lblStatus").text("");
        $("#lblStatRemarks").text("");
        $("#lblApplication").text("");
        $("#lblRaisedBy").text("");
        $("#lblRaisedDate").text("");
        $("#imgTicket").attr('src', "");
        $("#imgTicket").attr('alt', "");
        $("#lblAssignedDev").removeClass("d-none");
        $("#btnAddAssign").removeClass("d-none");
        $("#btnAssignDev").addClass("d-none");
        $("#ddlAssignDev").addClass("d-none");
        $("#btnCancelAssign").addClass("d-none");
        $("#btnStatusEdit").removeClass("d-none");
        $("#ddlChngStatus").addClass("d-none");
        $("#txtStatRemarks").addClass("d-none");
        $("#btnCancelStatus").addClass("d-none");
        $("#btnSaveStatus").addClass("d-none");
    }
    function ShowAssignedTicketDetails(idTicket, listType) {
        //console.log(listType);
        $("#hdListType").val("");
        $("#hdListType").val(listType);
        let url = "api/ticket/ticketDevAllList";
        let param = { "IDTicket": idTicket };
        //let param = { IDTicket: idTicket };
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
                    $("#lblStatus").addClass("text-warning");
                }
                else if (x.status.name == "CLOSE") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-danger fw-bold");
                }
                else if (x.status.name == "ALLOCATED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-success fw-bold");
                }
                else if (x.status.name == "SOLVED") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-primary fw-bold");
                }
                else if (x.status.name == "REVIEW") {
                    $("#lblStatus").removeClass();
                    $("#lblStatus").addClass("text-info fw-bold");
                }

                //For Getting Status Remarks
                let url2 = "api/ticket/StatusRemarks";
                let param2 = { "IDTicket": x.idTicket, "Status": x.status.name };
                $.get(url2, param2, function (data) {
                    //console.log(data);
                    data.map(function (x) {
                        $("#lblStatRemarks").text(x.remarks);
                    })
                });

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
    function TicketDashList(url, param) {
        let txt1 = "";
        /*$("#lblRecentActivities").html("Tickets Generated in Last 7 Days");*/
        //let param1 = { "username": useremail };
        $.get(url, param, function (data) {
            //console.log(data);
            let count1 = 1;
            $("#userDashCardTable").find("#tblTicketList").empty();
            data.map(function (x) {
                //console.log(x);
                txt1 += "<tr>";
                txt1 += "<td>" + count1 + "</td>";
                /*txt1 += "<td>" + x.admin_User.name + "</td>";*/
                /*txt1 += "<td>" + x.ticketNo + "</td>";*/
                txt1 += "<td>";
                txt1 += "<div id='divIssue' style='width: 105px; position:relative;'>";
                txt1 += "<span>" + x.ticketNo +"</span>";
                txt1 += "<p class='mb-0' style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'><b>Issue: </b>" + x.issueDesc +"</p>";
                txt1 += "<span class='tooltip-custom'>" + x.issueDesc +"</span>";
                txt1 += "</div>";
                txt1 += "</td>";
                txt1 += "<td>" + x.raisedDate + "</td>";
                txt1 += "<td>" + x.application.name + "</td>";
                if (x.priority.name == "NORMAL") {
                    txt1 += "<td class='text-secondary'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "URGENT") {
                    txt1 += "<td class='text-indigo'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "VERY URGENT") {
                    txt1 += "<td class='text-danger'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "ASAP") {
                    txt1 += "<td><span class='badge text-bg-danger'>" + x.priority.name + "<span></td>";
                }
                if (x.status.name == "OPEN") {
                    txt1 += "<td class='text-warning fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "CLOSE") {
                    txt1 += "<td class='text-danger fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "ALLOCATED") {
                    txt1 += "<td class='text-success fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "SOLVED") {
                    txt1 += "<td class='text-primary fw-bold'>" + x.status.name + "</td>";
                }
                txt1 += "</tr>";
                count1++;
            })
            $("#userDashCardTable").find("#tblTicketList").append(txt1);
            
            //$('#lblIssueDash').tooltip();
        });
    }
    function TicketDashListAdm(url, param) {
        let txt1 = "";
        /*$("#lblRecentActivities").html("Tickets Generated in Last 7 Days");*/
        //let param1 = { "username": useremail };
        $.get(url, param, function (data) {
            let count1 = 1;
            $("#adminDashCardTable").find("#tblTicketList").empty();
            data.map(function (x) {
                //console.log(x);
                txt1 += "<tr>";
                txt1 += "<td>" + count1 + "</td>";
                txt1 += "<td>" + x.raisedBy + "</td>";
                txt1 += "<td>";
                txt1 += "<div id='divIssue' style='width: 105px; position:relative;'>";
                txt1 += "<span>" + x.ticketNo + "</span>";
                txt1 += "<p class='mb-0' style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'><b>Issue: </b>" + x.issueDesc + "</p>";
                txt1 += "<span class='tooltip-custom'>" + x.issueDesc + "</span>";
                txt1 += "</div>";
                txt1 += "</td>";
                txt1 += "<td>" + x.raisedDate + "</td>";
                txt1 += "<td>" + x.application.name + "</td>";
                if (x.priority.name == "NORMAL") {
                    txt1 += "<td class='text-secondary'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "URGENT") {
                    txt1 += "<td class='text-indigo'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "VERY URGENT") {
                    txt1 += "<td class='text-danger'>" + x.priority.name + "</td>";
                }
                if (x.priority.name == "ASAP") {
                    txt1 += "<td><span class='badge text-bg-danger'>" + x.priority.name + "<span></td>";
                }
                if (x.status.name == "OPEN") {
                    txt1 += "<td class='text-warning fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "CLOSE") {
                    txt1 += "<td class='text-danger fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "ALLOCATED") {
                    txt1 += "<td class='text-success fw-bold'>" + x.status.name + "</td>";
                }
                if (x.status.name == "SOLVED") {
                    txt1 += "<td class='text-primary fw-bold'>" + x.status.name + "</td>";
                }
                txt1 += "</tr>";
                count1++;
            })
            $("#adminDashCardTable").find("#tblTicketList").append(txt1);
        });
    }
    function TicketDashListDev(url,param) {
        let txt2 = "";
        $.get(url, param, function (data) {
            let count2 = 1;
            $("#tblAssignedList").empty();
            data.map(function (x) {
                console.log(x);
                txt2 += "<tr>";
                txt2 += "<td>" + count2 + "</td>";
                txt2 += "<td>";
                txt2 += "<div id='divIssue' style='width: 105px; position:relative;'>";
                txt2 += "<span>" + x.ticketNo + "</span>";
                txt2 += "<p class='mb-0' style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'><b>Issue: </b>" + x.issueDesc + "</p>";
                txt2 += "<span class='tooltip-custom'>" + x.issueDesc + "</span>";
                txt2 += "</div>";
                txt2 += "</td>";
                txt2 += "<td>" + x.allocationDate + "</td>";
                txt2 += "<td>" + x.applicationName + "</td>";
                if (x.priority == "NORMAL") {
                    txt2 += "<td class='text-secondary'>" + x.priority + "</td>";
                }
                if (x.priority == "URGENT") {
                    txt2 += "<td class='text-indigo'>" + x.priority + "</td>";
                }
                if (x.priority == "VERY URGENT") {
                    txt2 += "<td class='text-danger'>" + x.priority + "</td>";
                }
                if (x.priority == "ASAP") {
                    txt2 += "<td><span class='badge text-bg-danger'>" + x.priority + "<span></td>";
                }
                txt2 += "<td>" + x.allocatedBy + "</td>";
                txt2 += "</tr>";
                count2++;
            })
            $("#tblAssignedList").append(txt2);
        });
    }

    //Chart
    function adminBarChart() {
        var chartLabel = [];
        var chartData = [];
        let url2 = "api/ticket/ticketApplicationBarAdmin";
        $("#divBarChart").empty();
        $("#divBarChart").append('<canvas id="myChartAdmin"></canvas>');
        $.get(url2, function (data) {
            data.map(function (x) {
                //console.log(x);
                chartLabel.push(x.labelnew);
                chartData.push(x.valuenew);
            });
            const ctx = document.getElementById('myChartAdmin');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartLabel,
                    datasets: [{
                        label: 'Tickets Generated',
                        data: chartData,
                        backgroundColor: [
                            'rgba(32, 201, 151, 0.2)',
                        ],
                        borderColor: [
                            'rgb(32, 201, 151)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            //steps: 5,
                            //stepValue: 5,
                            //max: 50
                            max: Math.max(...chartData) + 10
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 10,
                                }
                            }
                        }
                    },
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Tickets Generated Per Application'
                        },
                    },
                }
            });
        });
    }
    function userBarChart() {
        var chartLabel = [];
        var chartData = [];
        let url = "api/ticket/ticketApplicationBar";
        let param = { "useremail": $("#hdEmail").val() }

        $("#divBarChart").empty();
        $("#divBarChart").append('<canvas id="myChart"></canvas>');
        $.get(url, param, function (data) {
            data.map(function (x) {
                //console.log(x);
                chartLabel.push(x.labelnew);
                chartData.push(x.valuenew);
            });
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartLabel,
                    datasets: [{
                        label: 'Tickets Generated',
                        data: chartData,
                        backgroundColor: [
                            'rgba(32, 201, 151, 0.2)',
                        ],
                        borderColor: [
                            'rgb(32, 201, 151)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            //steps: 5,
                            //stepValue: 5,
                            //max: 50
                            max: Math.max(...chartData) + 10,
                            title: {
                                display: true,
                                text: 'No. of Tickets'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 10,
                                }
                            },
                            title: {
                                display: true,
                                text: 'Applications'
                            }
                        }
                    },
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Tickets Generated Per Application'
                        },
                    },
                }
            });
        });
    }
    function devLineChart() {
        var chartLabel1 = [];
        var chartData1 = [];
        var chartLabel2 = [];
        var chartData2 = [];
        let url1 = "api/ticket/ticketAllocLineDev";
        let url2 = "api/ticket/ticketSolveLineDev";
        let param = { "useremail": $("#hdEmail").val() };
        $("#divBarChart").empty();
        $("#divBarChart").append('<canvas id="myChartDev"></canvas>');
        $.get(url1, param, function (data) {
            data.map(function (x) {
                //console.log(x);
                chartLabel1.push(x.labelnew);
                chartData1.push(x.valuenew);
            });
            $.get(url2, param, function (data) {
                data.map(function (y) {
                    //console.log(x);
                    chartLabel2.push(y.labelnew);
                    chartData2.push(y.valuenew);
                });
                const ctx = document.getElementById('myChartDev');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartLabel1,
                        datasets: [
                            {
                                label: 'Allocated',
                                data: chartData1,
                                backgroundColor: [
                                    'rgba(253, 152, 67, 0.2)',
                                ],
                                borderColor: [
                                    'rgb(253, 152, 67)',
                                ],
                                borderWidth: 2,
                                tension: 0.5,
                                //borderJoinStyle: 'round'
                                fill: true,
                            },
                            {
                                backgroundColor: [
                                    'rgba(32, 201, 151, 0.2)',
                                ],
                                label: 'Solved',
                                data: chartData2,
                                
                                borderColor: [
                                    'rgb(32, 201, 151)',
                                ],
                                borderWidth: 2,
                                fill: true,
                                //borderJoinStyle: 'round'
                                tension: 0.5
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                //steps: 5,
                                //stepValue: 5,
                                //max: 50
                                max: Math.max(...chartData2) > Math.max(...chartData1) ? Math.max(...chartData2)+5 : Math.max(...chartData1)+5,
                                display: true,
                                title: {
                                    display: true,
                                    text: 'No. of Tickets'
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 10,
                                    }
                                },
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            }
                        },
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Last 7 Days Activities'
                            },
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                });
            });
        });
    }
    function adminLineChart() {
        var chartLabel1 = [];
        var chartData1 = [];
        var chartLabel2 = [];
        var chartData2 = [];
        let url1 = "api/ticket/ticketOpenLineAdmin";
        let url2 = "api/ticket/ticketCloseLineAdmin";
        //let param = { "useremail": $("#hdEmail").val() };
        $("#admChart2").find("#divBarChart").empty();
        $("#admChart2").find("#divBarChart").append('<canvas id="myChartAdm"></canvas>');
        $.get(url1, function (data) {
            data.map(function (x) {
                //console.log(x);
                chartLabel1.push(x.labelnew);
                chartData1.push(x.valuenew);
            });
            $.get(url2, function (data) {
                data.map(function (y) {
                    //console.log(x);
                    chartLabel2.push(y.labelnew);
                    chartData2.push(y.valuenew);
                });
                const ctx = document.getElementById('myChartAdm');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartLabel1,
                        datasets: [
                            {
                                label: 'Open',
                                data: chartData1,
                                //backgroundColor: [
                                //    'rgba(32, 201, 151, 0.2)',
                                //],
                                //borderColor: [
                                //    'rgb(32, 201, 151)',
                                //],
                                backgroundColor: [
                                    'rgba(32, 201, 151, 0.2)',
                                ],
                                borderColor: [
                                    'rgb(32, 201, 151)',
                                ],
                                borderWidth: 2,
                                tension: 0.5,
                                //borderJoinStyle: 'round'
                                fill: true,
                            },
                            {
                                backgroundColor: [
                                    'rgba(220, 53, 69, 0.2)',
                                ],
                                label: 'Closed',
                                data: chartData2,

                                borderColor: [
                                    'rgb(220, 53, 69)',
                                ],
                                borderWidth: 2,
                                fill: true,
                                //borderJoinStyle: 'round'
                                tension: 0.5
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                //steps: 5,
                                //stepValue: 5,
                                //max: 50
                                max: Math.max(...chartData2) > Math.max(...chartData1) ? Math.max(...chartData2) + 5 : Math.max(...chartData1) + 5,
                                display: true,
                                title: {
                                    display: true,
                                    text: 'No. of Tickets'
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 10,
                                    }
                                },
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            }
                        },
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Last 7 Days Activities'
                            },
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                });
            });
        });
    }
});