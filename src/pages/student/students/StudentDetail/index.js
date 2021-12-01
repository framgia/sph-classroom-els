import React from 'react';
import style from './index.module.css';
import { BiUser } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';

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
              <div className={style.userEditText}>
                  Jane Doe
              </div>
              <div className={style.totalquizzestakenstyle}>
                20 Total Quizzes Taken
              </div>
              <div className={style.followone}>10 Followers</div>
              <div className={style.follow}>10 Following</div>
            </div>
          </div>
        </div>
        <div className={style.buttonDivstyle}>
          <Button className={style.Buttonstyle} variant="success">Unfollow</Button>
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
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answerd Web Development{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answered C Programming Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Science{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>10 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answered History{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>30 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Mathematics{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  {' '}
                  Answered Geometry Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
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
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258875851_297713058742510_5589738744787657544_n.png?_nc_cat=109&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHv_9CW90DeFp14_vAalunNcCS_Y5vavKBwJL9jm9q8oEX6JrJoiU0VrlqjF_5PgnvnQjROfpU3q45qissgUoIe&_nc_ohc=I6yGb7JUAyQAX-UKAvr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=67b97aa28bfeb931f04b0a6033dc5598&oe=61BDEB36'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Followed Jhon Doe{' '}
                </span>
              </h6>
              <div id={style.floatrighttext}>1 minute ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Einstein answered Physics Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>6 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258875851_297713058742510_5589738744787657544_n.png?_nc_cat=109&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHv_9CW90DeFp14_vAalunNcCS_Y5vavKBwJL9jm9q8oEX6JrJoiU0VrlqjF_5PgnvnQjROfpU3q45qissgUoIe&_nc_ohc=I6yGb7JUAyQAX-UKAvr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=67b97aa28bfeb931f04b0a6033dc5598&oe=61BDEB36'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Followed Joash{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>10 minutes ago</div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258875851_297713058742510_5589738744787657544_n.png?_nc_cat=109&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHv_9CW90DeFp14_vAalunNcCS_Y5vavKBwJL9jm9q8oEX6JrJoiU0VrlqjF_5PgnvnQjROfpU3q45qissgUoIe&_nc_ohc=I6yGb7JUAyQAX-UKAvr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=67b97aa28bfeb931f04b0a6033dc5598&oe=61BDEB36'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Followed Gen{' '}
                </span>
              </h6>
              <div id={style.floatrighttext}>30 minute ago</div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                {' '}
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Answered HTML Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>50 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Answered Programming Quiz{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>55 minutes ago </div>
            </div>
            <div>
              <h6 className={style.s_h3}>
                <img
                  src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                  alt='add user'
                  width='20px'
                  height='20px'
                />
                <span className={style.margineforspan}>
                  Answered History Quiz{' '}
                </span>
              </h6>
              <div id={style.floatrighttext}>55 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};
 
export default StudentDetail;