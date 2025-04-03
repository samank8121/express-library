import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

function swaggerDocs(app: Express) {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Docs in JSON format
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.json(swaggerDocument);
  });
}

export default swaggerDocs;
