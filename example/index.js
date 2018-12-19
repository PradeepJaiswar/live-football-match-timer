import React from 'react';
import ReactDOM from 'react-dom';
import MatchTimer from '../src/components/match-timer';

const config = {
  matchDate: '2018/12/19',
  id: 'uniqueMatchIdentifier',
  startTime: '21:00',
};

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="header">
            <MatchTimer config={config} />
          </div>
          <div className="matchDetail">
            <div className="startTime">
              Match start time is {config.startTime}
            </div>
            <div className="team">
              <span className="left"> Team 1 </span>
              <span className="right"> 2 </span>
            </div>
            <div className="team">
              <span className="left"> Team 2 </span>
              <span className="right"> 1 </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
