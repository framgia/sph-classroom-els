import React from 'react';

import style from './index.module.css';
import Recent from './components/Recent';
import CategoryLearned from './components/CategoryLearned';
import FriendsActivities from './components/FriendsActivities';


const Dashboard = () => {
  return (
    <div style={{padding: '0px 196px'}}>
      <h2 className={style.h2_style}>Recent</h2>
      <div className={style.bg}>
        <Recent title='HTML'/>
        <Recent title='Linked List'/>
        <Recent title='Encapsulation'/>
        <Recent title='CSS'/>
      </div>
      <div className={style.bg2}>
        <CategoryLearned />
        <FriendsActivities />
      </div>
    </div>
  );

};

export default Dashboard;
