# Importante: Executar depois de fazer o login no heroku
# Para fazer o login execute o comando: heroku login

docker build -t web .
docker run -d -p 8080:80 web
heroku container:login
heroku container:push web --app karavel-shipping
heroku container:release web --app karavel-shipping