const url = "https://192.168.0.199:3009";

function login() {
    var nome = $("#username").val().trim();
    var pass = $("#password").val().trim();

    
    if (nome !== "" && pass !== "") {
        var basic = "Basic " + btoa(nome + ":" + pass);
        $.ajax({url: "/login",
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Authorization": basic
            },
            success: function (result) {
                $("#alert").hide();
                localStorage.setItem("token",result.token);
                window.location.replace("./main");
            },
            error: function (jqXHR, status, err) {
                $("#alert").show();
            }
        });
    } else {
        if(nome === ""){
            $("#username").css('border-color', 'red');
        }
        if(pass === ""){
            $("#password").css('border-color', 'red');
        }
    }
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        login();
    }
});
    