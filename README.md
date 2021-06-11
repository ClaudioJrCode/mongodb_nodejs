
# Using Express || JWT || Mongo || Bcrypt

## Requisitos para execução
### Mongo Db
### NodeJs
### Insomnia ou Postman


##Campos do DB {user, email, password}

### Rotas:
Cadastro: localhost:3000/auth/register
Login: localhost:3000/auth/authenticate
Autorização de Login por Token: localhost:3000/access

O token retorna no Authenticate, para acessar o login por Token acrescente o campo "Authorization" no Header e preencha seu valor com a string "'Bearer '+token'
