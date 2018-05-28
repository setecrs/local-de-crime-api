route: /signup | method: POST | params:{"username": String, "password": String, "name": String}

route: /login | method: GET | Headers: {"Authentication": "Basic" + base65(user : password) } | returns token

route: /profile | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencia/{idOcorrencia} | method: GET | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencias | method: POST | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /ocorrencias | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

route: /ocorrencias/todas | method: GET | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

route: /usuarios | method: GET | Headers: no-auth

route: /dados_gerais/{idOcorrencia} | method: PATCH | params: 
{
    "numeroOcorrencia": String, 
    "sedeOcorrencia": Sede._id, 
    "peritosOcorrencia": [Peritos._id], 
    "dataHoraAcionamento": dateTime
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /endereco/{idOcorrencia} | method: PATCH | params: 
{
    "tipoLocal": String,
    "estado": String,
    "municipio": String,
    "logradouro": String,
    "complemento": String,
    "_id": Ocorrencia._id
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /responsavel_local/{idOcorrencia} | method: PATCH | params: 
{
    "nomeResponsavel": String,
    "cargoResponsavel": String,
    "documentoResponsavel": String,
    "entrevistaResponsavel": String,
    "_id": Ocorrencia._id
}
| Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

route: /popular_banco/default | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO COM USERNAME: admin]

route: /obter_listas | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO] //retorna as listas

route: /peritos_acionados/{idOcorrencia} | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
    | method: POST | params: {"peritoAcionado": Perito._id} | [DEVE ESTAR AUTENTICADO]
    | method: DELETE | params: {"peritoAcionado": Perito._id} | [DEVE ESTAR AUTENTICADO]

route: /vestigios/{idOcorrencia} | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
    | method: DELETE | params: {"vestigio": Vestigio._id} | [DEVE ESTAR AUTENTICADO]
    | method: POST | params: 
        {
            tipo: tipo_vestigio._id
            coletado: boolean,
            etiqueta: String,
            informacoesAdicionais: String
        }
        | [DEVE ESTAR AUTENTICADO]

# POSTMAN

## SIGNUP

![Signup](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/signup.gif)


## LOGIN

![Login](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/login.gif)


## QUALQUER ROTA AUTENTICADA

![Authenticated](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/autenticated.gif)