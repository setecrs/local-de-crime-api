route: /signup | method: POST | params:{"usuario": String, "senha": String}

route: /login | method: POST | params: {"usuario": String, "senha": String}

route: /profile | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]

route: /logout | method: GET | params: n/a | [DEVE ESTAR AUTENTICADO]
