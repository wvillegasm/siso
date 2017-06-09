import verifyToken from "../app/util/verifyToken";
import users from "./users";

let tokenRoutes = (app) => {
  app.use('/api', verifyToken);
  app.use('/api/users', users);

};


export default tokenRoutes;