import auth from "./authenticate";
import personAccess from './requestAccess';

let noTokenRoutes = (app) => {

  app.use('/auth', auth);
  app.use('/reqAccess', personAccess);

};

export default noTokenRoutes;