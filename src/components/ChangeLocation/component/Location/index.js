import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useToast } from '../../../../hooks/useToast';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { BsArrowRightCircle } from 'react-icons/bs';

import style from './index.module.scss';

import CategoryApi from '../../../../api/Category';

const Location = ({
  isRootCategory,
  backToParentCategory,
  setBackButtonStatus
}) => {
  const toast = useToast();
  const [categories, setCategories] = useState(null);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [chosenCategoryID, setChosenCategoryID] = useState(null);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    setCategories(null);
    chosenCategoryID ? toast('Processing', 'Getting Subcategories...') : '';

    CategoryApi.getCategories({ category_id: chosenCategoryID }).then(
      ({ data }) => {
        setCategories(data.data);
        chosenCategoryID ? isRootCategory(false) : '';
      }
    );
  }, [chosenCategoryID]);

  useEffect(() => {
    setLocation('');

    if (locations?.length > 0) {
      formatLocations();
      setCurrentLocation(locations[locations.length - 1]);
    } else {
      setCurrentLocation('');
    }
  }, [locations]);

  useEffect(() => {
    if (backToParentCategory) {
      setChosenCategoryID(currentLocation?.category_id);
      setLocations(
        locations.filter((location) => location.id !== currentLocation?.id)
      );
      setBackButtonStatus(false);
    }

    if (!chosenCategoryID) {
      isRootCategory(true);
    }
  }, [backToParentCategory]);

  const formatLocations = () => {
    locations.forEach((loc, idx) =>
      idx === 0
        ? setLocation((location) => location.concat(loc.name))
        : setLocation((location) => location.concat(' > ', loc.name))
    );
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.locationLabel}>Location</Form.Label>
        <Form.Control readOnly="readonly" value={location} />
      </Form.Group>

      <ListGroup>
        {
          <ListGroup.Item
            className={style.categoryListItem}
            onMouseEnter={() => {
              setHoveredItem(-1);
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
            }}
          >
            <div>Root</div>
            <BsArrowRightCircle
              className={hoveredItem === -1 ? style.arrowRightIcon : 'd-none'}
            />
          </ListGroup.Item>
        }
        {categories ? (
          categories.map((category, idx) => {
            return (
              <ListGroup.Item
                key={idx}
                className={style.categoryListItem}
                onMouseEnter={() => {
                  setHoveredItem(idx);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                }}
              >
                <div
                  onClick={() => {
                    if (category.subcategories_count > 0) {
                      if (category.name !== currentLocation?.name) {
                        setChosenCategoryID(category.id);
                        setLocations([...locations, category]);
                      }
                    } else {
                      toast(
                        'Message',
                        'This category does not have a subcategory.'
                      );
                    }
                  }}
                >
                  {category.name}
                </div>
                <BsArrowRightCircle
                  className={
                    hoveredItem === idx ? style.arrowRightIcon : 'd-none'
                  }
                  onClick={() => {
                    if (category.name !== currentLocation?.name && !moved) {
                      setLocations([...locations, category]);
                      setMoved(true);
                    } else {
                      setLocations(
                        locations.filter(
                          (location) => location.id !== currentLocation?.id
                        )
                      );
                      setMoved(false);
                    }
                  }}
                />
              </ListGroup.Item>
            );
          })
        ) : (
          <center>
            <Spinner animation="border" className={style.spinner} />
          </center>
        )}
      </ListGroup>
    </Form>
  );
};

Location.propTypes = {
  isRootCategory: PropTypes.func,
  backToParentCategory: PropTypes.bool,
  setBackButtonStatus: PropTypes.func
};

export default Location;
