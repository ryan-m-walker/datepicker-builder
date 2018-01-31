import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

import calendarBuilder, { htmlCalendar, CONSTANTS } from 'calendar-builder';
const { FULL_MONTHS, ABRV_MONTHS } = CONSTANTS;


const myMoment = moment();
console.log(myMoment);

const newDatePicker = calendarBuilder(myMoment);
console.log(newDatePicker);



class App extends Component {

  state = {
    currentDate: moment(),
    pickedDate: undefined
  }

  monthUp = () => {
    this.setState((prev) => {
      const newDate = moment(prev.currentDate.add(1, 'month'));
      return { currentDate: newDate };
    });
  }

  monthDown = () => {
    this.setState((prev) => {
      const newDate = moment(prev.currentDate.add(-1, 'month'));
      return { currentDate: newDate };
    });
  }

  updateMonth = (e) => {
    const target = e.target.value;
    this.setState((prev) => {
      const newDate = prev.currentDate.clone().month(target);
      return { currentDate: newDate };
    });
  }

  clickDate = (date) => {
    this.setState((prev) => {
      const newDate = prev.currentDate.clone().date(date);
      return { 
        pickedDate: newDate
      };
    });
  }

  setToday = () => {
    this.setState(() => { 
      const today = moment();
      return {
        pickedDate: today,
        currentDate: today, 
        datePicked: true
      };
    });
  };

  clear = () => {
    this.setState(() => {
      return {
        pickedDate: undefined,
        datePicked: false
      };
    });
  }

  render() {

    const myCalendar = calendarBuilder(this.state.currentDate, {
      startDay: 'Sunday'
    });
    const { currentDate, pickedDate } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br /> 
          { 
            pickedDate && <p>Picked Date { pickedDate.format('MMMM') } { pickedDate.date() }, { pickedDate.year() }</p> 
          }
          {
            !pickedDate && <p>Please pick a date</p>
          }
        <br />
        <table>
          <thead>
            <tr>
              <td colSpan='4'>
                <select onChange={this.updateMonth}>
                  {
                    FULL_MONTHS.map((month, i) => {
                      return <option 
                        selected={ABRV_MONTHS[i] === myCalendar.monthAbrv} 
                        key={ABRV_MONTHS[i]} 
                        value={ABRV_MONTHS[i]}>
                        { month }
                      </option>
                    })
                  }
                </select>
              </td> 
              <td colSpan='3'>{ myCalendar.year }</td>
            </tr>
            <tr>
              {
                myCalendar.weekLetter.map((day, i) => {
                  return <th key={myCalendar.week[i]}>{day}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              myCalendar.calendar.map((row, index) => {
                return <tr key={'row-' + index}>
                  {
                    row.map((date, i) => 
                      date.date 
                      ? <td
                          onClick={() => this.clickDate(date.date)} 
                          key={'date-' + date.date} 
                          className={date.day}>
                          { date.date }
                        </td>
                      : <td key={'nodate-' + i} className='nodate'>&nbsp;</td>
                    )
                  }
                </tr>
              })
            }
          </tbody>
        </table>

        <button onClick={this.monthUp}>Increase Month</button>
        <button onClick={this.monthDown}>Decrease Month</button>
        <button onClick={this.setToday}>Today</button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

class Calendar extends Component {
  render() {
    return (
      <div>
        Test
      </div>
    );
  }
}

export default App;
