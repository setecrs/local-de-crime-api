route: /signup | method: POST | params:{"usuario": String, "senha": String}

route: /login | method: POST | params: {"usuario": String, "senha": String}

route: /profile | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]

route: /logout | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]

GET /ocorrencia | params: n/a | [DEVE ESTAR AUTENTICADO]

POST /ocorrencia | params: n/a | [DEVE ESTAR AUTENTICADO]

GET /ocorrencia/{idOcorrencia} | params: n/a | [DEVE ESTAR AUTENTICADO]

PATCH /dados_gerais/{idOcorrencia} | params: 
{
    "numeroOcorrencia": string, 
    "sedeOcorrencia": Sede._id, 
    "peritosOcorrencia": [Peritos._id], 
    "dataHoraAcionamento": dateTime
}
 | [DEVE ESTAR AUTENTICADO]