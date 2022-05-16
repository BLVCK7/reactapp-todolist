import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import './List.scss';

import Badge from '../Badge';

import removeSVG from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
  let navigate = useNavigate();

  const removeList = (item) => {
    if (window.confirm('Действительно хотите удалить?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
        navigate('/');
      });
    }
  };

  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            onClick={onClickItem ? () => onClickItem(item) : null}
            className={classNames(item.className, {
              active: item.active ? item.active : activeItem && activeItem.id === item.id,
            })}
            key={index}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
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
