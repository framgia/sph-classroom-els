import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsArrowRightCircle } from 'react-icons/bs';

import style from './index.module.scss';

const Location = () => {
  const [location, setLocation] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Programming'
    },
    {
      id: 2,
      name: 'Web Development'
    },
    {
      id: 3,
      name: 'Science'
    },
    {
      id: 4,
      name: 'Math'
    },
    {
      id: 5,
      name: 'History'
    }
  ];

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.locationLabel}>Location</Form.Label>
        <Form.Control readonly="readonly" value="Programming" />
      </Form.Group>

      <ListGroup>
        {categories &&
          categories.map((category, idx) => {
            return (
              <ListGroup.Item
                key={idx}
                className={style.categoryListItem}
                onClick={() => setLocation([...location, category.name])}
                onMouseEnter={() => {
                  setHoveredItem(idx);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                }}
              >
                {category.name}
                <BsArrowRightCircle
                  className={
                    hoveredItem === idx ? style.arrowRightIcon : 'd-none'
                  }
                />
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Form>
  );
};

export default Location;
