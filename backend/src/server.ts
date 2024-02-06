import app from "./app";

const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3333; //DEV

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
server.on("error", (e) => console.error("Error", e));
server.timeout = 60 * 2 * 1000;
