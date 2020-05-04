import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import $ from "jquery";
// var CanvasJSReact = require('../canvasjs.react');
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const TREND_QUERY = gql`
  query TrendQuery{
    FindTopInterests{
      interest,
      pub_year,
      num_pubs
    }
  }  
`;


class Trends extends Component{
  render(){
    return(
      <Fragment>
        <Query query={TREND_QUERY}>{
          ({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return `Error! ${error.message}`;
            const year = 2015;
            const topInterest = data.FindTopInterests[0].interest;
            var interest_dict = {};
            var i = 0;
            for (i = 0; i < data.FindTopInterests.length; i++){
              var curr_row = data.FindTopInterests[i];
              if (curr_row.pub_year == year) interest_dict[curr_row.interest] = new Array(11).fill(0);
              interest_dict[curr_row.interest][10-year+curr_row.pub_year] = curr_row.num_pubs;
            }

            var interests = Object.keys(interest_dict);
            var data_ = new Array(interests.length);
            for (i = 0; i < interests.length; i++){
              var dataPoints = new Array(11);
              for (var j = 0; j < 11; j++){
                dataPoints[j] = {x: year-10+j, y: interest_dict[interests[i]][j]};
              }
              data_[i] = {type: "line",
                          name: interests[i],
                          showInLegend: true,
                          dataPoints: dataPoints}
            }

            console.log(data_);

            const options = {
              animationsEnabled: true,
              theme: "light2",
              title:{
                text: "Popular Publication Topics in 2015"
              },
              axisY: {
                title: "Number of Publications",
                includeZero: false
              },
              axisX: {
                title: "Publishing Year",
                valueFormatString: "#"
              },
              toolTip: {
                shared: true
              },
              data: data_
            }

            console.log(options);
            return <div>
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Trends</h3>
                    <CanvasJSChart options = {options}/>
                  </div>
                </div>
              </div>
            </div>
          }
        }
        </Query>
      </Fragment>
    );
  }
}

export default Trends;