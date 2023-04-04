$(function () {
    Default();
    //let idSurvey = "";
    function Default() {
        let localurl = window.location.search;
        const url1 = new URLSearchParams(localurl);
        let idSurvey = url1.get("id");

        let url = "Surveyresponselist";
        let param = {
            IDSurvey: idSurvey,
        };
        let url2 = "Surveylistactivedetails";
        let param2 = { IDSurvey: idSurvey };
        $.get(url2, param2, function (data1) {
            console.log(data1);
            data1.map(function (y) {
                $("#lblSurveyCode").text(y.code);
                $("#lblSurveyName").text(y.name);
                $("#lblFullMarks").text(y.totalMarks);
                $("#hdSurveyID").val(y.idSurvey);
            });
        });
        $.get(url, param, function (data) {
            console.log(data);
            data.map(function (x) {
                //console.log(x);
                ShowTable(x.userName, x.userEmail, x.response, x.totalMarksResult);
            });
        });
    }
    function ShowTable(userName, userEmail, response, totalMarksResult) {
        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td>" + userName +"</td>";
        txt = txt + "<td>" + userEmail + "</td>";
        if (response == 1) {
            txt = txt + "<td class='text-primary fw-bold'>" + response + "</td>";
            txt = txt + "<td>" + totalMarksResult + "</td>";
            txt = txt + "<td><a class='lblShowResponse btn btn-primary btn-sm' data-value=" + userEmail + ">Show Response</a></td>";
        }
        else {
            txt = txt + "<td class='text-danger'>" + response + "</td>";
            txt = txt + "<td>" + totalMarksResult + "</td>";
            txt = txt + "<td><label class='btn btn-light btn-sm' disabled data-value=" + userEmail + ">Show Response</label></td>";
        }
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblResponse").append(txt);
    }

    //$("#btnSurveyList").on('click', function () {
    //    let idSurvey = $(this).attr("data-value");
    //    let localurl = window.location.search;
    //    const url = localurl + '/SurveyResponse?id=' + idSurvey;
    //    window.location.href = url;
    //});

    //Response Modal
    $("#tblResponse").on('click', '.lblShowResponse', function () {
        let userEmail = $(this).attr("data-value");
        let idSurvey = $("#hdSurveyID").val();
        let param = { IDSurvey: idSurvey };
        let url = "SurveyshowformInfo";
        $.get(url, param, function (data) {
            //console.log(data);
            //$("#QuestionContainer").empty();
            //let index = 1;
            //let divName = "";
            data.map(function (x) {
                //divName = "question" + index;
                //console.log(x);
                $("#lblHeaderDetail").text(x.code);
                $("#lblTitle").text(x.name);
                $("#lblDescription").text(x.remarks);
                $("#hdIDSurveyDetail").val(x.idSurvey);
                $("#ModalSurveyResponse").modal('show');

                let url2 = "Surveyresponseformquestion";
                
                let url3 = "Surveyuserresponse";
                let param2 = {
                    UserEmail: userEmail,
                    IDSurvey: idSurvey
                }
                $.get(url3, param2, function (data2) {
                    //console.log(data2);
                    data2.map(function (z) {
                        console.log(z);
                        $("#UserContainer").empty();
                        ShowResponse(z.userName, z.userEmail);

                        $.get(url2, param, function (data1) {
                            //console.log(data1);
                            $("#QuestionContainer").empty();
                            let index = 1;
                            let divName = "";
                            //UserDetails();
                            data1.map(function (y) {
                                divName = "question" + index;
                                //console.log(y);
                                ShowQuestion(y.questionNo, y.questionType, y.questionText, y.questionDesc, y.answerType,
                                    z.answerText, y.answerTextMarks, z.answerTextMarksResult, z.answerTextArea, y.answerTextAreaMarks, z.answerTextAreaMarksResult,
                                    z.answerCheckbox1, z.answerCheckbox2, z.answerCheckbox3, z.answerCheckbox4,
                                    y.answerCheckboxText1, y.answerCheckboxText2, y.answerCheckboxText3, y.answerCheckboxText4,
                                    y.answerCheckbox1Marks, y.answerCheckbox2Marks, y.answerCheckbox3Marks, y.answerCheckbox4Marks,
                                    z.answerCheckbox1MarksResult, z.answerCheckbox2MarksResult, z.answerCheckbox3MarksResult, z.answerCheckbox4MarksResult,
                                    y.answerRadio1, y.answerRadio2, y.answerRadio3, y.answerRadio4,
                                    y.answerRadioText1, y.answerRadioText2, y.answerRadioText3, y.answerRadioText4,
                                    y.answerRadio1Marks, y.answerRadio2Marks, y.answerRadio3Marks, y.answerRadio4Marks,
                                    z.answerRadio, z.answerRadioText, z.answerRadioMarksResult, divName);
                                //if (y.questionNo == 1) {
                                //    console.log('test');
                                //}
                                index++;
                            });
                        });
                    });
                });
            });
        });
    });
    function ShowQuestion(questionno, questionType, questionText, questionDesc, answerType, answerTextResp,
        answerTextMarks, answerTextMarksResult, answerTextAreaResp, answerTextAreaMarks, answerTextAreaMarksResult,
        answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4,
        answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4,
        answerCheckbox1Marks, answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks,
        Checkbox1MarksResult, Checkbox2MarksResult, Checkbox3MarksResult, Checkbox4MarksResult,
        answerRadio1, answerRadio2, answerRadio3, answerRadio4, answerRadioText1, answerRadioText2, answerRadioText3,
        answerRadioText4, answerRadio1Marks, answerRadio2Marks, answerRadio3Marks, answerRadio4Marks,
        radioResp, radiotextResp, radiomarksResp, contentDivID) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<input type='hidden' id='txtQuestionType' class='form-control form-control-sm'/>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionText' class='fs-6' style='font-weight: 500;'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionDesc' class='fs-6'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<input type='hidden' id='txtQuestionDescription' class='form-control form-control-sm'/>";
        txt = txt + "<div id='answer" + questionno + "'>";
        txt = txt + "<select id='ddlAnswerType' class='form-select form-select-sm AnswerType' data-value=" + questionno + " style='display:none;'></select>";
        txt = txt + "<div id='answertype" + questionno + "'>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#QuestionContainer").append(txt);

        //console.log($("#" + contentDivID).find("#txtQuestionText"));
        $("#" + contentDivID).find("#lblQuestionText").text(questionText);
        $("#" + contentDivID).find("#lblQuestionDesc").text(questionDesc);
        $("#" + contentDivID).find("#txtAnswerType").val(answerType);
        $("#" + contentDivID).find("#txtQuestionType").val(questionType);

        let txt1 = '';
        let value = answerType;
        let idno = questionno;
        // Answer Type append
        if (value == 'SHORT ANSWER') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mt-2 fs-6'>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextMarks +"</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mt-2 fs-6'></textarea>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextAreaMarks + "</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-25'>";
            if (answerCheckboxText1 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv1'><input type='checkbox' id='chk1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label></div><label id='lblmarks1' class='form-check-label fs-6'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv2'><input type='checkbox' id='chk2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label></div><label id='lblmarks2' class='form-check-label fs-6'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv3'><input type='checkbox' id='chk3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label></div><label id='lblmarks3' class='form-check-label fs-6'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv4'><input type='checkbox' id='chk4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label></div><label id='lblmarks4' class='form-check-label fs-6'></label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div id='chkdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'OPTION') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-25'>";
            if (answerRadioText1 != '') {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv1'><input type='radio' id='opt1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label></div><label id='lblmarks1' class='form-check-label fs-6' style='font-weight: 500;'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv2'><input type='radio' id='opt2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label></div><label id='lblmarks2' class='form-check-label fs-6' style='font-weight: 500;'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv3'><input type='radio' id='opt3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label></div><label id='lblmarks3' class='form-check-label fs-6' style='font-weight: 500;'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv4'><input type='radio' id='opt4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label><div><label id='lblmarks4' class='form-check-label fs-6' style='font-weight: 500;'></label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div id='optdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }

        $("#QuestionContainer #answertype" + idno).empty();
        $("#QuestionContainer #answertype" + idno).append(txt1);


        //$("#" + contentDivID).find("#txtAnswer ~ #txtmarks1").val(answerTextMarks);
        $("#" + contentDivID).find("#txtAnswer").val(answerTextResp);
        $("#" + contentDivID).find("#txtAnswer ~ #divMarks > #txtmarks1").val(answerTextMarksResult);
        //$("#" + contentDivID).find("#txtParagraph ~ #txtmarks1").val(answerTextAreaMarks);
        $("#" + contentDivID).find("#txtParagraph").val(answerTextAreaResp);
        $("#" + contentDivID).find("#txtParagraph ~ #divMarks > #txtmarks1").val(answerTextAreaMarksResult);

        //Radio box value
        if (radioResp == 1) {
            if (radiotextResp == answerRadioText1) {
                $("#" + contentDivID).find("#opt1").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText2) {
                $("#" + contentDivID).find("#opt2").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText3) {
                $("#" + contentDivID).find("#opt3").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText4) {
                $("#" + contentDivID).find("#opt4").attr("checked", "true");
            }
        }
        $("#" + contentDivID).find("#opt1 ~ #lbl1").text(answerRadioText1);
        $("#" + contentDivID).find("#optdiv1 ~ #lblmarks1").text(answerRadio1Marks);
        $("#" + contentDivID).find("#opt2 ~ #lbl2").text(answerRadioText2);
        $("#" + contentDivID).find("#optdiv2 ~ #lblmarks2").text(answerRadio2Marks);
        $("#" + contentDivID).find("#opt3 ~ #lbl3").text(answerRadioText3);
        $("#" + contentDivID).find("#optdiv3 ~ #lblmarks3").text(answerRadio3Marks);
        $("#" + contentDivID).find("#opt4 ~ #lbl4").text(answerRadioText4);
        $("#" + contentDivID).find("#optdiv4 ~ #lblmarks4").text(answerRadio4Marks);

        $("#" + contentDivID).find("#optdivMarks > #txtmarks1").val(radiomarksResp);

        //Checkbox value
        if (answerCheckbox1 == 1) {
            $("#" + contentDivID).find("#chk1").attr("checked", "true");
        }
        if (answerCheckbox2 == 1) {
            $("#" + contentDivID).find("#chk2").attr("checked", "true");
        }
        if (answerCheckbox3 == 1) {
            $("#" + contentDivID).find("#chk3").attr("checked", "true");
        }
        if (answerCheckbox4 == 1) {
            $("#" + contentDivID).find("#chk4").attr("checked", "true");
        }
        $("#" + contentDivID).find("#chk1 ~ #lbl1").text(answerCheckboxText1);
        $("#" + contentDivID).find("#chkdiv1 ~ #lblmarks1").text(answerCheckbox1Marks);
        $("#" + contentDivID).find("#chk2 ~ #lbl2").text(answerCheckboxText2);
        $("#" + contentDivID).find("#chkdiv2 ~ #lblmarks2").text(answerCheckbox2Marks);
        $("#" + contentDivID).find("#chk3 ~ #lbl3").text(answerCheckboxText3);
        $("#" + contentDivID).find("#chkdiv3 ~ #lblmarks3").text(answerCheckbox3Marks);
        $("#" + contentDivID).find("#chk4 ~ #lbl4").text(answerCheckboxText4);
        $("#" + contentDivID).find("#chkdiv4 ~ #lblmarks4").text(answerCheckbox4Marks);

        let checkboxAnswer = Checkbox1MarksResult + Checkbox2MarksResult + Checkbox3MarksResult + Checkbox4MarksResult;
        $("#" + contentDivID).find("#chkdivMarks > #txtmarks1").val(checkboxAnswer);
    }
    function ShowResponse(userName, userEmail) {
        let txt = "";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label class=''/>User Full Name</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblUserName' class='fs-6' style='font-weight: 500;'>" + userName + "</label>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>User Mail ID</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblUserEmail' class='fs-6' style='font-weight: 500;'/>" + userEmail + "</label>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#UserContainer").append(txt);
    }
    $("#btnCloseResponse").on("click", function () {
        $("#ModalSurveyResponse").modal('hide');
    });

    //Response Marks Save
    $("#btnSaveResponseMarks").on('click', function () {
        let url = "Surveysaveresponsemarks";

        let uname = $("#lblUserName").text();
        let uemail = $("#lblUserEmail").text();

        let questionDiv = $("#QuestionContainer").children().last().attr('id');
        var questionDivCount = questionDiv.slice(-1);
        questionno = parseInt(questionDivCount);
        //console.log(questionno);

        let param = [];

        let answertype = '';
        let questiontype = '';
        let anstext = '';
        let anstextmarks = 0;
        let anstextarea = '';
        let anstextareamarks = 0;

        let boolanschk1 = false;
        let boolanschk2 = false;
        let boolanschk3 = false;
        let boolanschk4 = false;

        let anschktext1 = "";
        let anschktext2 = "";
        let anschktext3 = "";
        let anschktext4 = "";
        let anschktext1marks = 0;
        let anschktext2marks = 0;
        let anschktext3marks = 0;
        let anschktext4marks = 0;

        let boolansradio = false;
        let ansradiotext = "";
        let ansradiotextmarks = 0;

        let responsemarks = 0;

        for (let i = 1; i <= questionno; i++) {
            let divQ = "#question" + i;
            //let divA = "#answer" + i;
            //questiontype = $(divQ).find("#ddlQuestionType option:selected").text();
            //console.log(questiontype);
            answertype = $(divQ).find("#txtAnswerType").val();
            if (answertype == 'SHORT ANSWER') {
                anstext = $("#answertype" + i).find("#txtAnswer").val();
                anstextmarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                responsemarks += anstextmarks;
            }
            else if (answertype == 'PARAGRAPH') {
                anstextarea = $("#answertype" + i).find("#txtParagraph").val();
                anstextareamarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                responsemarks += anstextareamarks;
            }
            else if (answertype == 'CHECKBOX') {
                if ($("#answertype" + i).find("#chk1").is(":checked")) {
                    anschktext1 = $("#answertype" + i).find("#chk1").val();
                    //anschktext1marks = $("#answertype" + i).find("#lblmarks1").text();
                }
                if ($("#answertype" + i).find("#chk2").is(":checked")) {
                    anschktext2 = $("#answertype" + i).find("#chk2").val();
                    //anschktext2marks = $("#answertype" + i).find("#lblmarks2").text();
                }
                if ($("#answertype" + i).find("#chk3").is(":checked")) {
                    anschktext3 = $("#answertype" + i).find("#chk3").val();
                    //anschktext3marks = $("#answertype" + i).find("#lblmarks3").text();
                }
                if ($("#answertype" + i).find("#chk4").is(":checked")) {
                    anschktext4 = $("#answertype" + i).find("#chk4").val();
                    //anschktext4marks = $("#answertype" + i).find("#lblmarks4").text();
                }
                boolanschk1 = anschktext1 == "" ? false : true;
                boolanschk2 = anschktext2 == "" ? false : true;
                boolanschk3 = anschktext3 == "" ? false : true;
                boolanschk4 = anschktext4 == "" ? false : true;
                responsemarks += parseInt($("#answertype" + i).find("#chkdivMarks > #txtmarks1").val());
            }
            else if (answertype == 'OPTION') {
                if ($("#answertype" + i).find("#opt1").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt1").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks1").text();
                }
                else if ($("#answertype" + i).find("#opt2").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt2").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks2").text();
                }
                else if ($("#answertype" + i).find("#opt3").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt3").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks3").text();
                }
                else if ($("#answertype" + i).find("#opt4").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt4").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks4").text();
                }
                else {
                    ansradiotext = "";
                    //ansradiotextmarks = "";
                }
                boolansradio = ansradiotext == "" ? false : true;
                responsemarks += parseInt($("#answertype" + i).find("#optdivMarks > #txtmarks1").val());
            }
            param.push({
                "QuestionNo": i,
                "IDSurvey": $("#hdIDSurveyDetail").val(),
                "AnswerTextMarksResult": anstextmarks,
                "AnswerTextAreaMarksResult": anstextareamarks,
                //"AnswerCheckbox1MarksResult": anschktext1marks,
                //"AnswerCheckbox2MarksResult": anschktext2marks,
                //"AnswerCheckbox3MarksResult": anschktext3marks,
                //"AnswerCheckbox4MarksResult": anschktext4marks,
                //"AnswerRadioMarksResult": ansradiotextmarks,
                "UserName": uname,
                "UserEmail": uemail
            });
            
        }
        let info = { "UserResponse": param, "TotalMarksResult": responsemarks };
        console.log(info);
        //console.log(responsemarks);

        $.ajax({
            url: url,
            type: "POST",
            data: info,
            success: function (msg) {
                //alert("Record Successfully Inserted!!");
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Successfully Inserted!!',
                    //timer: 1500
                });
            }
        });

    });
});