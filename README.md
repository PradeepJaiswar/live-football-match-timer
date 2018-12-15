# live football match timer
React component for showing live football match timer

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
  showLiveIndicator: true,
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
showLiveIndicator | boolen | false |  Show Live text beside timer
eachHalfTime | number | 45 |  Each half Time
halfBreakTime | number | 15 | -
firstHalfExtraTime | number | 0 | -
secondHalfExtraTime | number | 0 | -