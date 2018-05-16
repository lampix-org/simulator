import React from 'react';

import { ipcRenderer } from 'electron';
import { UPDATE_SIMULATOR_LIST, UPDATE_SIMULATOR_SETTINGS } from '../../main-process/ipcEvents';
import { SIMPLE, POSITION } from './constants';

import Simulator from '../../components/Simulator';

class SimulatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    ipcRenderer.on(UPDATE_SIMULATOR_LIST, (event, data) => {
      const simulatorList = data;
      Object.keys(data).forEach((url) => {
        simulatorList[url].settings.movementRegisteredAreasOpen = false;
        simulatorList[url].settings.simpleRegisteredAreasOpen = false;
        simulatorList[url].settings.positionRegisteredAreasOpen = false;
      });
      this.setState({
        simulatorList
      });
    });
    ipcRenderer.on(UPDATE_SIMULATOR_SETTINGS, (event, data) => {
      const simulatorList = { ...this.state.simulatorList };
      simulatorList[data.url].settings = data.settings;
      simulatorList[data.url].registeredData = data.registeredData;
      this.setState({
        simulatorList
      });
    });
  }

  handleMovementDetectorChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    simulatorList[url].settings.movementDetector = event.target.checked;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.toggleMovement(url);
    });
  }

  handleSimpleClassifierChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const classifier = event.target.value;
    simulatorList[url].settings.simple.classifier = classifier;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setClassifier(url, SIMPLE, classifier);
    });
  }

  handleSimpleRecognizedClassChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const recognizedClass = event.target.value;
    simulatorList[url].settings.simple.recognizedClass = recognizedClass;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setRecognizedClass(url, SIMPLE, recognizedClass);
    });
  }

  handleSimpleMetadataChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const metadata = event.target.value;
    simulatorList[url].settings.simple.metadata = metadata;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setMetadata(url, SIMPLE, metadata);
    });
  }

  handlePositionClassifierChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const classifier = event.target.value;
    simulatorList[url].settings.position.classifier = classifier;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setClassifier(url, POSITION, classifier);
    });
  }

  handlePositionRecognizedClassChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const recognizedClass = event.target.value;
    simulatorList[url].settings.position.recognizedClass = recognizedClass;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setRecognizedClass(url, POSITION, recognizedClass);
    });
  }

  handlePositionMetadataChange = (event, url) => {
    const simulatorList = { ...this.state.simulatorList };
    const metadata = event.target.value;
    simulatorList[url].settings.position.metadata = metadata;
    this.setState({
      simulatorList
    }, () => {
      window.lampix.setMetadata(url, POSITION, metadata);
    });
  }

  handleMovementRegisteredAreasClick = (url) => {
    const simulatorList = { ...this.state.simulatorList };
    simulatorList[url].settings.movementRegisteredAreasOpen = !simulatorList[url].settings.movementRegisteredAreasOpen;
    this.setState({
      simulatorList
    });
  }

  handleSimpleRegisteredAreasClick = (url) => {
    const simulatorList = { ...this.state.simulatorList };
    simulatorList[url].settings.simpleRegisteredAreasOpen = !simulatorList[url].settings.simpleRegisteredAreasOpen;
    this.setState({
      simulatorList
    });
  }

  handlePositionRegisteredAreasClick = (url) => {
    const simulatorList = { ...this.state.simulatorList };
    simulatorList[url].settings.positionRegisteredAreasOpen = !simulatorList[url].settings.positionRegisteredAreasOpen;
    this.setState({
      simulatorList
    });
  }

  closeSimulator = (url) => window.lampix.closeSimulator(url);
  focusSimulator = (url) => window.lampix.focusSimulator(url);

  render() {
    const simulators = this.state.simulatorList ? Object.keys(this.state.simulatorList).map((url) => (
      <Simulator
        key={url}
        simulatorData={this.state.simulatorList[url]}
        onMovementDetectorChange={this.handleMovementDetectorChange}
        onSimpleClassifierChange={this.handleSimpleClassifierChange}
        onSimpleRecognizedClassChange={this.handleSimpleRecognizedClassChange}
        onSimpleMetadataChange={this.handleSimpleMetadataChange}
        onPositionClassifierChange={this.handlePositionClassifierChange}
        onPositionRecognizedClassChange={this.handlePositionRecognizedClassChange}
        onPositionMetadataChange={this.handlePositionMetadataChange}
        onCloseSimulator={this.closeSimulator}
        onFocusSimulator={this.focusSimulator}
        onMovementRegisteredAreasClick={this.handleMovementRegisteredAreasClick}
        onSimpleRegisteredAreasClick={this.handleSimpleRegisteredAreasClick}
        onPositionRegisteredAreasClick={this.handlePositionRegisteredAreasClick}
      />
    )) : null;

    return simulators;
  }
}

export default SimulatorList;

