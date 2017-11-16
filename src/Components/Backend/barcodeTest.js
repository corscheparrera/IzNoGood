var Quagga = require("quagga").default;
Quagga.decodeSingle(
  {
    src: "./code.png",
    numOfWorkers: 0, // Needs to be 0 when used within node
    decoder: {
      readers: ["upc_reader"] // List of active readers
    }
  },
  function(result) {
    if (result.codeResult) {
      console.log("result", result.codeResult.code);
    } else {
      console.log("not detected");
    }
  }
);
