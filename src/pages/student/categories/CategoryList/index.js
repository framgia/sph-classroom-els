import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
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
                <Link to={`/categories/${category.id}/quizzes`}>
                    <div className={style.cardContent}>
                    <center> <Card.Title className={style.cardTitle}>{ category.name }</Card.Title> </center>
                    </div>
                </Link>   
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

