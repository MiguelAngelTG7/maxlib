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

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    // Dividir los platos en dos mitades
    const midpoint = Math.ceil(dishes.length / 2);
    const firstHalf = dishes.slice(0, midpoint);
    const secondHalf = dishes.slice(midpoint);

    const firstColumnHTML = firstHalf
      .map((dish) => `<li>${dish.name}</li>`)
      .join('');
    
    const secondColumnHTML = secondHalf
      .map((dish) => `<li>${dish.name}</li>`)
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Lista de Platos</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              background: white;
            }
            h1 {
              text-align: center;
              margin-bottom: 30px;
              color: #333;
            }
            .dishes-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              column-gap: 40px;
            }
            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            li {
              padding: 8px 0;
              border-bottom: 1px solid #ddd;
              font-size: 14px;
              color: #333;
            }
            li:before {
              content: "✓ ";
              color: #666;
              font-weight: bold;
              margin-right: 8px;
            }
            @media print {
              body {
                margin: 0;
                padding: 10mm;
              }
              h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <h1>📋 Lista de Platos Disponibles</h1>
          <div class="dishes-container">
            <ul>${firstColumnHTML}</ul>
            <ul>${secondColumnHTML}</ul>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
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
        <button className="print-button" onClick={handlePrint}>
          🖨️ Imprimir Platos
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