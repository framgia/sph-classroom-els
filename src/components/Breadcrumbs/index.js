import React, { Fragment, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useToast } from '../../hooks/useToast';
import { CgFormatSlash } from 'react-icons/cg';
import CategoryApi from '../../api/Category';
import style from './index.module.scss';

/*
    To use this component, pass the following props:

    chosenCategoryPathID     :    pass the category ID of the category being clicked
    setChosenCategoryPathID  :    pass the setter function of the state holding the current category ID, 
                                  this is to set the current ID to the chosen breadcrumb

    basically you're just going to pass the state you defined that will hold the current category ID being clicked.

    e.g.       const [chosenCategoryID, setChosenCategoryID] = useState()

               <Breadcrumbs chosenCategoryPathID={chosenCategoryID} setChosenCategoryPathID={setChosenCategoryID} />
*/

const Breadcrumbs = ({
  chosenCategoryPathID = null,
  setChosenCategoryPathID
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (chosenCategoryPathID) {
      CategoryApi.getParentCategories(chosenCategoryPathID)
        .then(({ data }) => {
          setBreadcrumbs(data);
        })
        .catch((error) => toast('Error', error));
    }
  }, [chosenCategoryPathID]);

  const onBreadcrumbClick = (category_id, index) => {
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    setChosenCategoryPathID(category_id);
  };

  return (
    <div className={style.breadcrumbsContainer}>
      <span className={style.breadcrumbs}>Categories</span>
      <CgFormatSlash size={20} />
      <span className={style.breadcrumbs}>Hierarchy View</span>
      <CgFormatSlash size={20} />
      <span
        className={style.breadcrumbs}
        onClick={() => {
          if (chosenCategoryPathID) {
            setChosenCategoryPathID(null);
            setBreadcrumbs([]);
          }
        }}
      >
        Root
      </span>
      {breadcrumbs?.map((breadcrumb, idx) => {
        return (
          <Fragment key={idx}>
            <CgFormatSlash size={20} className={style.breadcrumbSlashIcon} />
            <span
              className={style.breadcrumbs}
              onClick={() => {
                if (chosenCategoryPathID != breadcrumb.id) {
                  onBreadcrumbClick(breadcrumb.id, idx);
                }
              }}
            >
              {breadcrumb?.name}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
};

Breadcrumbs.propTypes = {
  chosenCategoryPathID: PropTypes.number,
  setChosenCategoryPathID: PropTypes.func
};

export default Breadcrumbs;
