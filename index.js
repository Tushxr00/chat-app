const app = require("express")();

const server = require("http").createServer(app);

const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`server is running on port :  ${PORT}`);
});

server.listen(PORT, () => console.log(`listening on port :  ${PORT}`));
