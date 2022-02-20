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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [paths, setPaths] = useState([]);
  const [path, setPath] = useState('');
  const [currentPath, setCurrentPath] = useState({});
  const [chosenPath, setChosenPath] = useState(null);
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(null);
  const [location, setLocation] = useState(null);

  //TO HANDLE THE FETCHING OF CATEGORIES/SUBCATEGORIES
  useEffect(() => {
    setCategories(null);
    chosenCategoryPathID ? toast('Processing', 'Getting Subcategories...') : {};

    CategoryApi.getCategories({ category_id: chosenCategoryPathID }).then(
      ({ data }) => {
        setCategories(data.data);
        chosenCategoryPathID ? isRootCategory(false) : {};
      }
    );
  }, [chosenCategoryPathID]);

  //TO HANDLE THE SETTING OF PATH
  useEffect(() => {
    setPath('');

    if (paths?.length > 0) {
      formatPath();
      setCurrentPath(paths[paths.length - 1]);
    } else {
      setCurrentPath('');
    }
  }, [paths]);

  //TO HANDLE GOING BACK TO A CERTAIN PARENT CATEGORY
  useEffect(() => {
    if (backToParentCategory) {
      setChosenCategoryPathID(currentPath?.category_id);
      setPaths(paths.filter((path) => path.id !== currentPath?.id));
      setBackButtonStatus(false);
      setLocation(null);
    }

    if (!chosenCategoryPathID) {
      isRootCategory(true);
    }
  }, [backToParentCategory]);

  //TO SET LOCATION OR PATH
  useEffect(() => {
    if (location) {
      setPaths([...paths, location]);
    }

    if (chosenPath) {
      setChosenCategoryPathID(chosenPath.id);
      setPaths([...paths, chosenPath]);
      setChosenPath(null);
    }
  }, [location, chosenPath]);

  //TO FORMAT THE LOCATION FROM AN ARRAY TO A STRING
  const formatPath = () => {
    paths?.forEach((p, idx) =>
      idx === 0
        ? setPath((path) => path.concat(p.name))
        : setPath((path) => path.concat(' > ', p.name))
    );
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.locationLabel}>Location</Form.Label>
        <Form.Control readOnly="readonly" value={path} />
      </Form.Group>

      <ListGroup>
        {!chosenCategoryPathID && categories ? (
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
              onClick={() => setLocation(null)}
            />
          </ListGroup.Item>
        ) : (
          {}
        )}
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
                      setPaths(
                        paths.filter((path) => path.id !== location?.id)
                      );
                      setLocation(null);
                      setChosenPath(category);
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
                    if (location?.name !== category.name) {
                      setPaths(
                        paths.filter((path) => path.id !== location?.id)
                      );
                      setLocation(category);
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
