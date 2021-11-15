import React from "react";
import { Table } from "react-bootstrap";

import style from './index.module.css';

const Listdescript = ({firstRow, secRow, thirRow}) => {

    return (
        <table style={{width: '100%'}}>
        <tr>
            <td id={style.listTable}>Level:</td>
            <td className={style.forSeccolum}>{firstRow}</td>
        </tr>
        <tr>
            <td id={style.listTable}>Available Quizzes:</td>
            <td className={style.forSeccolum}>{secRow}</td>
        </tr>
        <tr>
            <td id={style.listTable}>Quizzes Taken:</td>
            <td className={style.forSeccolum}>{thirRow}</td>
        </tr>
       
    </table>
    )
}

export default Listdescript;