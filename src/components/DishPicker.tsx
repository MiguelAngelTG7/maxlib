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
        <h2>What to cook today?</h2>
        <div className="dish-card">
          {currentDish ? (
            <h1 className="dish-name">{currentDish.name}</h1>
          ) : (
            <p className="placeholder">Click the button to pick a dish!</p>
          )}
        </div>
        <button className="pick-button" onClick={onPickDish}>
          🎲 Pick Random Dish
        </button>
      </div>
    </div>
  );
}