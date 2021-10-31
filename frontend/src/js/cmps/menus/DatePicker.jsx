import React from 'react';
import { Calendar } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export class DatePicker extends React.Component {
  handleSelect = (date) => {
    const { item, group, onEditItem } = this.props; 
    const columnIdx = item.columns.findIndex(
      (currColumn) => currColumn.type === 'date'
    );
    item.columns[columnIdx].date = date.getTime();
    const newItem = { ...item };
    onEditItem(newItem, group);
    this.props.toggleMenu(this.props.toggleMenus)
  };

  render() {
    const { item } = this.props;
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
    );
  }
}
