# node-red-contrib-oee-fsm

A Node-RED node that implements a Finite State Machine (FSM) for simulating a machine's states in an OEE (Overall Equipment Effectiveness) calculation system. This node can be used to model the different states of a machine, such as "Off", "Idle", "Setup", "Waiting", "Run", and "Maintenance", as well as the transitions between these states.

## Installation

To install this module, run the following command in your Node-RED user directory, typically `~/.node-red`:

```
npm install node-red-contrib-oee-fsm
```

After installation, the node will appear in the Node-RED palette under the "Bufferstack IO" category.

## Usage

This node can be used to model a machine's state transitions in an OEE calculation system. The node listens for input messages containing a `command` property and updates its internal state accordingly. The node sends the current state as its output payload.

The node supports the following commands:

- `powerOn`: Transitions the machine state from "Off" to "Idle".
- `start`: Transitions the machine state from "Idle" to "Setup".
- `completeSetup`: Transitions the machine state from "Setup" to "Waiting".
- `startProduction`: Transitions the machine state from "Waiting" to "Run".
- `stop`: Transitions the machine state from "Run" to "Idle".
- `fail`: Transitions the machine state from "Run" to "Maintenance".
- `completeMaintenance`: Transitions the machine state from "Maintenance" to "Waiting".
- `cancel`: Transitions the machine state from "Waiting" to "Idle".
- `powerOff`: Transitions the machine state to "Off" from any other state.

The node also displays the valid transitions for each state as a warning message and sends an error message when an invalid command is received.

## Example

You can create a Node-RED flow that uses this node to simulate a machine's state transitions and another custom node to calculate OEE based on the machine's states and additional production information (e.g., planned production time, ideal production rate, number of good and defective parts produced).

## License

GPL-3.0  License

## Author

Harshad Joshi (hj91)

## Contributing

Contributions to this project are welcome. Please submit a pull request or open an issue on the GitHub repository if you have any suggestions, bug reports, or feature requests.


## Purpose and Motivation

The purpose of this Node-RED module is to simulate the state transitions of a machine or process in an OEE (Overall Equipment Effectiveness) calculation system. The module provides a state machine that represents different states of the machine, such as "Off", "Idle", "Setup", "Waiting", "Run", and "Maintenance". 

This state machine can be used to model a machine's behavior and track its status during operation. It can help understand how the machine transitions between different states based on various input commands like "powerOn", "start", "completeSetup", "startProduction", "stop", "fail", "completeMaintenance", and "powerOff".

By tracking and managing the state of a machine or process, this module can provide valuable insights into the machine's performance and help identify areas where improvements can be made to increase Overall Equipment Effectiveness.

In the Node-RED environment, the module can be easily integrated into a larger flow, enabling users to control and monitor the state of a machine or process and integrate it with other components like data collection, analysis, and visualization tools.
