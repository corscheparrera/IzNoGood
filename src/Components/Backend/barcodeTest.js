var Quagga = require("quagga").default;

var buffer = require("fs").readFileSync("./code.png");

decode(buffer);
function decode(buff) {
  Quagga.decodeSingle(
    {
      src: buff,
      numOfWorkers: 0,
      inputStream: {
        mime: "image/png",
        size: 800,
        area: {
          top: "10%",
          right: "5%",
          left: "5%",
          bottom: "10%"
        }
      }
    },
    function(result) {
      console.log("result", result.codeResult.code);
    }
  );
}
