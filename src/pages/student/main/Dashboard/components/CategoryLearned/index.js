import React from 'react';
import Card from 'react-bootstrap/Card';
import { BiBookAlt } from 'react-icons/bi';

import style from './index.module.css';

const CategoryLearned = () => {
  return (
    <Card className={style.bg}>
      <Card.Header className={style.forContainerBar2}>
        <p className={style.titleText}>
                Categories Learned
        </p>
        <button className={style.btnVeiw}>View all</button>
      </Card.Header >
      <Card.Body>
        <div className={`${style.forContent_box} ${style.forScroll}`}>
          <table style={{width: '100%'}}>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>HTML</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>JavaScript</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>Algebra</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>Algebra</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>Science</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <td className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>Mathematics</td>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
            <tr>
              <tb className={style.listTable}><BiBookAlt size="20px" style={{margin: '0px 17px 5px 0px'}}/>English</tb>
              <td className={style.forSeccolum}>5 out of 10 Quizzes Taken</td>
            </tr>
          </table>
        </div>  
      </Card.Body>
    </Card>
  );
};

export default CategoryLearned;