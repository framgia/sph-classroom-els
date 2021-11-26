import React from 'react';
import { Card } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { BiFilterAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';

import style from './index.module.css';

const StudentList = () => {
  return (
    <div
      className='d-flex justify-content-center'
      style={{ marginTop: '120px' }}
    >
      <Card>
        <Card.Header className={style.CardHeaderstyle}>
          <input
            className={style.inputstyle}
            type='text'
            name='answer'
            placeholder='Search'
          />
          <BiSearch className={style.iconsearchstyle} />
          <Dropdown>
            <Dropdown.Toggle
              className={style.Dropdownstyle}
              variant='link'
              bsPrefix='none'
            >
              <span className={style.Textfordropdownstyle}> Filter </span>
              <BiFilterAlt size='20px' />
            </Dropdown.Toggle>
            <Dropdown.Menu className={style.Dropdownmenustyle}>
              <Dropdown.Item
                className={style.Dropdownitemstyle}
                href='#/following'
              >
                Following
              </Dropdown.Item>
              <Dropdown.Item
                className={style.Dropdownitemstyle}
                href='#/followers'
              >
                Followers
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body className={style.CardBodystyle}>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div className={style.s_h3}>
              <img
                src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/261163455_453166156175670_160593561815661759_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeEr9QWUzJUU_Fl3Cwa6Og1hItwF4oLi_9si3AXiguL_24VoQld8u4528RHx5ywaOWtTql7cudY0IPOlFkj5UjIC&_nc_ohc=GddmaT-WdZAAX96Nv-S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=7de756e93af262f36949cfcad9d768af&oe=61C67DE3'
                alt='add user'
                width='30px'
                height='30px'
              />
              <span className={style.margineforspan}>Joash Cañete</span>
              <Button className={style.button} variant='primary'>
                Follow
              </Button>
            </div>
            <div id={style.floatrighttext}>
              <div> 8 Following </div>
              <div className={style.followerstextindentstyle}>8 Following</div>
            </div>
            <div className={style.s_h3}>
              <img
                src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/261163455_453166156175670_160593561815661759_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeEr9QWUzJUU_Fl3Cwa6Og1hItwF4oLi_9si3AXiguL_24VoQld8u4528RHx5ywaOWtTql7cudY0IPOlFkj5UjIC&_nc_ohc=GddmaT-WdZAAX96Nv-S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=7de756e93af262f36949cfcad9d768af&oe=61C67DE3'
                alt='add user'
                width='30px'
                height='30px'
              />
              <span className={style.margineforspan}>Leah Mae Bustamante</span>
              <Button className={style.button} variant='primary'>
                Follow
              </Button>
            </div>
            <div id={style.floatrighttext}>
              <div> 8 Following </div>
              <div className={style.followerstextindentstyle}>8 Following</div>
            </div>
            <div className={style.s_h3}>
              <img
                src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/261163455_453166156175670_160593561815661759_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeEr9QWUzJUU_Fl3Cwa6Og1hItwF4oLi_9si3AXiguL_24VoQld8u4528RHx5ywaOWtTql7cudY0IPOlFkj5UjIC&_nc_ohc=GddmaT-WdZAAX96Nv-S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=7de756e93af262f36949cfcad9d768af&oe=61C67DE3'
                alt='add user'
                width='30px'
                height='30px'
              />
              <span className={style.margineforspan}>Paul Erick</span>
              <Button className={style.button} variant='primary'>
                Follow
              </Button>
            </div>
            <div id={style.floatrighttext}>
              <div> 8 Following </div>
              <div className={style.followerstextindentstyle}>8 Following</div>
            </div>
            <div className={style.s_h3}>
              <img
                src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/261163455_453166156175670_160593561815661759_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeEr9QWUzJUU_Fl3Cwa6Og1hItwF4oLi_9si3AXiguL_24VoQld8u4528RHx5ywaOWtTql7cudY0IPOlFkj5UjIC&_nc_ohc=GddmaT-WdZAAX96Nv-S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=7de756e93af262f36949cfcad9d768af&oe=61C67DE3'
                alt='add user'
                width='30px'
                height='30px'
              />
              <span className={style.margineforspan}>Alucard Smith</span>
              <Button className={style.button} variant='primary'>
                Follow
              </Button>
            </div>
            <div id={style.floatrighttext}>
              <div> 8 Following </div>
              <div className={style.followerstextindentstyle}>8 Following</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentList;
