route: /api/v1/signup | method: POST | params:{"username": String, "password": String, "name": String}

route: /api/v1/login | method: GET | Headers: {"Authentication": "Basic" + base65(user : password) } | returns token

route: /api/v1/profile | method: GET | Headers: {"x-access-token": [JWT TOKEN]) }

GET /api/v1/ocorrencia | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

POST /api/v1/ocorrencia | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

GET /api/v1/ocorrencia/{idOcorrencia} | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

PATCH /api/v1/dados_gerais/{idOcorrencia} | params: 
{
    "numeroOcorrencia": string, 
    "sedeOcorrencia": Sede._id, 
    "peritosOcorrencia": [Peritos._id], 
    "dataHoraAcionamento": dateTime
}
 | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]


# POSTMAN

## SIGNUP

![Signup](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/signup.gif)


## LOGIN

![Login](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/login.gif)


## QUALQUER ROTA AUTENTICADA

![Authenticated](http://www.tools.ages.pucrs.br/PoliciaFederal/api/raw/d900c9cfb88bc8f93306168effaa1f5c1a4158ef/docs/autenticated.gif)