import fs from 'fs';
import path from 'path';
import yaml from 'yamljs';
import { merge } from 'lodash';

/**
 * Merges multiple YAML files into a single Swagger documentation
 * 
 * @param baseDocPath - Path to the base Swagger YAML file with info, servers, etc.
 * @param pathsDir - Directory containing path YAML files
 * @param schemasDir - Directory containing schema YAML files
 * @param outputPath - Where to save the merged YAML file
 */
export function mergeSwaggerYaml(
  baseDocPath: string,
  pathsDir: string,
  schemasDir: string,
  outputPath: string
): void {
  try {
    const baseDoc = yaml.load(baseDocPath);
    
    baseDoc.components = baseDoc.components || {};
    baseDoc.components.schemas = baseDoc.components.schemas || {};
    baseDoc.paths = baseDoc.paths || {};
    
    if (fs.existsSync(pathsDir)) {
      const pathFiles = fs.readdirSync(pathsDir).filter(file => file.endsWith('.yaml'));
      
      for (const file of pathFiles) {
        const pathDoc = yaml.load(path.join(pathsDir, file));
        merge(baseDoc.paths, pathDoc);
      }
    }
    
    if (fs.existsSync(schemasDir)) {
      const schemaFiles = fs.readdirSync(schemasDir).filter(file => file.endsWith('.yaml'));
      
      for (const file of schemaFiles) {
        const schemaName = path.basename(file, '.yaml');
        const schemaPath = path.join(schemasDir, file);
        const schemaContent = yaml.load(schemaPath);
        
        baseDoc.components.schemas[schemaName] = schemaContent;
      }
    }
    
    const mergedYaml = yaml.stringify(baseDoc, 10);
    fs.writeFileSync(outputPath, mergedYaml);
    
    console.log(`Successfully merged Swagger documentation to ${outputPath}`);
  } catch (error) {
    console.error('Error merging Swagger YAML files:', error);
    throw error;
  }
}