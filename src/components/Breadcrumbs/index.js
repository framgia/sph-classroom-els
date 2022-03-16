import React, { Fragment, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useToast } from '../../hooks/useToast';
import { CgFormatSlash } from 'react-icons/cg';
import CategoryApi from '../../api/Category';
import style from './index.module.scss';

const Breadcrumbs = ({ chosenCategoryPathID, setChosenCategoryPathID }) => {
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
          setChosenCategoryPathID(null);
          setBreadcrumbs([]);
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
                onBreadcrumbClick(breadcrumb.id, idx);
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
