import type { Dish } from '../types/Dish';

/**
 * Export dishes to a JSON file download
 */
export function exportDishes(dishes: Dish[]): void {
  const dataJson = JSON.stringify(dishes, null, 2);
  const blob = new Blob([dataJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `dishes-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import dishes from a JSON file
 */
export function importDishes(file: File): Promise<Dish[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const dishes = JSON.parse(content) as Dish[];
        
        // Validate the structure
        if (!Array.isArray(dishes)) {
          throw new Error('File must contain an array of dishes');
        }
        
        resolve(dishes);
      } catch (error) {
        reject(new Error('Invalid JSON file or incorrect format'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}