$(function () {
    let guid = "";
    Default();

    function Default() {
        viewSurvey();
    }
    function viewSurvey() {
        let localurl = window.location.search;
        const url1 = new URLSearchParams(localurl);
        guid = url1.get("s");
        //console.log(localurl);
        let param = { SurveyGUID: guid };
        let url = "Surveyshowform";
        $.get(url, param, function (data) {
            //console.log(data);
            //$("#QuestionContainer").empty();
            //let index = 1;
            //let divName = "";
            data.map(function (x) {
                //divName = "question" + index;
                //console.log(x);
                $("#lblSurveyName").text(x.name);
                $("#lblDescription").text(x.remarks);
                $("#hdIDSurveyDetail").val(x.idSurvey);

                let url2 = "Surveyshowformquestion";
                $.get(url2, param, function (data1) {
                    //console.log(data1);
                    $("#QuestionContainer").empty();
                    let index = 1;
                    let divName = "";
                    UserDetails();
                    data1.map(function (y) {
                        divName = "question" + index;
                        console.log(y);
                        ShowQuestion(y.questionNo, y.questionType, y.questionText, y.questionDesc, y.answerType, y.answerText, y.answerTextMarks, y.answerTextArea, y.answerTextAreaMarks, y.answerCheckbox1, y.answerCheckbox2, y.answerCheckbox3, y.answerCheckbox4, y.answerCheckboxText1, y.answerCheckboxText2, y.answerCheckboxText3, y.answerCheckboxText4, y.answerCheckbox1Marks, y.answerCheckbox2Marks, y.answerCheckbox3Marks, y.answerCheckbox4Marks, y.answerRadio1, y.answerRadio2, y.answerRadio3, y.answerRadio4, y.answerRadioText1, y.answerRadioText2, y.answerRadioText3, y.answerRadioText4, y.answerRadio1Marks, y.answerRadio2Marks, y.answerRadio3Marks, y.answerRadio4Marks, divName);
                        index++;
                    });
                });
            });
        });
    }
    function UserDetails() {
        let txt = "";
        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        /*txt = txt + "<div class='col-md-2'><label>Question</label></div>";*/
        txt = txt + "<div class='col-md-12'><label id='lblUserName' class='fs-6' style='font-weight: 500;'/>Your Full Name</label>";
        txt = txt + "<input type='text' id='txtUserName' class='form-control form-control-sm mt-2'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        /*txt = txt + "<div class='col-md-2'><label>Question</label></div>";*/
        txt = txt + "<div class='col-md-12'><label id='lblUserEmail' class='fs-6' style='font-weight: 500;'/>Your Mail ID</label>";
        txt = txt + "<input type='text' id='txtUserEmail' class='form-control form-control-sm mt-2'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        $("#QuestionContainer").append(txt);
    }
    function ShowQuestion(questionno, questionType, questionText, questionDesc, answerType, answerText, answerTextMarks, answerTextArea, answerTextAreaMarks, answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4, answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4, answerCheckbox1Marks, answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks, answerRadio1, answerRadio2, answerRadio3, answerRadio4, answerRadioText1, answerRadioText2, answerRadioText3, answerRadioText4, answerRadio1Marks, answerRadio2Marks, answerRadio3Marks, answerRadio4Marks, contentDivID) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<input type='hidden' id='txtQuestionType' class='form-control form-control-sm'/>";

        txt = txt + "<div class='row mb-1'>";
        //txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-12'><label id='lblQuestionText' class='fs-6' style='font-weight: 500;'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        //txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-12'><label id='lblQuestionDesc' class='fs-6'/></label>";
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
            txt1 = txt1 + "<div class='d-flex align-items-center mt-2'>";
            txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mb-2 mt-2'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2 d-none' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
            txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mb-2 mt-2'></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2 d-none' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt1 = txt1 + "<div class='mt-3'>";
            if (answerCheckboxText1 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label><label id='lblmarks1' class='ms-2 d-none'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label><label id='lblmarks2' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label><label id='lblmarks3' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label><label id='lblmarks4' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
        }
        else if (value == 'OPTION') {
            txt1 = txt1 + "<div class='mt-3'>";
            if (answerRadioText1 != '') {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label><label id='lblmarks1' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label><label id='lblmarks2' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label><label id='lblmarks3' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label><label id='lblmarks4' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
        }

        $("#QuestionContainer #answertype" + idno).empty();
        $("#QuestionContainer #answertype" + idno).append(txt1);

        $("#" + contentDivID).find("#txtAnswer ~ #txtmarks1").val(answerTextMarks);
        $("#" + contentDivID).find("#txtParagraph ~ #txtmarks1").val(answerTextAreaMarks);

        $("#" + contentDivID).find("#opt1").val(answerRadioText1);
        $("#" + contentDivID).find("#opt1").attr("name", questionText);
        $("#" + contentDivID).find("#opt1 ~ #lbl1").text(answerRadioText1);
        $("#" + contentDivID).find("#opt1 ~ #lblmarks1").text(answerRadio1Marks);

        $("#" + contentDivID).find("#opt2").val(answerRadioText2);
        $("#" + contentDivID).find("#opt2").attr("name", questionText);
        $("#" + contentDivID).find("#opt2 ~ #lbl2").text(answerRadioText2);
        $("#" + contentDivID).find("#opt2 ~ #lblmarks2").text(answerRadio2Marks);

        $("#" + contentDivID).find("#opt3").val(answerRadioText3);
        $("#" + contentDivID).find("#opt3").attr("name", questionText);
        $("#" + contentDivID).find("#opt3 ~ #lbl3").text(answerRadioText3);
        $("#" + contentDivID).find("#opt3 ~ #lblmarks3").text(answerRadio3Marks);

        $("#" + contentDivID).find("#opt4").val(answerRadioText4);
        $("#" + contentDivID).find("#opt4").attr("name", questionText);
        $("#" + contentDivID).find("#opt4 ~ #lbl4").text(answerRadioText4);
        $("#" + contentDivID).find("#opt4 ~ #lblmarks4").text(answerRadio4Marks);


        $("#" + contentDivID).find("#chk1").val(answerCheckboxText1);
        //$("#" + contentDivID).find("#chk1").attr("name", questionText);
        $("#" + contentDivID).find("#chk1 ~ #lbl1").text(answerCheckboxText1);
        $("#" + contentDivID).find("#chk1 ~ #lblmarks1").text(answerCheckbox1Marks);

        $("#" + contentDivID).find("#chk2").val(answerCheckboxText2);
        //$("#" + contentDivID).find("#chk2").attr("name", questionText);
        $("#" + contentDivID).find("#chk2 ~ #lbl2").text(answerCheckboxText2);
        $("#" + contentDivID).find("#chk2 ~ #lblmarks2").text(answerCheckbox2Marks);

        $("#" + contentDivID).find("#chk3").val(answerCheckboxText3);
        //$("#" + contentDivID).find("#chk3").attr("name", questionText);
        $("#" + contentDivID).find("#chk3 ~ #lbl3").text(answerCheckboxText3);
        $("#" + contentDivID).find("#chk3 ~ #lblmarks3").text(answerCheckbox3Marks);

        $("#" + contentDivID).find("#chk4").val(answerCheckboxText4);
        //$("#" + contentDivID).find("#chk4").attr("name", questionText);
        $("#" + contentDivID).find("#chk4 ~ #lbl4").text(answerCheckboxText4);
        $("#" + contentDivID).find("#chk4 ~ #lblmarks4").text(answerCheckbox4Marks);
    }

    $("#btnSubmitDetail").on('click', function () {
        let url = "Surveysaveresponse";

        let uname = $("#txtUserName").val();
        let uemail = $("#txtUserEmail").val();

        if (uname == "" && uemail == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please enter your Name and Email!!'
            });
        }

        let questionDiv = $("#QuestionContainer").children().last().attr('id');
        var questionDivCount = questionDiv.slice(-1);
        questionno = parseInt(questionDivCount);
        //console.log(questionno);

        let param = [];

        let answertype = '';
        let questiontype = '';
        let anstext = '';
        let anstextmarks = '';
        let anstextfullmarks = '';
        let anstextarea = '';
        let anstextareamarks = '';
        let anstextareafullmarks = '';

        let boolanschk1 = false;
        let boolanschk2 = false;
        let boolanschk3 = false;
        let boolanschk4 = false;

        let anschktext1 = "";
        let anschktext2 = "";
        let anschktext3 = "";
        let anschktext4 = "";
        let anschktext1marks = "";
        let anschktext2marks = "";
        let anschktext3marks = "";
        let anschktext4marks = "";

        let boolansradio = false;
        let ansradiotext = "";
        let ansradiotextmarks = "";

        for (let i = 1; i <= questionno; i++) {
            let divQ = "#question" + i;
            //let divA = "#answer" + i;
            //questiontype = $(divQ).find("#ddlQuestionType option:selected").text();
            //console.log(questiontype);
            answertype = $(divQ).find("#txtAnswerType").val();
            if (answertype == 'SHORT ANSWER') {
                anstext = $("#answertype" + i).find("#txtAnswer").val(); 
                anstextfullmarks = $("#answertype" + i).find("#txtmarks1").val();
            }
            else if (answertype == 'PARAGRAPH') {
                anstextarea = $("#answertype" + i).find("#txtParagraph").val();
                anstextareafullmarks = $("#answertype" + i).find("#txtmarks1").val();
            }
            else if (answertype == 'CHECKBOX') {
                if ($("#answertype" + i).find("#chk1").is(":checked")) {
                    anschktext1 = $("#answertype" + i).find("#chk1").val();
                    anschktext1marks = $("#answertype" + i).find("#lblmarks1").text();
                }
                if ($("#answertype" + i).find("#chk2").is(":checked")) {
                    anschktext2 = $("#answertype" + i).find("#chk2").val();
                    anschktext2marks = $("#answertype" + i).find("#lblmarks2").text();
                }
                if ($("#answertype" + i).find("#chk3").is(":checked")) {
                    anschktext3 = $("#answertype" + i).find("#chk3").val();
                    anschktext3marks = $("#answertype" + i).find("#lblmarks3").text();
                }
                if ($("#answertype" + i).find("#chk4").is(":checked")) {
                    anschktext4 = $("#answertype" + i).find("#chk4").val();
                    anschktext4marks = $("#answertype" + i).find("#lblmarks4").text();
                }
                boolanschk1 = anschktext1 == "" ? false : true;
                boolanschk2 = anschktext2 == "" ? false : true;
                boolanschk3 = anschktext3 == "" ? false : true;
                boolanschk4 = anschktext4 == "" ? false : true;
            }
            else if (answertype == 'OPTION') {
                if ($("#answertype" + i).find("#opt1").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt1").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks1").text();
                }
                else if ($("#answertype" + i).find("#opt2").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt2").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks2").text();
                }
                else if ($("#answertype" + i).find("#opt3").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt3").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks3").text();
                }
                else if ($("#answertype" + i).find("#opt4").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt4").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks4").text();
                }
                else {
                    ansradiotext = "";
                    ansradiotextmarks = "";
                }
                boolansradio = ansradiotext == "" ? false : true;
            }
            param.push({
                "QuestionNo": i,
                "IDSurvey": $("#hdIDSurveyDetail").val(),
                //"QuestionType": questiontype,
                "QuestionText": $(divQ).find("#lblQuestionText").text(),
                "QuestionDesc": $(divQ).find("#lblQuestionDesc").text(),
                "AnswerType": answertype,
                "AnswerText": anstext,
                "AnswerTextMarksResult": anstextmarks,
                //"AnswerTextFullMarks": anstextfullmarks,
                "AnswerTextArea": anstextarea,
                "AnswerTextAreaMarksResult": anstextareamarks,
                //"AnswerTextAreaFullMarks": anstextareafullmarks,
                "AnswerCheckbox1": boolanschk1,
                "AnswerCheckbox2": boolanschk2,
                "AnswerCheckbox3": boolanschk3,
                "AnswerCheckbox4": boolanschk4,
                "AnswerCheckboxText1": anschktext1,
                "AnswerCheckboxText2": anschktext2,
                "AnswerCheckboxText3": anschktext3,
                "AnswerCheckboxText4": anschktext4,
                "AnswerCheckbox1MarksResult": anschktext1marks,
                "AnswerCheckbox2MarksResult": anschktext2marks,
                "AnswerCheckbox3MarksResult": anschktext3marks,
                "AnswerCheckbox4MarksResult": anschktext4marks,
                "AnswerRadio": boolansradio,
                "AnswerRadioText": ansradiotext,
                "AnswerRadioMarksResult": ansradiotextmarks,
                "UserName": uname,
                "UserEmail": uemail
            });
        }
        let info = { "UserResponse": param, "UserEmail": uemail, "IDSurvey": $("#hdIDSurveyDetail").val() };
        console.log(info);

        $.ajax({
            url: url,
            type: "POST",
            data: info,
            success: function (msg) {
                if (msg == "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Successfully Inserted!!'
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                        text: msg
                    });
                    $("#QuestionContainer").empty();
                    //window.top.close().delay(5000);
                }
                
            }
        });

    });
});