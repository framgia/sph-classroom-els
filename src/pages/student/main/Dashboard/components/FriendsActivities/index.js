import React from 'react';
import Card from 'react-bootstrap/Card';

import style from './index.module.css';

const FriendsActivities = () => {
  return(
    <Card className={style.bg}>
      <Card.Header className={style.forContainerBar2}>
        <p className={style.titleText}>Friends Activities</p>
      </Card.Header >
      <Card.Body>
        <div className={`${style.forContent_box} ${style.forScroll}`}>
          <table style={{width: '100%'}}>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Paul Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>1 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Ramon Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>1 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Paul Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>16 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png" alt="file"/>
                        Einstein answered Physics Quiz
              </td>
              <td className={style.forSeccolum}>18 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Harvey followed Gen
              </td>
              <td className={style.forSeccolum}>24 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        John answered Programming Quiz
              </td>
              <td className={style.forSeccolum}>30 minute ago</td>
            </tr>
            <tr>
              <tb className={style.listTable}>
                <img className={style.tableIcon} src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png" alt="file"/>
                        Cinderella answered History Quiz
              </tb>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <tb className={style.listTable}>
                <img className={style.tableIcon} src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png" alt="file"/>
                        Cruz answered History Quiz
              </tb>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <tb className={style.listTable}>
                <img className={style.tableIcon} src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png" alt="file"/>
                        Dela Juan answered History Quiz
              </tb>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <tb className={style.listTable}>
                <img className={style.tableIcon} src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png" alt="file"/>
                        Ramon answered History Quiz
              </tb>
              <td className={style.forSeccolum}>35 minute ago</td>
            </tr>
            <tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Kian Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>42 minute ago</td>
            </tr><tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
                        Juan Ramon Followed Jhon Doe
              </td>
              <td className={style.forSeccolum}>44 minute ago</td>
            </tr><tr>
              <td className={style.listTable}>
                <img className={style.tableIcon} src="https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253" alt="add"/>
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

