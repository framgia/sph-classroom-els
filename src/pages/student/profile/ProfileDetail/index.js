import React from 'react';
import style from './index.module.css';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { BiUser } from 'react-icons/bi';

const ProfileDetail = () => {
  return (
    <div>
      <div className={style.bg}>
        <div className={style.profile}>
          <div className={style.profile_01}><BiUser size='310px'/></div>
          <div><TiEdit size='60px' style={{marginTop:'288px'}} /></div>
        </div>
        <div>
          <div style={{marginRight:'400px',marginTop:'53px'}} >
            <h1 style={{fontSize:'70px', marginBottom:'0px'}}>Jane Doe</h1>
            <h2 style={{fontSize:'40px', marginBottom:'0px'}}>20 Total Quizzes Taken</h2>
            <div>
              <p className={style.follow}>10 Followers</p>
              <p className={style.follow}>10 Following</p>
            </div>
          </div>
        </div>
        <div style={{marginTop:'43px'}}>
          <div className={style.userEdit}><FaUserEdit size='60px' style={{padding:'10px'}} /></div>
        </div>
      </div>
      <div className={style.bg2}>
        <div>
          <h2 className={style.par_1}>Recent Activities</h2>
          <div className={style.cal1}>
          </div>
          <div className={style.cal_02}>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>You</h5>Followed Jhon Doe<br/>1 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}>Javascript Programming Quiz Retake<br/>2 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Jhon</h5>Followed Jhon Doe<br/>5 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}>Answered Science Quiz<br/>9 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}>Laravel Quiz Retake<br/>12 min ago</p>
            </div>
          </div>
        </div> 
        <div>
          <h2 className={style.par_1}>Friend&apos;s Activities</h2>
          <div className={style.cal1}>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Paul</h5>Followed Jhon Doe<br/>1 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}><h5 className={style.s_h3}>Einstein</h5>Answered History Quiz<br/>1 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Einstein</h5>Followed Charsles Babbage<br/>15 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}><h5 className={style.s_h3}>Erick</h5>Answered Sceince Quiz<br/>15 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}><h5 className={style.s_h3}>Aristotle</h5>Unfollowed Charles Darwin<br/>16 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}><h5 className={style.s_h3}>Paul</h5>Answered Programming Quiz<br/>17 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Paul</h5>Followed Charles Darwin<br/>18 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Therese</h5>Followed Joash Canete<br/>19 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Therese</h5>Unfollowed Jhon Darwin<br/>19 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Jhon</h5>Followed Therese<br/>20 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineClipboardList size="30px"/><p className={style.s_par}><h5 className={style.s_h3}>Jhon</h5>Answered Programmong Quiz<br/>21 min ago</p>
            </div>
            <div style={{marginLeft: '38px'}} >
              <HiOutlineUserAdd size="30px" s/><p className={style.s_par}><h5 className={style.s_h3}>Erick</h5>Unfollowed Jhon Darwin<br/>23 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProfileDetail;