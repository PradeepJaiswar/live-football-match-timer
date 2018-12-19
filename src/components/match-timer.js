/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

import { matchTimerCalculator } from '../utils/match-timer-calculator';
import '../css/style.css';

class MatchTimer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.iamMounted = false;
    this.timerStarted = false;
    this.timerDiv = null;
    this.liveDiv = null;
    this.countdownTimer = null;
    this.seconds = 1; // set timer to start from one second
    this.live = matchTimerCalculator(props.config); // set match state
    this.timer = this.timer.bind(this);
    this.setClockInterval = this.setClockInterval.bind(this);
  }
  componentDidMount() {
    this.iamMounted = true;
    if (this.live) {
      this.seconds = this.live.seconds;
      if (this.live.showTimer) {
        this.setClockInterval(); // set up timer if match is live when user loads the page
      }
    }
  }
  setClockInterval() {
    this.timerDiv = document.getElementById(`${this.props.config.id}-countdown`);
    this.countdownTimer = setInterval(this.timer, 1000);
    this.timerStarted = true;
  }
  timer() {
    const days = Math.floor(this.seconds / 24 / 60 / 60);
    const hoursLeft = Math.floor((this.seconds) - (days * 86400));
    const hours = 0;
    const minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    const minutes = Math.floor(minutesLeft / 60);
    let remainingSeconds = this.seconds % 60;
    remainingSeconds = (remainingSeconds < 10) ? `0${remainingSeconds}` : remainingSeconds;
    if (this.timerDiv) {
      this.timerDiv.innerHTML = `${minutes}:${remainingSeconds}`;
      this.timerDiv.classList.toggle('un_transition');
    }
    if (this.live.fullTime) {
      clearInterval(this.countdownTimer);
    } else {
      this.seconds++;
    }
  }
  render() {
    if (this.iamMounted) {
      this.live = matchTimerCalculator(this.props.config);
      if (this.live) {
        this.seconds = this.live.seconds;
        if (!this.timerStarted) {
          this.setClockInterval(); // start the timer if user load the page before the match start
        }
      }
    }
    return (
      <div className={this.props.config.containerClass ? this.props.config.containerClass : ''}>
        <span
          className={`${this.props.config.TimerClass ? this.props.config.TimerClass : ''} un`}
          id={`${this.props.config.id}-countdown`}
          style={{ display: this.live.showTimer ? 'inline-block' : 'none' }}
        />
        {this.live &&
          <div className={this.props.config.macthStatusTextClass ? this.props.config.macthStatusTextClass : ''}>
            {!this.live.fullTime &&
              <span>Live</span>
            }
            {this.live.halfTime &&
              <span>&nbsp;HT</span>
            }
            {this.live.fullTime &&
              <span>&nbsp;FT</span>
            }
            {this.live.extraTimeFirst &&
              <span>
                {this.live.seconds} &nbsp;+
                {this.live.firstHalfExtraTime}
              </span>
            }
            {this.live.extraTimeSecond &&
              <span>
                {this.live.seconds} &nbsp;+
                {this.live.secondHalfExtraTime}
              </span>
            }
          </div>
        }
      </div>
    );
  }
}

MatchTimer.propTypes = {
  config: PropTypes.object,
};

export default MatchTimer;
