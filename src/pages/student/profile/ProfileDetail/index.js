import React from 'react';
import style from './index.module.css';
import { FaUserEdit } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri';

const ProfileDetail = () => {
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
            <BsPencilSquare
              size='20px'
              style={{
                marginLeft: '170px',
                strokeWidth: '0px',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ marginLeft: '40px' }}>
            <div style={{ marginTop: '33px' }}>
              <div className={style.userEditText}>
                <h2 style={{ fontSize: '32px', fontWeight: 'Bold' }}>
                  Jane Doe
                </h2>
                <FaUserEdit size='40px' className={style.userEdit} />
              </div>
              <h4
                style={{
                  fontSize: '24px',
                  marginBottom: '20px',
                  color: '#48535B',
                }}
              >
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
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>You followed Isaac</span>
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Answered C Programming Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  You followed Deucalion
                </span>
              </h6>
              <div id={style.floatrighttext}>10 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>You followed Derek</span>
              </h6>
              <div id={style.floatrighttext}>30 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>HTML Quiz Retake</span>
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Answered Geometry Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Encapsulation Quiz Retake
                </span>
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
          </div>
        </div>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
             Friend’s Activities
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  Paul followed John Doe
                </span>
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Einstein answered Physics Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  Erick followed Joash
                </span>
              </h6>
              <div id={style.floatrighttext}>10 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  Harvey followed Gen
                </span>
              </h6>
              <div id={style.floatrighttext}>30 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Therese answered HTML Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  John answered Programming Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <BsCardChecklist size='20px' />
                <span className={style.margineforspan}>
                  Cinderella answered History Quiz
                </span>
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default ProfileDetail;
