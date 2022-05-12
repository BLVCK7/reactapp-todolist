import React from 'react';
import './List.scss';
import classNames from 'classnames';
import Badge from '../Badge';

import removeSVG from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Действительно хотите удалить?')) {
      onRemove(item);
    }
  };

  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li className={classNames(item.className, { active: item.active })} key={index}>
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={removeSVG}
                alt="Remove icon"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
