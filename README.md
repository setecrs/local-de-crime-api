route: /signup | method: POST | params:{"username": String, "password": String, "name": String}

route: /login | method: GET | Headers: {"Authentication": "Basic" + base65(user : password) } | returns token

route: /profile | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencias/{idOcorrencia} | method: GET | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencias | method: POST | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencias | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

route: /ocorrencias/todas | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

route: /usuarios | method: GET | Headers: no-auth

route: /obter_listas | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO] //retorna as listas


route: /dados_gerais/{idOcorrencia} | method: PATCH | params: 
{
    "numeroOcorrencia": String, 
    "sedeOcorrencia": String,
    "peritosOcorrencia": [Peritos._id], 
    "dataHoraAcionamento": Date
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /endereco/{idOcorrencia} | method: PATCH | params: 
{
    "tipoLocal": tipoLocals._id,
    "outroTipoLocal": String,
    "estado": estados._id,
    "municipio": municipios._id,
    "outroMunicipio": String,
    "logradouro": String,
    "complemento": String
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /responsavel_local/{idOcorrencia} | method: PATCH | params: 
{
    "nomeResponsavel": String,
    "cargoResponsavel": String,
    "documentoResponsavel": String,
    "entrevistaResponsavel": String
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /testemunhas/{idOcorrencia} | method: PATCH | params: 
{
    "nomeTestemunha": String,
    "documentoTestemunha": String,
    "funcaoTestemunha": String,
    "entrevistaTestemunha": String
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /sobre_local/{idOcorrencia} | method: PATCH | params: 
{
    "dataHoraChegada": Date,
    "condicaoLocal": String,
    "informacoesAdicionais": String
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /sobre_fato/{idOcorrencia} | method: PATCH | params: 
{
    "dataOcorrencia": Date,
    "tipoDelito": tipoDelitos._id,
    "outroTipoDelito": String,
    "outroModusOperandi": String,
    "possiveisSuspeitos": String,
    "valoresSubtraidos": String
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


route: /policiais_acionados/{idOcorrencia} | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
    | method: POST | params: {"peritoAcionado": Perito._id} | [DEVE ESTAR AUTENTICADO]
    | method: DELETE | params: {"peritoAcionado": Perito._id} | [DEVE ESTAR AUTENTICADO]


route: /modus_operandi/{idOcorrencia} | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
    | method: POST | params: {"modusOperandi": modusOperandis._id} | [DEVE ESTAR AUTENTICADO]
    | method: DELETE | params: {"modusOperandi": modusOperandis._id} | [DEVE ESTAR AUTENTICADO]


route: /vestigios/{idOcorrencia} | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
    | method: DELETE | params: {"vestigio": Vestigio._id} | [DEVE ESTAR AUTENTICADO]
    | method: POST | params: 
        {
            "tipo": tipoVestigios._id
            "outroTipoVestigio" : String
            "coletado": boolean,
            "etiqueta": String,
            "informacoesAdicionais": String
        }
    | [DEVE ESTAR AUTENTICADO]


//popula o banco com as listas enviadas pela PF
route: /popular_banco/default | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO COMO ADMIN]

//GET limpa todas ocorrencias, POST limpa ocorrencias mais antigas do que a data informada
route: /popular_banco/limpar_ocorrencias | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO COMO ADMIN]
    | method: POST | params:
        {
            "dataHoraAcionamento": Date
        }
    | [DEVE ESTAR AUTENTICADO COMO ADMIN]


# POSTMAN

## SIGNUP

![Signup](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/signup.gif)


## LOGIN

![Login](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/login.gif)


## QUALQUER ROTA AUTENTICADA

![Authenticated](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/autenticated.gif)