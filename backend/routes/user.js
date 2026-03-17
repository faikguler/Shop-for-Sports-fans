const router = require("express").Router();
const { User } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// GET /api/users/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(401).json({ message: "Token expired or user not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id 
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: "No user found with this id" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// POST /api/users/
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const token = signToken(userData);

    const user = userData.toJSON();
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/users/:id 
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You can only update your own account" });
    }

    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true 
    });

    if (!updated) {
      return res.status(404).json({ message: "No user found with this id" });
    }

    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/login    
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password, please try again" });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password, please try again" });
    }

    await userData.update({ lastLogin: new Date() });

    const token = signToken(userData);
    const user = userData.toJSON();
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;