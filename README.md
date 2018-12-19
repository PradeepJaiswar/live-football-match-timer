# Live football match timer
React component for showing live football match timer

<img src="https://raw.githubusercontent.com/PradeepJaiswar/live-football-match-timer/master/match-timer.gif" width="200" height="200" >

# Pre-requisites
* [Git](http://git-scm.com/)
* [NodeJS](http://nodejs.org/) (with NPM)

# Install Dependencies
`npm install`

# Run example App
`npm start`

Open [localhost:9000](http://locahost:9000)

# Example 

```
import MatchTimer from 'live-football-match-timer';

const matchObj = {
  matchDate: '2018/12/12',
  id: '23',
  startTime: '13:00',
};

class YourComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return (
      <div >
        <MatchTimer matchObj={matchObj} />
      </div>
    );
  }
}
```

# Config

You can custmize matchObj param pass to component

## Required params

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
matchDate | string | - |  Match date in YYYY/MM/DD format
id | string | - |  Unique match identifier
startTime | string | - |  match start time in 24 hour format hh:mm

## Optinal params

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
eachHalfTime | number | 45 |  Each half Time
halfBreakTime | number | 15 | -
firstHalfExtraTime | number | 0 | -
secondHalfExtraTime | number | 0 | -
containerClass | string | null |  Container div class for component
TimerClass | string | null |  Timer span class
macthStatusTextClass | string | null |  Extra match status info div class for text Live/HT/FT and extra time with seconds


