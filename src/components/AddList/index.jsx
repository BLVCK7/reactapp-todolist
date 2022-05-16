import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './AddList.scss';

import Badge from '../Badge';
import List from '../List';

import closeSvg from '../../assets/img/close.svg';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  // let lasElem = list[list.length - 1];

  // let location = useLocation();

  // console.log(location.pathname);

  // useEffect(() => {
  //   const listId = location.pathname.split('lists/')[1];
  //   if (list) {
  //     const newListId = list.find((item) => item.id === Number(listId));
  //     setNewActiveItem(newListId);
  //   }
  // }, [list, location.pathname]);

  // const linkId = list.find(item => )

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название папки');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
        navigate(`/lists/${data.id}`);
      })
      .catch(() => {
        alert('Ошибка при добавлении списка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <List
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить папку',
            active: false,
          },
        ]}
        onClick={() => setVisiblePopup(true)}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
            onClick={onClose}
          />
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название папки"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button disabled={isLoading} onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
          {/* Нужно задизейблить кнопку при загрузке, чтобы нельзя было повторно отправлять запрос при нажатии */}
        </div>
      )}
    </>
  );
};

export default AddList;
