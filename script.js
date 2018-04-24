var regent = require('regent');

const data = {
  teacher: {
    MinutesLate: 15,
    TakesAttendance: true
  },

  class: {
    Cancelled: false
  }
};

const isPast15Minutes = { left: '@teacher.MinutesPast', fn: 'greaterThan', right: 15 };
const onTime = regent.not(isPast15Minutes);

const lessThan15 = { left: '@teacher.MinutesPast', fn: 'lessThan', right: 15 };
const moreThan0 = { left: '@teacher.MinutesPast', fn: 'greaterThan', right: 0 };
const teacherIsLate = regent.and(lessThan15, moreThan0);

const isCancelled = { left: '@class.Cancelled', fn: 'equals', right: true };
const notCancelled = regent.not(isCancelled);

const isMandatory = { left: '@teacher.TakesAttendance', fn: 'equals', right: true };
const notMandatory = regent.not(isMandatory);

const leaveClassDecision = [
  { action: 'Why did you even show up?', rule: isCancelled },
  { action: 'You are legally allowed to leave', rule: isPast15Minutes },
  { action: 'Its your call, hope there isn\'t a pop quiz!', rule: regent.and(teacherIsLate, notMandatory) },
  { action: 'Better wait it out...', rule: regent.and(teacherIsLate, isMandatory) },
  { action: 'No, you must stay!', rule: onTime }
];

const { action } = regent.find(leaveClassDecision, data);
console.log(action);




