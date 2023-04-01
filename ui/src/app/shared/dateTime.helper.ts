import { Injectable } from '@angular/core';
import { Moment, ISO_8601 } from 'moment';
import * as moment from 'moment-timezone';

@Injectable()
export class DateTimeHelper {

  getUTCDate(): Moment {
    return moment.utc();
  }

  getEstDate(): Moment {
    return moment.utc().tz('America/New_York');
  }

  getEstDateTimeString(): string {
    return moment.utc().tz('America/New_York').format("MM-DD-YYYY hh:mm:ss A");
  }
  getEstDateString(): string {
    return moment.utc().tz('America/New_York').format("MM-DD-YYYY");
  }

  parseDateToMoment(date: string | Date): Moment{
    return moment(date, ISO_8601);
  }

  parseDateToMomentUTC(date: string | Date){
    return moment.utc(date);
  }

  parseDateToDateString(date: string | Date): string {
    return moment(date, ISO_8601).format("MM-DD-YYYY");
  }

  parseDateToDateTimeString(date: string | Date): string {
    return moment(date, ISO_8601).format("MM-DD-YYYY hh:mm:ss A");
  }

  parseDatetoUtc(date: string | Date): Moment{
    return moment.utc(date);
  }

  parseDatetoEst(date: string | Date): Moment{
    return moment.utc(date).tz('America/New_York');
  }

  parseUtcStringToEstDateString(date: string | Date): string{
    return moment.utc(date).tz('America/New_York').format("MM-DD-YYYY");
  }

  parseUtcDateToEstDateString(date: Date): string{
    return this.parseUtcStringToEstDateString(date.toDateString());
  }

  parseUtcStringToEstDateTimeString(date: string | Date): string{
    let dateValue = moment.utc(date).tz('America/New_York').format("MM-DD-YYYY hh:mm:ss A");
    return dateValue;
  }

  parseUtcDateToEstDateTimeString(date:  string | Date): string{
    return this.parseUtcStringToEstDateTimeString(date);
  }

  isPastSettlementDate(date: Date){
    let mTodaysDate = this.getEstDate();
    let mSelectedSettlementDate = this.parseDateToMoment(date);
    let result = mSelectedSettlementDate.isBefore(mTodaysDate, 'day');
    return result;
  }
}