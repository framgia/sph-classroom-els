import React from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';

import style from './index.module.css'

const Dashboard = () => {
 return (
     <div>
         <h2 className={style.h2_style}>Recent</h2>
         <div className={style.bg}>
             <div>
                 <div className={style.forContainerBar}><h6 className={style.titleText}>TOPIC:</h6> Web Development
                 </div>
                 <div className={style.forContent_boxs}>
                     <div className={style.box_small}>
                         <p className={style.forTexts}>Score: 10/10<br/>Time: 5 Mins</p>
                     </div>
                 </div>
             </div>
             <div>
                 <div className={style.forContainerBar}><h6 className={style.titleText}>TOPIC:</h6> Data Structure
                 </div>
                 <div className={style.forContent_boxs}>
                 <   div className={style.box_small}>
                         <p className={style.forTexts}>Score: 6/10<br/>Time: 5 Mins</p>
                     </div>
                 </div>
             </div>
             <div>
                 <div className={style.forContainerBar}><h6 className={style.titleText}>Visited:</h6> Friends
                 </div>
                 <div className={style.forContent_boxs}>
                     <div className={style.box_small}>
                         <p className={style.forTexts}>Jhon Paul Lim</p>
                     </div>
                 </div>
             </div>
         </div>
         <div className={style.bg2}>
            <div>
                <div className={style.forContainerBar2}>
                    <p className={style.titleText}>Categories Learned</p>
                    <button className={style.btnVeiw}>View all</button>
                </div>
                <div className={style.forContent_box}>
                    <table style={{width: '100%'}}>
                        <tr>
                            <td><BiBookAlt size="30px"/>HTML</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <td><BiBookAlt size="30px"/>JavaScript</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <td><BiBookAlt size="30px"/>Algebra</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <td><BiBookAlt size="30px"/>Algebra</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <td><BiBookAlt size="30px"/>Science</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <td><BiBookAlt size="30px"/>Mathematics</td>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                        <tr>
                            <tb><BiBookAlt size="30px"/>English</tb>
                            <td className={style.forSeccolum}>Quizzes Taken: 5 out of 10</td>
                        </tr>
                    </table>
                </div>
            </div> 
            <div>
                 <div className={style.forContainerBar2}><p className={style.titleText}>Friend's Activities</p>
                 </div>
                 <div className={`${style.forContent_box} ${style.forScroll}`}>
                     <p><HiOutlineUserAdd size="30px"/><h6 className={style.titleText}>Paul</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineClipboardList size="30px"/><h6 className={style.titleText}>Erick</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineUserAdd size="30px"/><h6 className={style.titleText}>Ramon</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineClipboardList size="30px"/><h6 className={style.titleText}>Paul</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineUserAdd size="30px"/><h6 className={style.titleText}>Machiel</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineClipboardList size="30px"/><h6 className={style.titleText}>Paul</h6>Followed Jhon Doe<br/>1 min ago</p>
                     <p><HiOutlineUserAdd size="30px"/><h6 className={style.titleText}>Jhon</h6>Followed Jhon Doe<br/>2 min ago</p>
                 </div>
             </div>
         </div>
     </div>
 );

};

export default Dashboard;
