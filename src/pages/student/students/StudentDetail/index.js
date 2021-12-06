import React from 'react';
import style from './index.module.css';
import { BiUser } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';
import { BsCardChecklist } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri';

const StudentDetail = () => {
  return (
    <center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '50px',
          paddingLeft: '10%',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div className={style.profile_01}>
            <BiUser className={style.biuserposition} />
          </div>

          <div style={{ marginLeft: '40px' }}>
            <div className={style.studentdetailsposition}>
              <div className={style.userEditText}>Jane Doe</div>
              <div className={style.totalquizzestakenstyle}>
                20 Total Quizzes Taken
              </div>
              <div className={style.followone}>10 Followers</div>
              <div className={style.follow}>10 Following</div>
            </div>
          </div>
        </div>
        <div className={style.buttonDivstyle}>
          <Button className={style.Buttonstyle} variant='success'>
            Unfollow
          </Button>
        </div>
      </div>
      <div className={style.bg2} style={{ marginTop: '40px' }}>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Quizzes
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answerd Web Development{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered C Programming Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}> Answered Science </span>{' '}
              </h6>
              <div id={style.floatrighttext}>10 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}> Answered History </span>{' '}
              </h6>
              <div id={style.floatrighttext}>30 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Mathematics{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Geometry Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Encapsulation Quiz Retake{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
          </div>
        </div>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Activities
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Followed John Doe{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Einstein answered Physics Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}> Followed Joash </span>{' '}
              </h6>
              <div id={style.floatrighttext}>10 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}> Followed Gen </span>{' '}
              </h6>
              <div id={style.floatrighttext}>30 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered HTML Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Programming Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Answered History Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default StudentDetail;
