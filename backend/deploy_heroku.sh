# Importante: Executar depois de fazer o login no heroku
# Para fazer o login execute o comando: heroku login

docker build -t web .
docker run web
heroku container:login
heroku container:push web
heroku container:release web