import { useState, useEffect } from 'react';
import type { Dish } from './types/Dish';
import { initialDishes } from './data/dishes';
import { DishPicker } from './components/DishPicker';
import { DishManagement } from './components/DishManagement';
import { DishImportExport } from './components/DishImportExport';
import './App.css';

function App() {
  const [dishes, setDishes] = useState<Dish[]>(() => {
    const saved = localStorage.getItem('dishes');
    return saved ? JSON.parse(saved) : initialDishes;
  });

  const [currentDish, setCurrentDish] = useState<Dish | null>(null);

  // Save dishes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const pickRandomDish = () => {
    if (dishes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dishes.length);
    setCurrentDish(dishes[randomIndex]);
  };

  const addDish = (dishName: string) => {
    const newDish: Dish = {
      id: Date.now().toString(),
      name: dishName,
    };
    setDishes([...dishes, newDish]);
  };

  const removeDish = (id: string) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🍳 What to Cook Today?</h1>
      </header>

      <main className="app-main">
        <DishPicker currentDish={currentDish} onPickDish={pickRandomDish} />
        <DishManagement
          dishes={dishes}
          onAddDish={addDish}
          onRemoveDish={removeDish}
        />
        <DishImportExport
          dishes={dishes}
          onImport={(importedDishes) => {
            setDishes(importedDishes);
          }}
        />
      </main>
    </div>
  );
}

export default App;
