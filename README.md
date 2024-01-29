# KARAVEL WEBSITE

## Configurações do banco de dados Mongo:
- Acessar arquivo: backend/Dockerfile
- Editar VARIÁVEIS da linha 17 a linha 20, que são: USERNAME, PASSWORD, URL (para conectar com o Atlas) e o nome do banco.

## Instruções para deploy:

- Montar a imagem
Entrar na respectiva pasta e executar: docker build -t web .

- Executar a imagem:
FrontEnd: docker run -d -p 8080:80 web
- Backend: docker run web
- O deploy é feito através do método Container Registry do Heroku...siga o passo a passo apresentado na aba Deploy, clicando em Container Registry, e seguindo o passo a passo.
