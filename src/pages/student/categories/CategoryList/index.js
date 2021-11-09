import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import style from "./index.module.css"

import CategoryApi from '../../../../api/Category';

function CategoryList() {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        CategoryApi.getAll()
        .then(({ data }) => {
            setCategories(data.data)
        })
    }, [])

    const renderCatList = () => {
        return categories.map((category, idx) => {
            return (
                <Card className={style.card} key={ idx }>
                <Card.Header id={style.cardHeader}></Card.Header >
                <Card.Body>
                    <div className={style.cardContent}>
                    <center> <Card.Title>{ category.name }</Card.Title> </center>
                    </div>
                </Card.Body>
                </Card>
            )
        })
    }

    return (
        <div>
            <p className={style.title}>Categories</p>
            {categories === null ? 
                <div className={style.loading}>
                    <Spinner animation="border" role="status"></Spinner>
                    <span className={style.loadingWord}>Loading</span>
                </div>
                :
                <div className={style.cardList}>
                    {renderCatList()}
                </div>
            }
        </div>
    );
}

export default CategoryList;

