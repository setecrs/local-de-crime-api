    function cadastrar() {
    var username = $("#username").val().trim();
    var pass = $("#password").val().trim();
    var nomeCompleto = $("#nomeCompleto").val().trim();
    var passConfirm = $("#passwordConfirmar").val().trim();
    var email = $("#email").val().trim();
    
     $("#alert").hide();
     $("#alertS").hide();
    
    if (username !== "" && pass !== "" && nomeCompleto !== "" && passConfirm !== "") {
        $("#password").css('border-color', 'inherit');
        $("#username").css('border-color', 'inherit');
        $("#nomeCompleto").css('border-color', 'inherit');
        $("#email").css('border-color', 'inherit');
        $("#passwordConfirmar").css('border-color', 'inherit');
        
        if(pass !== passConfirm){
            $("#alert").html("<b>As senhas inseridas não coincidem</b>");
            $("#alert").show();
        }
        
        var json = [];
        nomeCom = {};
        nomeCom["name"] = nomeCompleto;
        json.push(nomeCom);
        
        userNa = {};
        userNa["username"] = username;
        json.push(userNa);
        
        senha = {};
        senha["password"] = pass;
        json.push(senha);

        emai = {};
        emai["email"] = email;
        json.push(emai);

        $.ajax({
            url: "/signup",
            type: 'POST',
            headers: {
                "Access-Control-Allow-Origin": '*',
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            processData: false,
            data: JSON.stringify(json),
            success: function (result) {
                $("#alertS").html("<b>Policial cadastrado!</b>");
                $("#alertS").show();
                $("#username").val("");
                $("#password").val("");
                $("#nomeCompleto").val("");
                $("#passwordConfirmar").val("");
                $("#email").val("");
            },
            error: function (jqXHR, status, err) {
                var erro = "";
                if(jqXHR.status == 409)
                    erro = "Usuário ja foi cadastrado no sistema!";
                else if(jqXHR.status == 500)
                    erro = "Ocorreu um erro no servidor";
                else if(jqXHR.status == 401)
                    erro = "Você não tem permissão para fazer isto.";
                else
                    erro = jqXHR.status;
                $("#alert").html("<b>Erro:"+erro+"</b>");
                $("#alert").show();
            }
        });
    } else {
        if(username === ""){
            $("#username").css('border-color', 'red');
        }
        if(pass === ""){
            $("#password").css('border-color', 'red');
        }
        if(passConfirm === ""){
            $("#passwordConfirmar").css('border-color', 'red');
        }
        if(nomeCompleto === ""){
            $("#nomeCompleto").css('border-color', 'red');
        }
    }
}

function sair(){
    localStorage.setItem("token",null);
    window.location.replace("../");
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        cadastrar();
    }
});
