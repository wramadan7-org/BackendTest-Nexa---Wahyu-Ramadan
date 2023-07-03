const { Router } = require("express");
const authRoute = require("./v1/auth/authRoute");

const router = Router();

const defaultRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
