import { useState } from 'react';
import type { Dish } from '../types/Dish';
import './DishManagement.css';

interface DishManagementProps {
  dishes: Dish[];
  onAddDish: (dishName: string) => void;
  onRemoveDish: (id: string) => void;
}

export function DishManagement({
  dishes,
  onAddDish,
  onRemoveDish,
}: DishManagementProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddDish(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="dish-management">
      <div className="add-dish-section">
        <h3>Agregar un nuevo plato</h3>
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa el nombre del plato..."
            className="input-field"
          />
          <button type="submit" className="add-button">
            + Agregar Plato
          </button>
        </form>
      </div>

      <div className="dishes-list-section">
        <h3>Tus Platos ({dishes.length})</h3>
        <ul className="dishes-list">
          {dishes.map((dish) => (
            <li key={dish.id} className="dish-item">
              <span>{dish.name}</span>
              <button
                className="delete-button"
                onClick={() => onRemoveDish(dish.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}