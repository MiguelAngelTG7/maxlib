import type { Dish } from '../types/Dish';
import './DishPicker.css';

interface DishPickerProps {
  currentDish: Dish | null;
  onPickDish: () => void;
}

export function DishPicker({ currentDish, onPickDish }: DishPickerProps) {
  return (
    <div className="dish-picker">
      <div className="dish-display">
        <h2>¿Qué cocinar hoy?</h2>
        <div className="dish-card">
          {currentDish ? (
            <h1 className="dish-name">{currentDish.name}</h1>
          ) : (
            <p className="placeholder">¡Haz clic en el botón para elegir un plato!</p>
          )}
        </div>
        <button className="pick-button" onClick={onPickDish}>
          🎲 Elegir Plato al Azar
        </button>
      </div>
    </div>
  );
}