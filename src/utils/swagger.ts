import { Express, Request, Response } from 'express';
import yaml from 'yamljs';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { mergeSwaggerYaml } from './swagger-yaml-merger';

function swaggerDocs(app: Express) {
  const outputPath = path.join(__dirname, '../swagger/swagger.yaml');
  mergeSwaggerYaml(
    path.join(__dirname, '../swagger/base.yaml'),
    path.join(__dirname, '../swagger/paths'),
    path.join(__dirname, '../swagger/schemas'),
    outputPath
  );

  // Check if file exists before loading
  if (fs.existsSync(outputPath)) {
    // Swagger page
    const swaggerDocument = yaml.load(outputPath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Docs in JSON format
    app.get('/api-docs.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(swaggerDocument);
    });
  } else {
    console.error('Swagger documentation file not found!');
  }
}

export default swaggerDocs;
