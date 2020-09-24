```jsx
import React, { useState } from 'react';
import Calendar from './components/calendar';

const App: React.FC = () => {
  const date = {
    // visible: true,
    multiple: true,
    value: [ new Date('2019-10-11') , new Date('2019-10-17') ],
    // min: '2019-9-12',
    // max: '2019-11-11',
    dateRender: (date: Date) => {
      if (/(0|6)/.test((date.getDay()).toString())){
        return (
          <div className="custom">
            <div className="custom__date">{date.getDate()}</div>
            <div className="custom__text">休息</div>
          </div>
        );
      }
      return date.getDate();
    },
    disabledDate: (date:any) => /(0|6)/.test(date.getDay())
  };
  return (
    <Calendar
      {...date}
      onChange={(value: any) => {
        // this.setState({ value });
        console.log('onChange', new Date(value[0]) );
      }}
    />
  );
}

export default App
```