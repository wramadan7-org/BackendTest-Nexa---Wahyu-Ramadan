const { Router } = require("express");
const authRoute = require("./v1/auth/authRoute");
const karyawanRoute = require("./v1/karyawan/karyawanRoute");

const router = Router();

const defaultRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/karyawan",
    route: karyawanRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
