import * as fs from 'fs';
import * as path from 'path';
import BaseSupplier from '../utils/bases/BaseSupplier';

const Suppliers: Record<string, BaseSupplier> = {};

const directoryPath = path.join(__dirname, 'suppliers');
fs.readdirSync(directoryPath).forEach((file) => {
  if (file.endsWith('.ts')) {
    const moduleName = file.replace(/\.(ts)$/, ''); // Remove extensions
    const modulePath = path.join(directoryPath, file);
    try {
      // Dynamically import the supplier module
      const SupplierClass = require(modulePath).default;

      // Ensure it extends `AdapterBase`
      if (SupplierClass.prototype instanceof BaseSupplier) {
        Suppliers[moduleName] = new SupplierClass(); // Create instance of the supplier class
      } else {
        throw new Error(`${moduleName} does not extend AdapterBase`)
      }
    } catch (error) {
      throw new Error(`Error loading supplier ${moduleName}: ${error}`);
    }
  }
});

export default Suppliers;