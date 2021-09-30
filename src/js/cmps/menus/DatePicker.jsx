import React from 'react';
import { Calendar} from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export class DatePicker extends React.Component {
  handleSelect=(date)=>{
    console.log(`date`, date)
    const {item,group,onEditItem}=this.props;
    const month= date.getMonth();
    const day= date.getDate();
    const year=date.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const printDate=`${year} ${months[month]} ${day<10 ? '0'+day : day}`
    const columnIdx = item.columns.findIndex(
      (currColumn) => currColumn.type === 'date'
    );
    item.columns[columnIdx].date = printDate;
    const newItem = { ...item };
    onEditItem(newItem, group);
  }

  render(){
    const {item}=this.props;
    const columnIdx = item.columns.findIndex(
      (currColumn) => currColumn.type === 'date'
    );
    return (
      <div className="date-menu">
      <Calendar
        date={new Date(item.columns[columnIdx].date || Date.now())}
        onShownDateChange={this.onShownDateChange}
        onChange={this.handleSelect}
        
        />
        </div>
    )
  }
}