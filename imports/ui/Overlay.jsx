import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Overlay extends Component {
  constructor(props){
    super(props);
    this.canvas=null;
    this.width=600;
    this.height=600;
  }
  componentWillUpdate(nextProps) {

    let projection= nextProps.getProj();
    var ctx = this.canvas.getContext('2d');
    console.log("ctx"+ ctx);
    ctx.beginPath();

    return nextProps.tweets.forEach((tweet) => {
      if(tweet.coordinates)
      {
        console.log(tweet.coordinates);
        let lon = tweet.coordinates.coordinates[0];
        let lat = tweet.coordinates.coordinates[1];
        console.log('lon' + lon );
        console.log('lat' + lat);
        let coord=projection(tweet.coordinates.coordinates);
        console.log("in overlay" + coord);
        console.log('x' + coord[0]);
        console.log('y' + coord[1]);


        ctx.arc(coord[0], coord[1], 10, 0, Math.PI*2, true);
      }
    });
    ctx.fill();

  }

  render() {
    return (
        <canvas id="overlay" ref={canvas => this.canvas = canvas} width={this.width} height={this.height} />

    );
  }
}
