import React, {Component} from "react";
import { Meteor } from "meteor/meteor";

import './overlay.css';


export default class Overlay extends Component {
  constructor(props){
    super(props);
    this.width=600;
    this.height=600;
    this.canvas=null;

  }
  componentWillUpdate(nextProps) {

    let projection= nextProps.getProj();
    let ctx = this.canvas.getContext('2d');
    console.log("ctx"+ ctx);
    ctx.fillStyle = "rgb(200,0,0)";
    nextProps.tweets.map((tweet) => {
        console.log(tweet.coordinates);
        let lon = tweet.coordinates.coordinates[0];
        let lat = tweet.coordinates.coordinates[1];
        console.log('lon' + lon );
        console.log('lat' + lat);
        let coord=projection(tweet.coordinates.coordinates);
        console.log("in overlay" + coord);
        console.log('x ' + coord[0]);
        console.log('y ' + coord[1]);

        ctx.moveTo(coord[0],coord[1]);

        ctx.arc(coord[0], coord[1], 4, 0, 2*Math.PI);
    });
    ctx.fill();

  }

  render() {
    return (
        <canvas className='overCanvas' ref={(canvas) => {this.canvas = canvas}} width={this.width} height={this.height}></canvas>

    );
  }
}
