import Quagga from "quagga";
import React, { Component } from "react";
import "../CSS/Barcode.css";
import Api from "./api.js";

class Barcode extends Component {
  componentDidMount() {
    var handler = {
      init: function() {
        handler.addEventListeners();
      },

      addEventListeners: function() {
        var self = this;

        document
          .querySelector(".controls input[type=file]")
          .addEventListener("change", function(e) {
            if (e.target.files && e.target.files.length) {
              handler.decode(URL.createObjectURL(e.target.files[0]));
            }
          });

        document.querySelector("#rerun").addEventListener("click", function(e) {
          var input = document.querySelector(".controls input[type=file]");
          if (input.files && input.files.length) {
            handler.decode(URL.createObjectURL(input.files[0]));
          }
        });
      },

      decode: function(_src) {
        // Pass in the objects to merge as arguments.
        // For a deep extend, set the first argument to `true`.
        var extend = function() {
          // Variables
          var extended = {};
          var deep = false;
          var i = 0;
          var length = arguments.length;

          // Check if a deep merge
          if (
            Object.prototype.toString.call(arguments[0]) === "[object Boolean]"
          ) {
            deep = arguments[0];
            i++;
          }

          // Merge the object into the extended object
          var merge = function(obj) {
            for (var prop in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (
                  deep &&
                  Object.prototype.toString.call(obj[prop]) ===
                    "[object Object]"
                ) {
                  extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                  extended[prop] = obj[prop];
                }
              }
            }
          };

          // Loop through each object and conduct a merge
          for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
          }

          return extended;
        };
        var self = this;
        let config = extend({}, self.state, {
          src: _src
        });
        Quagga.decodeSingle(config, function(result) {
          if (result === undefined) {
            alert("Not code in the picture.");
          } else if (result.codeResult) {
            let upcCode = result.codeResult.code;

            self.handleData(upcCode);
          } else {
            alert("Not detected");
          }
        });
      },
      state: {
        inputStream: {
          size: 800,
          singleChannel: false
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        decoder: {
          readers: [
            {
              format: "upc_reader",
              config: {}
            }
          ]
        },
        locate: true,
        src: null
      },

      handleData: code => {
        // var CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        // var url = `${CORS_PROXY}https://api.upcitemdb.com/prod/trial/lookup?upc=${code}`;
        // console.log(code);
        Api.getProductData(code).then(res => {
          console.log("inside barcode.jsx", res.body["0"].brand);
        });
        let query = code;

        // fetch(url)
        //   .then(result => result.json())
        //   .then(result => {
        //     this.props.handleBarcode(result.items["0"].title);
        //   });
      }
    };

    handler.init();

    function calculateRectFromArea(canvas, area) {
      var canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        top = parseInt(area.top) / 100,
        right = parseInt(area.right) / 100,
        bottom = parseInt(area.bottom) / 100,
        left = parseInt(area.left) / 100;

      top *= canvasHeight;
      right = canvasWidth - canvasWidth * right;
      bottom = canvasHeight - canvasHeight * bottom;
      left *= canvasWidth;

      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }

    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay,
        area;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(
                box,
                {
                  x: 0,
                  y: 1
                },
                drawingCtx,
                {
                  color: "green",
                  lineWidth: 2
                }
              );
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(
            result.box,
            {
              x: 0,
              y: 1
            },
            drawingCtx,
            {
              color: "#00F",
              lineWidth: 2
            }
          );
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            {
              x: "x",
              y: "y"
            },
            drawingCtx,
            {
              color: "red",
              lineWidth: 3
            }
          );
        }

        if (handler.state.inputStream.area) {
          area = calculateRectFromArea(
            drawingCanvas,
            handler.state.inputStream.area
          );
          drawingCtx.strokeStyle = "#0F0";
          drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
        }
      }
    });
  }

  render() {
    return (
      <div>
        <section id="upload" className="content-wrap">
          <div className="container">
            <div className="row">
              <aside className="col-md-2 sidebar">
                <div className="controls">
                  <h3 className="subtitle">Control Bar</h3>
                  <input type="file" accept="image/*" capture="camera" />
                  <button id="rerun" type="button" className="btn btn-default">
                    Rerun
                  </button>
                </div>
              </aside>
              <main className="col-md-6 main-content">
                <div id="interactive" className="viewport" />
              </main>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Barcode;
