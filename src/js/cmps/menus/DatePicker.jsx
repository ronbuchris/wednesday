import React from 'react';
import { Calendar } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export class DatePicker extends React.Component {
  handleSelect(date){
    console.log(date); // native Date object
  }
  render(){
    return (
      <div className="date-menu">
      <Calendar
        date={new Date()}
        onChange={this.handleSelect}
        />
        </div>
    )
  }
}