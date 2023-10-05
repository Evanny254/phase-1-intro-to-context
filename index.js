function createEmployeeRecord(employee) {
    let testEmployee = {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
    return testEmployee;
  }

  function createEmployeeRecords(arr) {
    return arr.map((elem) => {
      return createEmployeeRecord(elem);
    });
  }


  function createTimeInEvent(recordObject, date) {
    let yourDate = date.split(" ");
    let inTime = {
      type: "TimeIn",
      hour: parseInt(yourDate[1]),
      date: yourDate[0],
    };

    recordObject.timeInEvents = [...recordObject.timeInEvents, inTime];
    return recordObject;
  }
  

  function createTimeOutEvent(recordObject, date) {
    let yourDate = date.split(" ");
    let outTime = {
      type: "TimeOut",
      hour: parseInt(yourDate[1]),
      date: yourDate[0],
    };

    recordObject.timeOutEvents = [...recordObject.timeOutEvents, outTime];
    return recordObject;
  }

  function hoursWorkedOnDate(record, date) {
    for (let i = 0; i < record.timeInEvents.length; i++) {
      if (date === record.timeInEvents[i].date) {
        let arrivalTime = record.timeInEvents[i].hour;
        let departureTime = record.timeOutEvents[i].hour;
        let timeTaken = departureTime - arrivalTime;
        return timeTaken / 100;
      }
    }
  }

  
  function wagesEarnedOnDate(record, date) {
    let timeTaken = hoursWorkedOnDate(record, date);
    return timeTaken * record.payPerHour;
  }



  const allWagesFor = function (record) {
    const eligibleDates = record.timeInEvents.map(function (e) {
      return e.date;
    });
    const payable = eligibleDates.reduce((accum, currentDate) => {
      return accum + wagesEarnedOnDate(record, currentDate);
    }, 0);
    return payable;
  };

  
  function calculatePayroll(recordArr) {
    let employeeTotal = recordArr.map((employee) => {
      return allWagesFor(employee);
    });
    let payroll = employeeTotal.reduce((total, currentValue) => {
      return total + currentValue;
    }, 0);
    return payroll;
  }
