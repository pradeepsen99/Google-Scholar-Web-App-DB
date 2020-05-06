import React, {Component, Fragment} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import $ from "jquery";
import ArticleItem from "./ArticleItem";
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

const ARTICLE_QUERY = gql`
  query ArticleQuery($interest_: String!, $year: Int!){
    FindTopArticles (interest: $interest_, year: $year){
      article_id,
      title,
      citedBy,
      citations,
      pub_year,
      eprint,
      pub_number,
      pub_publisher,
      pub_url,
      journal
    }
  }
`;

// const ARTICLE_QUERY = gql`
//   query ArticleQuery{
//     FindTopArticles{
//       article_id,
//       pub_year,
//       interest,
//       citedBy
//     }
//   }
// `;

class Trends extends Component{
  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.select1 = this.select1.bind(this);
    this.select2 = this.select2.bind(this);
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      value1 : 2018,
      value2 : "NULL"
    };
  }

  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  }
  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }

  select1(event) {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1,
      value1: event.target.innerText
    });
    this.state.value2 = "NULL";
  }
  select2(event) {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
      value2: event.target.innerText
    });
  }

  render(){
    var year = parseInt(this.state.value1);
    return(
      <Fragment>
        <Query query={TREND_QUERY} variables={{year}}>{
          ({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return `Error! ${error.message}`;
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

            var trending_interests = new Array(3);
            var increase_in_pubs = new Array(interests.length).fill(-1);
            for (i = 3; i < interests.length; i++){
              increase_in_pubs[i] = interest_dict[interests[i]][10] - interest_dict[interests[i]][9];
            }
            var argmax;
            var currmax;
            for (i = 0; i < 3; i++){
              argmax = 0;
              currmax = -1;
              for (j = 3; j < interests.length; j++){
                if (increase_in_pubs[j] > currmax){
                  argmax = j;
                  currmax = increase_in_pubs[j];
                } 
              }
              trending_interests[i] = interests[argmax];
              increase_in_pubs[argmax] = -1;
            }

            if (this.state.value2 == "NULL") this.state.value2 = interests[0];
            var interest_ = this.state.value2;

            const options = {
              animationsEnabled: true,
              theme: "light2",
              title:{
                text: `Popular Publication Topics in ${this.state.value1}`
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
                    <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                      <DropdownToggle caret>
                        Select Year
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.select1}>2007</DropdownItem>
                        <DropdownItem onClick={this.select1}>2008</DropdownItem>
                        <DropdownItem onClick={this.select1}>2009</DropdownItem>
                        <DropdownItem onClick={this.select1}>2010</DropdownItem>
                        <DropdownItem onClick={this.select1}>2011</DropdownItem>
                        <DropdownItem onClick={this.select1}>2012</DropdownItem>
                        <DropdownItem onClick={this.select1}>2013</DropdownItem>
                        <DropdownItem onClick={this.select1}>2014</DropdownItem>
                        <DropdownItem onClick={this.select1}>2015</DropdownItem>
                        <DropdownItem onClick={this.select1}>2016</DropdownItem>
                        <DropdownItem onClick={this.select1}>2017</DropdownItem>
                        <DropdownItem onClick={this.select1}>2018</DropdownItem>
                        <DropdownItem onClick={this.select1}>2019</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <CanvasJSChart options = {options}/>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Most Cited {this.state.value2} Articles From {year}</h3>
                    <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                      <DropdownToggle caret>
                        Select Interest
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Most Popular Topics</DropdownItem>
                        <DropdownItem onClick={this.select2}>{interests[0]}</DropdownItem>
                        <DropdownItem onClick={this.select2}>{interests[1]}</DropdownItem>
                        <DropdownItem onClick={this.select2}>{interests[2]}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem header>Trending Topics</DropdownItem>
                        <DropdownItem onClick={this.select2}>{trending_interests[0]}</DropdownItem>
                        <DropdownItem onClick={this.select2}>{trending_interests[1]}</DropdownItem>
                        <DropdownItem onClick={this.select2}>{trending_interests[2]}</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Query query={ARTICLE_QUERY} variables={{interest_, year}}>{
                      ({loading, error, data}) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return `Error! ${error.message}`; 
                          console.log(interest_);
                          console.log(year);
                          console.log(data);
                          return <Fragment>{
                            data.FindTopArticles.map(FindTopArticles => (
                              <ArticleItem key={FindTopArticles.article_id} Paging={FindTopArticles} />
                            ))                            
                          }
                          </Fragment>
                          // return <h3 className="panel-title">test</h3>
                        }
                      }
                    </Query>

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