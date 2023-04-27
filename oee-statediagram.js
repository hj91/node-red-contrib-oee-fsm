/**

 Copyright 2023 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

// Harshad Joshi, 2023
// Release data - 27 April 2023

module.exports = function (RED) {
  function OEEDiagram(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    // Define initial states
    var states = {
      off: {
        name: "Off",
        color: "gray",
        transitions: {
          powerOn: "idle"
        }
      },
      idle: {
        name: "Idle",
        color: "blue",
        transitions: {
          start: "setup",
          powerOff: "off"
        }
      },
      setup: {
        name: "Setup",
        color: "yellow",
        transitions: {
          completeSetup: "waiting",
          powerOff: "off"
        }
      },
      waiting: {
        name: "Waiting",
        color: "red",
        transitions: {
          startProduction: "run",
          cancel: "idle",
          powerOff: "off"
        }
      },
      run: {
        name: "Run",
        color: "green",
        transitions: {
          stop: "idle",
          fail: "maintenance",
          powerOff: "off"
        }
      },
      maintenance: {
        name: "Maintenance",
        color: "orange",
        transitions: {
          completeMaintenance: "waiting",
          powerOff: "off"
        }
      }
    };

    // Define initial state
    var currentState = states.off;

    // Update node status
    function updateStatus() {
      node.status({ fill: currentState.color, shape: "dot", text: currentState.name });
    }

    // Initialize node status
    updateStatus();

    // Define state change function
    node.on("input", function (msg) {
      if (msg.hasOwnProperty("command")) {
        var command = msg.command;
        var nextState = currentState.transitions[command];

        if (nextState) {
          currentState = states[nextState];
          updateStatus();
          node.send({ payload: currentState.name });

          // Display next valid state command
          var validTransitions = Object.keys(currentState.transitions)
            .map(function (key) {
              return key + " -> " + currentState.transitions[key];
            })
            .join(", ");
          node.warn("Next valid transitions for the '" + currentState.name + "' state are: " + validTransitions);

        } else {
          var validTransitions = Object.keys(currentState.transitions)
            .map(function (key) {
              return key + " -> " + currentState.transitions[key];
            })
            .join(", ");
          node.error(
            "Invalid command for the current state. Valid transitions for the '" +
              currentState.name +
              "' state are: " +
              validTransitions
          );
        }
      }
    });
  }

  RED.nodes.registerType("oee-fsm", OEEDiagram);
};

