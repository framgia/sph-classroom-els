import React from 'react';
import Card from 'react-bootstrap/Card';
import { RiUserAddLine } from 'react-icons/ri';
import { BsCardChecklist } from 'react-icons/bs';

import style from './index.module.css';

const FriendsActivities = () => {
  return (
    <Card className={style.bg}>
      <Card.Header className={style.forContainerBar2}>
        <p className={style.titleText}>Friends Activities</p>
      </Card.Header>
      <Card.Body>
        <div className={`${style.forContent_box} ${style.forScroll}`}>
          <table style={{ width: '100%' }}>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Paul Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>1 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Ramon Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>1 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Paul Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>16 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                Einstein answered Physics Quiz
              </td>
              <td className={style.forSeccolum}>18 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Harvey followed Gen
              </td>
              <td className={style.forSeccolum}>24 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                John answered Programming Quiz
              </td>
              <td className={style.forSeccolum}>30 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                Cinderella answered History Quiz
              </td>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                Cruz answered History Quiz
              </td>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                Dela Juan answered History Quiz
              </td>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <BsCardChecklist className={style.tableIcon} />
                Ramon answered History Quiz
              </td>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Kian Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>42 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Juan Ramon Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>44 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <RiUserAddLine className={style.tableIcon} />
                Justine Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>55 minute ago</td>
            </tr>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendsActivities;
