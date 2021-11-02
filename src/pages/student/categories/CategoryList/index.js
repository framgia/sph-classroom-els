import React from "react";
import Card from 'react-bootstrap/Card';
import style from "./index.module.css"

function CategoryList() {
    return (
        <div>
         <p className={style.title} >
               Categories
           </p>
           
        <div className={style.cardList}>
          
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title>Web Development</Card.Title> </center>
                </div>
            </Card.Body>
            </Card>


            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title>Math</Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

         
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

         
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

         
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

         
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>


            
            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

                  


            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>

                  

            <Card className={style.card}>
            <Card.Header className={style.cardHeader}></Card.Header >
            <Card.Body>
                <div className={style.cardContent}>
                   <center> <Card.Title></Card.Title> </center>
                </div>
            </Card.Body>
            </Card>
        </div>
        </div>
    );
}

export default CategoryList;