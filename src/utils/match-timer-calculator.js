/* eslint-disable no-extend-native */
/* eslint-disable func-names */
/* eslint-disable max-len */

import format from 'date-fns/format';
import addMinutes from 'date-fns/add_minutes';
import compareDesc from 'date-fns/compare_desc';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import getSeconds from 'date-fns/get_seconds';

export const matchTimerCalculator = (obj) => {
  if (obj.startTime) {
    let firstHalf = false;
    let extraTimeFirst = false;
    let halfTime = false;
    let secondHalf = false;
    let extraTimeSecond = false;
    let showTimer = true;
    let seconds = 0;
    const defaultHalfTime = 45;
    const defaultfBreakTime = 15;

    const todaysFullDate = format(new Date(), 'YYYY/MM/DD');
    const todaysFullDateWithHourMinute = new Date(format(new Date(), 'YYYY/MM/DD HH:mm'));
    const todaysFullDateWithHourMinuteSecond = new Date(format(new Date(), 'YYYY/MM/DD HH:mm'));
    const matchStartTime = obj.startTime;
    const eachHalfTime = (obj.eachHalfTime && obj.eachHalfTime.length > 0) ? parseInt(obj.eachHalfTime, 10) : defaultHalfTime;
    const halfBreakTime = (obj.halfBreakTime && obj.halfBreakTime.length > 0) ? parseInt(obj.halfBreakTime, 10) : defaultfBreakTime;
    const firstHalfExtraTime = (obj.firstHalfExtraTime && obj.firstHalfExtraTime.length > 0) ? parseInt(obj.firstHalfExtraTime, 10) : 0;
    const secondHalfExtraTime = (obj.secondHalfExtraTime && obj.secondHalfExtraTime.length > 0) ? parseInt(obj.secondHalfExtraTime, 10) : 0;
    const matchDate = obj.matchDate.replace(/-/g, '/');
    const totalMatchTime = (2 * eachHalfTime) +
                           halfBreakTime +
                           firstHalfExtraTime +
                           secondHalfExtraTime;
    const matchTime = `${todaysFullDate} ${matchStartTime}`;
    const matchEndTime = addMinutes(`${todaysFullDate} ${matchStartTime}`, totalMatchTime);
    const firstHalfEndTime = addMinutes(`${todaysFullDate} ${matchStartTime}`, eachHalfTime);
    const firstHalfEndTimeWithExtraTime = addMinutes(`${todaysFullDate} ${matchStartTime}`, eachHalfTime + firstHalfExtraTime);
    const secondHalfEndTimeWithExtraTime = addMinutes(`${todaysFullDate} ${matchStartTime}`, totalMatchTime);
    const secondHalfStartTime = addMinutes(`${todaysFullDate} ${matchStartTime}`, eachHalfTime + halfBreakTime + firstHalfExtraTime);
    const secondHalfEndTime = addMinutes(secondHalfStartTime, eachHalfTime);

    /**
     * Check if match is live right now
     * Compare today date with match date
     * Compare now timing with match start and match end timing
     */
    if (todaysFullDate === matchDate &&
      (compareDesc(todaysFullDateWithHourMinute, matchTime) === -1 || compareDesc(todaysFullDateWithHourMinute, matchTime) === 0) &&
      (compareDesc(todaysFullDateWithHourMinute, matchEndTime) === 1)
    ) {
      /**
       * calculate first half
       * firstHalf to true
       * showTimer is true
       */
      if (compareDesc(todaysFullDateWithHourMinute, firstHalfEndTime) === 1 ||
      compareDesc(todaysFullDateWithHourMinute, firstHalfEndTime) === 0
      ) {
        firstHalf = true;
        showTimer = true;
        seconds = ((eachHalfTime - differenceInMinutes(firstHalfEndTime, todaysFullDateWithHourMinute)) * 60)
        + getSeconds(new Date());
      }
      /**
       * calculate first half extra time
       * extraTimeFirst to true
       * reset other values to false
       * showTimer is false
       */
      if (firstHalfExtraTime > 0 &&
        (compareDesc(todaysFullDateWithHourMinute, firstHalfEndTime) === 0 ||
        compareDesc(todaysFullDateWithHourMinute, firstHalfEndTime) === -1) &&
        (compareDesc(todaysFullDateWithHourMinute, firstHalfEndTimeWithExtraTime) === 0 ||
        compareDesc(todaysFullDateWithHourMinute, firstHalfEndTimeWithExtraTime) === 1)
      ) {
        extraTimeFirst = true;
        firstHalf = false;
        halfTime = false;
        showTimer = false;
        seconds = eachHalfTime;
      }

      /**
       * calculate half time
       * halfTime to true
       * reset other values to false
       * showTimer is false
       */
      if ((compareDesc(todaysFullDateWithHourMinute, firstHalfEndTimeWithExtraTime) === -1 ||
        compareDesc(todaysFullDateWithHourMinute, firstHalfEndTimeWithExtraTime) === 0) && // aftet the first half
        compareDesc(todaysFullDateWithHourMinute, secondHalfStartTime) === 1 // before the second half start time
      ) {
        halfTime = true;
        firstHalf = false;
        showTimer = false;
        extraTimeFirst = false;
      }

      /**
       * calculate second half
       * secondHalf to true
       * reset other values to false
       * showTimer is true
       */
      if (compareDesc(todaysFullDateWithHourMinute, secondHalfStartTime) === 0 ||
      compareDesc(todaysFullDateWithHourMinute, secondHalfStartTime) === -1) {
        secondHalf = true;
        showTimer = true;
        firstHalf = false;
        extraTimeFirst = false;
        const secondHalfPassed = ((eachHalfTime - differenceInMinutes(secondHalfEndTime, todaysFullDateWithHourMinute)) * 60)
        + getSeconds(new Date());
        seconds = secondHalfPassed + (eachHalfTime * 60);
      }

      /**
       * calculate second half extra time
       * extraTimeSecond to true
       * reset other values to false
       * showTimer is false
       */
      if (secondHalfExtraTime > 0 &&
        (compareDesc(todaysFullDateWithHourMinute, secondHalfEndTime) === 0 || compareDesc(todaysFullDateWithHourMinute, secondHalfEndTime) === -1) &&
        (compareDesc(todaysFullDateWithHourMinute, secondHalfEndTimeWithExtraTime) === 0 || compareDesc(todaysFullDateWithHourMinute, secondHalfEndTimeWithExtraTime) === 1)
      ) {
        extraTimeSecond = true;
        firstHalf = false;
        secondHalf = false;
        extraTimeFirst = false;
        halfTime = false;
        showTimer = false;
        seconds = eachHalfTime * 2;
      }

      /**
       * return all values and let the caller decide what to do with it
       */
      return {
        todaysFullDateWithHourMinute,
        todaysFullDateWithHourMinuteSecond,
        matchTime,
        matchStartTime,
        firstHalf,
        extraTimeFirst,
        firstHalfExtraTime,
        firstHalfEndTime,
        halfTime,
        eachHalfTime,
        extraTimeSecond,
        secondHalfStartTime,
        secondHalf,
        halfBreakTime,
        secondHalfExtraTime,
        matchEndTime,
        totalMatchTime,
        showTimer,
        seconds,
      };
    }

    /**
     * Full time calculation
     * If now time is equal to match end time OR
     * If now date is greater than match end time
    */

    if (compareDesc(todaysFullDateWithHourMinute, new Date(format(new Date(matchEndTime), 'YYYY/MM/DD HH:mm'))) === 0 ||
      compareDesc(todaysFullDateWithHourMinute, new Date(format(new Date(matchEndTime), 'YYYY/MM/DD HH:mm'))) === -1) {
      return {
        fullTime: true,
        showTimer: false,
      };
    }
  }

  /**
     * Macth is not live
     * simply return false
    */
  return false;
};

export default {
  matchTimerCalculator,
};
