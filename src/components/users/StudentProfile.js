import React from 'react';
import '../css/GlobalStyle.css';
import style from './StudentProfile.module.css';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
import { BiUser } from 'react-icons/bi';

const StudentProfile = () => {
 return (
     <div>
         <div className={style.bg}>
             <div className={style.profile}>
                 <div className={style.profile_01}><BiUser size='200px'/></div>
                 <div><TiEdit size='30px' style={{marginTop:'208px'}} /></div>
             </div>
             <div>
                 <div style={{marginRight:'400px'}} >
                     <h1 style={{fontSize:'70px', marginBottom:'0px'}}>Jane Doe</h1>
                     <h2 style={{fontSize:'40px', marginBottom:'0px'}}>20 Total Quizzes Taken</h2>
                     <div>
                         <p className={style.follow}>10 Followers</p>
                         <p className={style.follow}>10 Following</p>
                     </div>
                 </div>
             </div>
             <div>
                <div className={style.userEdit}><FaUserEdit size='30px' style={{padding:'10px'}} /></div>
             </div>
         </div>
         <div className={style.bg2}>
            <div>
                <h2 className='par_1'>Recent Activities</h2>
                <div className='cal1'>
                </div>
                <div className='cal_02'>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>You</h3>Followed Jhon Doe<br/>1 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'>Javascript Programming Quiz Retake<br/>2 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Jhon</h3>Followed Jhon Doe<br/>5 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'>Answered Science Quiz<br/>9 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'>Laravel Quiz Retake<br/>12 min ago</p>
                    </div>
                </div>
            </div> 
            <div>
                <h2 className='par_1'>Friend's Activities</h2>
                 <div className='cal1'>
                 </div>
                 <div className='cal_02 cal_3'>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Paul</h3>Followed Jhon Doe<br/>1 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'><h3 className='s_h3'>Einstein</h3>Answered History Quiz<br/>1 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Einstein</h3>Followed Charsles Babbage<br/>15 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'><h3 className='s_h3'>Erick</h3>Answered Sceince Quiz<br/>15 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'><h3 className='s_h3'>Aristotle</h3>Unfollowed Charles Darwin<br/>16 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'><h3 className='s_h3'>Paul</h3>Answered Programming Quiz<br/>17 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Paul</h3>Followed Charles Darwin<br/>18 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Therese</h3>Followed Joash Canete<br/>19 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Therese</h3>Unfollowed Jhon Darwin<br/>19 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Jhon</h3>Followed Therese<br/>20 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                    <HiOutlineClipboardList size="30px"/><p className='s_par'><h3 className='s_h3'>Jhon</h3>Answered Programmong Quiz<br/>21 min ago</p>
                    </div>
                    <div style={{marginLeft: '38px'}} >
                        <HiOutlineUserAdd size="30px" s/><p className='s_par'><h3 className='s_h3'>Erick</h3>Unfollowed Jhon Darwin<br/>23 min ago</p>
                    </div>
                 </div>
             </div>
         </div>
     </div>
 );

};

export default StudentProfile;