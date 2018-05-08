route: /signup | method: POST | params:{"username": String, "password": String, "name": String}

route: /login | method: GET | Headers: {"Authentication": "Basic" + base65(user : password) } | returns token

route: /profile | method: GET | Headers: {"x-access-token": [JWT TOKEN]) }

GET /ocorrencia | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

POST /ocorrencia | params: n/a | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]

GET /ocorrencia/{idOcorrencia} | Headers: {"x-access-token": [JWT TOKEN]) } params: n/a | [DEVE ESTAR AUTENTICADO]

PATCH /dados_gerais/{idOcorrencia} | params: 
{
    "numeroOcorrencia": string, 
    "sedeOcorrencia": Sede._id, 
    "peritosOcorrencia": [Peritos._id], 
    "dataHoraAcionamento": dateTime
}
 | Headers: {"x-access-token": [JWT TOKEN]) } [DEVE ESTAR AUTENTICADO]
