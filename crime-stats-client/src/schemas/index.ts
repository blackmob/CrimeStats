import { schema } from 'normalizr';
export const reportedCrime = new schema.Entity('reportedCrimes', {}, {idAttribute: 'id'});
export const arrayOfReportedCrime = new schema.Array(reportedCrime);