import React from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { CgTimer } from 'react-icons/cg';

import style from './index.module.css';


const Dashboard = () => {
  return (
    <div style={{padding: '0px 196px'}}>
      <h2 className={style.h2_style}>Recent</h2>
      <div className={style.bg}>
        <div>
          <div className={style.forContainerBar}>
            <h6 className={style.titleText}>HTML</h6>
            <CgTimer size='10px' style={{margin: '0px 4px 3px 200px'}}/>5 Mins
          </div>
          <div className={style.forContent_boxs}>
            <div>
              <table style={{width: '100%'}}>
                <tr>
                  <td className={style.listTable}>Attempt</td>
                  <td className={style.forSeccolum}>8</td>
                </tr>
                <tr>
                  <td className={style.listTable}>Highest Score</td>
                  <td className={style.forSeccolum}>8/10</td>
                </tr>
                <tr>
                  <td id={style.listTable}>Latest Score</td>
                  <td className={style.forSeccolum2}>7/10</td>
                </tr>    
              </table>
              <p className={style.retake}>Retake Quiz</p>
            </div>
          </div>
        </div>
        <div>
          <div className={style.forContainerBar}>
            <h6 className={style.titleText}>Linked List</h6>
            <CgTimer size='10px' style={{margin: '0px 4px 3px 169px'}}/>5 Mins
          </div>
          <div className={style.forContent_boxs}>
            <div>
              <table style={{width: '100%'}}>
                <tr>
                  <td className={style.listTable}>Attempt</td>
                  <td className={style.forSeccolum}>8</td>
                </tr>
                <tr>
                  <td className={style.listTable}>Highest Score</td>
                  <td className={style.forSeccolum}>8/10</td>
                </tr>
                <tr>
                  <td id={style.listTable}>Latest Score</td>
                  <td className={style.forSeccolum2}>7/10</td>
                </tr>    
              </table>
              <p className={style.retake}>Retake Quiz</p>
            </div>
          </div>
        </div>
        <div>
          <div className={style.forContainerBar}>
            <h6 className={style.titleText}>Encapsulation</h6>
            <CgTimer size='10px' style={{margin: '0px 4px 3px 140px'}}/>5 Mins
          </div>
          <div className={style.forContent_boxs}>
            <div>
              <table style={{width: '100%'}}>
                <tr>
                  <td className={style.listTable}>Attempt</td>
                  <td className={style.forSeccolum}>8</td>
                </tr>
                <tr>
                  <td className={style.listTable}>Highest Score</td>
                  <td className={style.forSeccolum}>8/10</td>
                </tr>
                <tr>
                  <td id={style.listTable}>Latest Score</td>
                  <td className={style.forSeccolum2}>7/10</td>
                </tr>    
              </table>
              <p className={style.retake}>Retake Quiz</p>
            </div>
          </div>
        </div>
        <div>
          <div className={style.forContainerBar}>
            <h6 className={style.titleText}>CSS</h6>
            <CgTimer size='10px' style={{margin: '0px 4px 3px 219px'}}/>5 Mins
          </div>
          <div className={style.forContent_boxs}>
            <div>
              <table style={{width: '100%'}}>
                <tr>
                  <td className={style.listTable}>Attempt</td>
                  <td className={style.forSeccolum}>8</td>
                </tr>
                <tr>
                  <td className={style.listTable}>Highest Score</td>
                  <td className={style.forSeccolum}>8/10</td>
                </tr>
                <tr>
                  <td id={style.listTable}>Latest Score</td>
                  <td className={style.forSeccolum2}>7/10</td>
                </tr>    
              </table>
              <p className={style.retake}>Retake Quiz</p>
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
          <div className={`${style.forContent_box} ${style.forScroll}`}>
            <table style={{width: '100%'}}>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>HTML</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>JavaScript</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>Algebra</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>Algebra</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>Science</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>Mathematics</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 17px'}}/>English</tb>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
            </table>
          </div>
        </div> 
        <div>
          <div className={style.forContainerBar2}><p className={style.titleText}>Friend&#39;s Activities</p>
          </div>
          <div className={`${style.forContent_box} ${style.forScroll}`}>
            <table style={{width: '100%'}}>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Paul Followed Jhon Doe</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineClipboardList size="20px" style={{margin: '0px 17px 5px 17px'}}/>Ramon Followed Jhon Doe</td>
                <td className={style.forSeccolum}>1 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Paul Followed Jhon Doe</td>
                <td className={style.forSeccolum}>16 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Einstein answered Physics Quiz</td>
                <td className={style.forSeccolum}>18 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Harvey followed Gen</td>
                <td className={style.forSeccolum}>24 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>John answered Programming Quiz</td>
                <td className={style.forSeccolum}>30 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><HiOutlineClipboardList size="20px" style={{margin: '0px 17px 5px 17px'}}/>Cinderella answered History Quiz</tb>
                <td className={style.forSeccolum}>35 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><HiOutlineClipboardList size="20px" style={{margin: '0px 17px 5px 17px'}}/>Cruz answered History Quiz</tb>
                <td className={style.forSeccolum}>35 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><HiOutlineClipboardList size="20px" style={{margin: '0px 17px 5px 17px'}}/>Dela Juan answered History Quiz</tb>
                <td className={style.forSeccolum}>35 minute ago</td>
              </tr>
              <tr>
                <tb className={style.listTable}><HiOutlineClipboardList size="20px" style={{margin: '0px 17px 5px 17px'}}/>Ramon answered History Quiz</tb>
                <td className={style.forSeccolum}>35 minute ago</td>
              </tr>
              <tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Kian Followed Jhon Doe</td>
                <td className={style.forSeccolum}>42 minute ago</td>
              </tr><tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Juan Ramon Followed Jhon Doe</td>
                <td className={style.forSeccolum}>44 minute ago</td>
              </tr><tr>
                <td className={style.listTable}><HiOutlineUserAdd size="20px" style={{margin: '0px 17px 5px 17px'}}/>Justine Followed Jhon Doe</td>
                <td className={style.forSeccolum}>55 minute ago</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
