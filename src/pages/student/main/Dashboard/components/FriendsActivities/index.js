import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import DashboardApi from '../../../../../../api/Dashboard';
import { Col } from 'react-bootstrap';

import style from './index.module.css';

const FriendsActivities = () => {
  const [friendsActivities, setFriendsActivites] = useState(null);

  useEffect(() => {
    DashboardApi.getFriendsActivities().then(({ data }) => {
      setFriendsActivites(data.data);
    });
  }, []);

  const iconDisplay = (activityDetail) => {
    if (activityDetail === 'App\\Models\\Quiz') {
      return (
        <img
          className={style.tableIcon}
          src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png"
          alt="file"
        />
      );
    }

    return (
      <img
        className={style.tableIcon}
        src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253"
        alt="add"
      />
    );
  };

  return (
    <Col className="container">
      <Card>
        <Card.Header className={style.forContainerBar2}>
          <p className={style.titleText}>Friends Activities</p>
        </Card.Header>
        <Card.Body>
          <div className={`${style.forContent_box} ${style.forScroll}`}>
            <table style={{ width: '100%' }}>
              <tbody>
                {friendsActivities?.length > 0 ? (
                  friendsActivities.map((friendActivity, idx) => {
                    return (
                      <tr key={idx}>
                        <td className={style.listTable}>
                          {iconDisplay(friendActivity.subject_type)}
                          {friendActivity.description}
                        </td>
                        <td className={style.forSeccolum}>
                          <Moment fromNow>{friendActivity.created_at}</Moment>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <center>No Friend Activities</center>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FriendsActivities;
