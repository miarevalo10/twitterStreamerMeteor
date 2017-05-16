import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"
import ColombiaMap from "./ColombiaMap";
import Overlay from "./Overlay";
import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection=null;
    this.setProj.bind(this);
    this.getProj.bind(this);

  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }

  setProj(proj){
    this.projection = proj;
    // console.log("en app " +this.projection);
  }

  getProj(){
      return this.projection;
      // console.log("en el get" + this.projection);
  }

  render() {
    console.log("render!");
    return (
      <div>

        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        {this.props && this.props.tweets ?
            <div>
              <ColombiaMap setProj={this.setProj.bind(this)} width='600' height='600' data={{RISARALDA:10}}/>
              <Overlay getProj={this.getProj.bind(this)} tweets={this.props.tweets}/>
              <TweetsResults tweets={this.props.tweets}/> :
            </div>:
            <p>Enter a query</p>


        }

      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
