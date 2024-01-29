# Importante: Executar depois de fazer o login no heroku
# Para fazer o login execute o comando: heroku login

docker build -t web .
docker run web
heroku container:login
heroku container:push web --app karavel-api
heroku container:release web --app karavel-api
