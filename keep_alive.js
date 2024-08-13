var http = require('http');

const PORT = process.env.PORT || 8080;
http.createServer(function (req, res) {
  res.write("I'm Alive");
  res.end();
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
