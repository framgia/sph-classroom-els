import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Card from 'react-bootstrap/Card';
import style from './index.module.css';
import Recent from './components/Recent';
import CategoryLearned from './components/CategoryLearned';
import FriendsActivities from './components/FriendsActivities';
import DashboardApi from '../../../../api/Dashboard';

function Dashboard() {
  const [categorieslearned, setCategoriesLearned] = useState(null);
  const userId = Cookies.get('user_id');

  useEffect(() => {
    DashboardApi.getAll(userId).then(({ data }) => {
      setCategoriesLearned(data.data);
    });
  }, []);

  const renderDashList = () => {
    return (
      <Card>
        <Card.Header className={style.forContainerBar2}>
          <p className={style.titleText}>Categories Learned</p>
          <button className={style.btnVeiw}>View all</button>
        </Card.Header>
        <Card.Body>
          <div className={`${style.forContent_box} ${style.forScroll}`}>
            {categorieslearned?.map((categorylearned, idx) => {
              return (
                <CategoryLearned key={idx} categorylearned={categorylearned} />
              );
            })}
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div style={{ padding: '0px 196px' }}>
      <h2 className={style.h2_style}>Recent</h2>
      <div className={style.bg}>
        <Recent title='HTML' />
        <Recent title='Linked List' />
        <Recent title='Encapsulation' />
        <Recent title='CSS' />
      </div>
      <div className={style.bg2}>
        {renderDashList()}
        <FriendsActivities />
      </div>
    </div>
  );
}

export default Dashboard;
