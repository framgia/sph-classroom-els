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
  setBackButtonStatus,
  location,
  setLocation,
  setLocationPathDisplay,
  type,
  isSaved
}) => {
  const toast = useToast();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [paths, setPaths] = useState([]);
  const [pathDisplay, setPathDisplay] = useState(setLocationPathDisplay);
  const [currentPath, setCurrentPath] = useState({});
  const [chosenPath, setChosenPath] = useState(null);
  const [chosenCategoryPathID, setChosenCategoryPathID] = useState(null);

  //TO HANDLE THE FETCHING OF CATEGORIES/SUBCATEGORIES
  useEffect(() => {
    setCategories(null);
    chosenCategoryPathID ? toast('Processing', 'Getting Subcategories...') : '';

    CategoryApi.getCategories({ category_id: chosenCategoryPathID })
      .then(({ data }) => {
        setCategories(data.data);
        chosenCategoryPathID ? isRootCategory(false) : '';
      })
      .catch(() =>
        toast('Error', 'There was an error getting the list of categories.')
      );
  }, [chosenCategoryPathID]);

  useEffect(() => {
    if (type === 'withPathDisplay' && isSaved) {
      setLocationPathDisplay(pathDisplay);
    }
  });

  //TO HANDLE THE SETTING OF THE PATH
  useEffect(() => {
    setPathDisplay('');

    if (paths?.length > 0) {
      formatPathDisplay();
      setCurrentPath(paths[paths.length - 1]);
    } else {
      setCurrentPath('');
    }
  }, [paths]);

  //TO FORMAT THE LOCATION FROM AN ARRAY TO A STRING
  const formatPathDisplay = () => {
    paths?.forEach((p, idx) =>
      idx === 0
        ? setPathDisplay((path) => path.concat(p.name))
        : setPathDisplay((path) => path.concat(' > ', p.name))
    );
  };

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

  //TO SET LOCATION OR PATH WHEN CLICKING A CATEGORY
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

  const onCategoryClick = (category) => {
    if (category.subcategories_count > 0) {
      setPaths(paths.filter((path) => path.id !== location?.id));
      setLocation(null);
      setChosenPath(category);
    } else {
      toast('Message', 'This category does not have a subcategory.');
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.locationLabel}>Location</Form.Label>
        <Form.Control readOnly="readonly" value={pathDisplay} />
      </Form.Group>
      <ListGroup>
        {!chosenCategoryPathID && categories && type === 'withPathDisplay' ? (
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
              onClick={() => {
                setLocation(null);
                setPathDisplay('Root');
              }}
            />
          </ListGroup.Item>
        ) : (
          ''
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
                    onCategoryClick(category);
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
  setBackButtonStatus: PropTypes.func,
  location: PropTypes.object,
  setLocation: PropTypes.func,
  setLocationPathDisplay: PropTypes.func,
  type: PropTypes.string,
  isSaved: PropTypes.bool
};

export default Location;
