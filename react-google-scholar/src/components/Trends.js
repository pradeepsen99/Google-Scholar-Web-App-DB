import React, {Component, Fragment} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
  query TrendQuery($year: Int!){
    FindTopInterests (year : $year){
      interest,
      pub_year,
      num_pubs
    }
  }  
`;


class Trends extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      value : 2015
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  render(){
    var year = parseInt(this.state.value);
    console.log(year);
    console.log(`SELECT * FROM TABLE WHERE year == ${year}`);
    return(
      <Fragment>
        <Query query={TREND_QUERY} variables={{year}}>{
          ({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return `Error! ${error.message}`;
            // var year = this.state.value;
            console.log(data);
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

            const options = {
              animationsEnabled: true,
              theme: "light2",
              title:{
                text: `Popular Publication Topics in ${this.state.value}`
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

            return <div>
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Trends</h3>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        Select Year
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.select}>2007</DropdownItem>
                        <DropdownItem onClick={this.select}>2008</DropdownItem>
                        <DropdownItem onClick={this.select}>2009</DropdownItem>
                        <DropdownItem onClick={this.select}>2010</DropdownItem>
                        <DropdownItem onClick={this.select}>2011</DropdownItem>
                        <DropdownItem onClick={this.select}>2012</DropdownItem>
                        <DropdownItem onClick={this.select}>2013</DropdownItem>
                        <DropdownItem onClick={this.select}>2014</DropdownItem>
                        <DropdownItem onClick={this.select}>2015</DropdownItem>
                        <DropdownItem onClick={this.select}>2016</DropdownItem>
                        <DropdownItem onClick={this.select}>2017</DropdownItem>
                        <DropdownItem onClick={this.select}>2018</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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