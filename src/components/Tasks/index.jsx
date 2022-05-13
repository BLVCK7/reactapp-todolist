import axios from 'axios';

import './Tasks.scss';

import editSVG from '../../assets/img/edit.svg';
import AddTasksForm from './AddTasksForm';

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Введите название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={editSVG} alt="Редактировать" onClick={editTitle} />
      </h2>
      <div className="tasks__items">
        {list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <div key={task.id} className="tasks__items-row">
              <div className="checkbox">
                <input id={`task-${task.id}`} type="checkbox" />
                <label htmlFor={`task-${task.id}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                      stroke="#000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              <input readOnly value={task.text} />
              {/* Сделать состояние чекбоксу. Чтобы после того, как был выбран элемент, после перезагрузки страницы зеленая иконка не слетала */}
            </div>
          ))}
        <AddTasksForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
