import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import DashboardApi from '../../../../../../api/Dashboard';

import style from './index.module.scss';
import DataTable from '../../../../../../components/DataTable';

const FriendsActivities = () => {
  const [friendsActivities, setFriendsActivites] = useState(null);
  const [sortOptions, setSortOptions] = useState({});

  const tableHeaderNames = [];

  useEffect(() => {
    DashboardApi.getFriendsActivities().then(({ data }) => {
      setFriendsActivites(data.data);
    });
  }, []);

  const iconDisplay = (activityDetail) => {
    if (activityDetail === 'App\\Models\\Quiz') {
      return (
        <img
          className={style.activityIcon}
          src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png"
          alt="file"
        />
      );
    }

    return (
      <img
        className={style.activityIcon}
        src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253"
        alt="add"
      />
    );
  };

  const renderTableData = () => {
    return friendsActivities.map((friendActivity, idx) => {
      return (
        <tr key={idx} className={style.bodyForTheFriendsAct}>
          <td className={style.listTable}>
            {iconDisplay(friendActivity.subject_type)}
            {friendActivity.description}
          </td>
          <td className={style.forSeccolum}>
            <Moment fromNow>{friendActivity.created_at}</Moment>
          </td>
        </tr>
      );
    });
  };

  return (
    <Card className={style.card}>
      <Card.Header className={style.cardHeader}>
        <p className={style.cardTitle}>Friends Activities</p>
      </Card.Header>
      <Card.Body>
        <DataTable
          data={friendsActivities}
          tableHeaderNames={tableHeaderNames}
          renderTableData={renderTableData}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          headerStyle={false}
          onSpinner={false}
        />
      </Card.Body>
    </Card>
  );
};

export default FriendsActivities;
