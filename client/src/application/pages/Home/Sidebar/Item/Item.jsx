import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item, changeClassOnActive }) => {
  return (
    <>
      <Link
        style={{ textDecoration: 'none', color: '#c6c5cc' }}
        to={item.url}
        onClick={() => changeClassOnActive(item.title)}
        className={`menu-item ${item.isActive ? 'active' : ''}`}
      >
        <div className='menu-icons'>
          <i className={item.icons}>{item.countsClass && <small className={item.countsClass}>{item.counts}</small>}</i>
          <h3>{item.title}</h3>
        </div>
      </Link>
    </>
  );
};

export default observer(Item);
