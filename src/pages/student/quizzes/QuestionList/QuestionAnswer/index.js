import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import style from './indexQuestion.module.css';
import MultipleChoiceType from './components/MultipleChoiceType';
import FillInTheBlankType from './components/FillInTheBlankType';

const QuestionAnswer = () => {
    const [page, setPage] = useState(1);
    const [question, setQuestion] = useState({});
    const quiz = { title: 'Web Development' };
    const questions = [
        {
            id: 1,
            question: 'What does HTML stand for?',
            question_type: 'multiple choice',
            answer: 'Hyper Text Mark Lauron',
            choices: [
                { description: 'Hypertext Markup Language', is_correct: true },
                { description: 'Hyper Text Mark Lauron', is_correct: false },
                { description: 'Hypertext Mixed Language', is_correct: false },
                { description: 'How To Make Lumpia', is_correct: false },
            ],
        },
        {
            id: 2,
            question:
                'The __________________ is the standard markup language for documents designed to be displayed in a web browser.',
            question_type: 'fill in the blanks',
            answer: 'Hypertext Markup Language',
            choices: [
                { description: 'Hypertext Markup Language', is_correct: true },
                { description: 'Hyper Text Mark Lauron', is_correct: false },
                { description: 'Hypertext Mixed Language', is_correct: false },
                { description: 'How To Make Lumpia', is_correct: false },
            ],
        },
    ];

    const handlePrevButtonClick = () => {
        if (page <= 1) return;

        setPage(page - 1);
    };


    const handleNextButtonClick = () => {
        if (page >= questions.length) return;

        setPage(page + 1);
    };

    useEffect(() => {
        setQuestion(questions[page - 1]);
    }, [page]);

    return (
        <div>
            <div>
                <Container>
                    <Button
                        href="/categories/:id/quizzes/:id/questions"
                        id={style.backBtn}>
                        BACK
                    </Button>

                    <div className={style.Answertopic}>
                        <p className={style.paragraph}>
                            <b>Topic:</b> {quiz?.title}
                        </p>
                        <Badge bg="light" className={style.tml}>
                            <Card.Text className={style.time}>
                                Time Left:  <b className={style.timer}> 00:30</b>
                            </Card.Text>
                        </Badge>
                    </div>
                    <Card.Body className={style.wholeBodyCard}>
                        {question && question.question_type === 'multiple choice' ? (
                            <MultipleChoiceType question={question}></MultipleChoiceType>
                        ) : (
                            <FillInTheBlankType question={question}></FillInTheBlankType>
                        )}
                        <hr className={style.spacing} />
                        <div className={style.bottomBodyCard}>
                            <p className={style.numItems}>
                                {page} out of {questions?.length}
                            </p>

                            {page === 1 ? '' : (<Button
                                id={style.prevBtn}
                                onClick={handlePrevButtonClick}
                            >
                                <a href="#" className={style.buttontext}>Prev</a>
                            </Button>)}

                            {page === questions.length ? (<Button
                                id={style.nextBtn}
                                href="/categories/:id/quizzes/:id/results" > <span className={style.buttontext}>Submit</span>
                            </Button>) :
                                (<Button
                                    id={style.nextBtn}
                                    onClick={handleNextButtonClick}
                                >
                                    <a href="#answer" className={style.buttontext}>Next</a>
                                </Button>)}

                        </div>
                    </Card.Body>
                </Container>
                <br />
            </div>
        </div>
    );
};

export default QuestionAnswer;
