import { useRef } from 'react';
import type { Dish } from '../types/Dish';
import { exportDishes, importDishes } from '../utils/dishStorage';
import './DishImportExport.css';

interface DishImportExportProps {
  dishes: Dish[];
  onImport: (dishes: Dish[]) => void;
}

export function DishImportExport({ dishes, onImport }: DishImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportDishes(dishes);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedDishes = await importDishes(file);
      onImport(importedDishes);
      alert(`¡Se importaron exitosamente ${importedDishes.length} platos!`);
    } catch (error) {
      alert(`Error al importar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }

    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="import-export">
      <h3>Respaldo y Restaurar</h3>
      <div className="button-group">
        <button className="export-button" onClick={handleExport}>
          💾 Exportar Platos
        </button>
        <button className="import-button" onClick={handleImportClick}>
          📂 Importar Platos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}