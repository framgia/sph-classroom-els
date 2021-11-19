import React from 'react';
import style from './index.module.css';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { BiUser } from 'react-icons/bi';

const ProfileDetail = () => {
  return (
    <center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '50px',
          paddingLeft: '7%',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div className={style.profile_01}>
            <BiUser className={style.biuserposition} />
            <TiEdit size='30px' style={{ marginLeft: '165px' }} />
          </div>

          <div style={{ marginLeft: '53px' }}>
            <div style={{ marginTop: '33px' }}>
              <div className={style.userEditText}>
                <h2 style={{ fontSize: '32px', fontWeight: 'Bold' }}>
                  Jane Doe
                </h2>
                <FaUserEdit size='40px' className={style.userEdit} />
              </div>
              <h4 style={{ fontSize: '24px', marginBottom: '20px',  color: '#48535B'}}>
                20 Total Quizzes Taken
              </h4>
              <p className={style.followone}>10 Followers</p>
              <p className={style.follow}>10 Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.bg2} style={{ marginTop: '40px' }}>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Recent Activities
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' />
                <span className={style.margineforspan}> You Followed Jhon Doe </span> </h6>
              <div id={style.floatrighttext}>1 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}> Javascript Programming Quiz Retake </span> </h6>
              <div id={style.floatrighttext}>2 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}> Jhon Followed Jhon Doe </span> </h6>
              <div id={style.floatrighttext}>5 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}> Answered Science Quiz </span></h6>
              <div id={style.floatrighttext}>9 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Laravel Quiz Retake </span></h6>
              <div id={style.floatrighttext}> 12 min ago </div>
            </div>
          </div>
        </div>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Friend&apos;s Activities
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Paul Followed Jhon Doe </span></h6>
              <div id={style.floatrighttext}>1 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Einstein Answered History Quiz </span> </h6>
              <div id={style.floatrighttext}>1 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Einstein Followed Charsles Babbage </span> </h6>
              <div id={style.floatrighttext}>15 min ago</div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Erick Answered Sceince Quiz </span></h6>
              <div id={style.floatrighttext}>15 min ago</div>
            </div>
            <div>
              <h6 className={style.s_h3}> <HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Aristotle Unfollowed Charles Darwin </span> </h6>
              <div id={style.floatrighttext}>16 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Paul Answered Programming Quiz </span> </h6>
              <div id={style.floatrighttext}>17 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Paul Followed Charles Darwin  </span></h6>
              <div id={style.floatrighttext}>18 min ago</div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Therese Followed Joash Canete </span> </h6>
              <div id={style.floatrighttext}>19 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Therese Unfollowed Jhon Darwin </span></h6>
              <div id={style.floatrighttext}>19 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Jhon Followed Therese </span></h6>
              <div id={style.floatrighttext}>20 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineClipboardList size='20px' />
                <span className={style.margineforspan}>Jhon Answered Programmong Quiz </span></h6>
              <div id={style.floatrighttext}>21 min ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}><HiOutlineUserAdd size='20px' s />
                <span className={style.margineforspan}>Erick Unfollowed Jhon Darwin </span> </h6>
              <div id={style.floatrighttext}>23 min ago </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default ProfileDetail;
