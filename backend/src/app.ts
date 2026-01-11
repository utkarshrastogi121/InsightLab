import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoute from "./routes/health.route";
import { rateLimiter } from "./middlewares/rateLimiter";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { root } from "./graphql/resolvers";
import { verifyToken } from "./utils/jwt";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(morgan("dev"));

app.use("/api", healthRoute);

app.use("/graphql", graphqlHTTP((req) => {
  let user = null;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      user = verifyToken(authHeader.split(" ")[1]);
    } catch {}
  }

  return {
    schema,
    rootValue: root,
    context: { user },
    graphiql: true,
  };
}));

export default app;
