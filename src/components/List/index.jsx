import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import './List.scss';

import Badge from '../Badge';

import removeSVG from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Действительно хотите удалить?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li className={classNames(item.className, { active: item.active })} key={index}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
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
