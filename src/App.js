import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import calendarBuilder, { htmlCalendar } from 'CalendarBuilder';



// const myCalendar = CalendarBuilder.data(new Date());
// console.log(myCalendar)

export const FULL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const ABRV_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];


class App extends Component {

  state = {
    currentDate: new Date(),
    datePicked: false
  }

  monthUp = () => {
    this.setState((prev) => {
      const newDate = new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1);
      return { currentDate: newDate };
    });
  }

  monthDown = () => {
    this.setState((prev) => {
      const newDate = new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1);
      return { currentDate: newDate };
    });
  }

  updateMonth = (e) => {
    const target = e.target.value;
    this.setState((prev) => {
      const newDate = new Date(prev.currentDate.getFullYear(), ABRV_MONTHS.indexOf(target), prev.currentDate.getDate());
      return { currentDate: newDate };
    });
  }

  clickDate = (date) => {
    this.setState((prev) => {
      const newDate = new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth(), date);
      return { 
        datePicked: true,
        currentDate: newDate
      };
    });
  }

  setToday = () => {
    this.setState({ 
      currentDate: new Date(), 
      datePicked: true
    });
  };

  clear = () => {
    this.setState({
      currentDate: new Date(),
      datePicked: false
    })
  }

  render() {

    const myCalendar = calendarBuilder(this.state.currentDate);
    const { currentDate, datePicked } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br /> 
          { 
            datePicked && <p>Picked Date { myCalendar.month } { currentDate.getDate() }, { myCalendar.year }</p> 
          }
          {
            !datePicked && <p>Please pick a date</p>
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
