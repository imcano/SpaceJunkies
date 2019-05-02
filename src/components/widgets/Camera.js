import React, { Component } from 'react';
import JSMpeg from 'jsmpeg-player';

class Camera extends Component {
  

  componentDidMount() {
    const canvas = document.getElementById('video-canvas');
    const url = 'ws://142.93.25.132:8082/';
    const player = new JSMpeg.Player(url, {canvas: canvas});
  }
  
  render() {
    this.cameraStyle  = {
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
      width: "100%",
      height: "100%",
      transform: "rotate(180deg)"
    }
    return (
      <div>
		  <h1>Camera</h1>
      <canvas style={this.cameraStyle} id="video-canvas" ></canvas>
	  </div>
    );
  }
}

export default Camera;
