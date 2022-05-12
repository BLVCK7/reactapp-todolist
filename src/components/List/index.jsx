import React from 'react';
import './List.scss';
import classNames from 'classnames';
import Badge from '../Badge';

const List = ({ items, isRemovable, onClick, color }) => {
  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((obj, index) => (
          <li className={classNames(obj.className, { active: obj.active })} key={index}>
            <i>{obj.icon ? obj.icon : <Badge color={obj.color} />}</i>
            <span>{obj.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
