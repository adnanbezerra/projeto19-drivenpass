# Projeto 19 - DrivenPass

Este é o projeto número 19 feito pela Driven Education. Ele é uma API feita inteiramente em TypeScript, e fica reponsável por gerenciar um sistema de manutenção de informações de logins a contas da internet, bancos, wifi, além de permitir criar notas pessoais. Agora, irei explicar como funciona.

## Rota User

### Método POST /signup:
- Recebe: { email, password }, e trata de criar a sua conta na API para acesso e login
- Retorna: status code 201

### Método POST /signin:
- Recebe: { email, password }, e trata de fazer login na sua conta da API
- Retorna: o seu token JWT criado pela aplicação para validação da sessão

## Rota Credentials

### Método POST /credential:
- Recebe: { url, username, password, title }, além do seu token no headers no formato Authorization: Bearer + token. Checa se você já tem alguma credential com este título e, caso contrário, cria a credential
- Retorna: status code 201

### Método GET /credentials:
- Recebe o token de autorização no headers. Pode receber uma id na forma de query string, caso se queira receber apenas uma credential de um id específico. Nesse caso, valida se a credential que tem esse id pertence ao usuário do token enviado no header.
- Retorna: a credential com o id especificado ou a lista das credentials do usuário.

### Método DELETE /credential/:id:
- Recebe a id da credential via params e o token de autorização no headers. Valida se a credential da id especificada pertence ao usuário do token enviado. Caso pertença, deleta a credential do banco de dados.
- Retorna: status code 200

## Rota SafeNotes

### Método POST /safeNote:
- Recebe: { title, note }, além do seu token no headers no formato Authorization: Bearer + token. Checa se você já tem alguma safeNote com este título e, caso contrário, cria a safeNote
- Retorna: status code 201

### Método GET /safeNotes:
- Recebe o token de autorização no headers. Pode receber uma id na forma de query string, caso se queira receber apenas uma safeNote de um id específico. Nesse caso, valida se a safeNote que tem esse id pertence ao usuário do token enviado no header.
- Retorna: a safeNote com o id especificado ou a lista das safeNotes do usuário.

### Método DELETE /safeNote/:id:
- Recebe a id da safeNote via params e o token de autorização no headers. Valida se a safeNote da id especificada pertence ao usuário do token enviado. Caso pertença, deleta a safeNote do banco de dados.
- Retorna: status code 200