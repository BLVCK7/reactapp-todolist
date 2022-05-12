import React, { useState } from 'react';
import Badge from '../Badge';
import List from '../List';
import './AddButtonList.scss';
import closeSvg from '../../assets/img/close.svg';

const AddButtonList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

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
    const color = colors.filter((c) => c.id === selectedColor)[0].name;
    onAdd({ id: Math.random(), name: inputValue, color });
    onClose();
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
          <button onClick={addList} className="button">
            Добавить
          </button>
        </div>
      )}
    </>
  );
};

export default AddButtonList;
