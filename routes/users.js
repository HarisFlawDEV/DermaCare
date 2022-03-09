const router = require("express").Router();
// Bring in the User Registration function
const {
    userAuth,
    userLogin,
    checkRole,
    userRegister,
    serializeUser,
    profileUpdate
} = require("../utils/Auth");

// Pateints Registeration Route
router.post("/register-patient", async(req, res) => {
    await userRegister(req.body, "patient", res);
});

// Derm Registration Route
router.post("/register-derm", async(req, res) => {
    await userRegister(req.body, "derm", res);
});

// Users Login Route
router.post("/login-patient", async(req, res) => {
    await userLogin(req.body, "patient", res);
});

// Derm Login Route
router.post("/login-derm", async(req, res) => {
    await userLogin(req.body, "derm", res);
});

// Profile Route
router.get("/profile", userAuth, async(req, res) => {
    return res.json(serializeUser(req.user));
});

// Profile Route
router.patch("/profileupdate", userAuth, async(req, res) => {
    await profileUpdate(req.body, req.user, res);
});


// Users Protected Route
router.get(
    "/user-protectd",
    userAuth,
    checkRole(["user"]),
    async(req, res) => {
        return res.json("Hello User");
    }
);

// Admin Protected Route
router.get(
    "/admin-protectd",
    userAuth,
    checkRole(["admin"]),
    async(req, res) => {
        return res.json("Hello Admin");
    }
);

// Super Admin Protected Route
router.get(
    "/super-admin-protectd",
    userAuth,
    checkRole(["superadmin"]),
    async(req, res) => {
        return res.json("Hello Super Admin");
    }
);

// Super Admin Protected Route
router.get(
    "/super-admin-and-admin-protectd",
    userAuth,
    checkRole(["superadmin", "admin"]),
    async(req, res) => {
        return res.json("Super admin and Admin");
    }
);

module.exports = router;