const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const avatarUrl = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
    name
  )}`;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      avatar: avatarUrl,
    });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao registrar. E-mail já existe?" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch {
    res.status(500).json({ error: "Erro interno no login" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
  }
};

exports.updateUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token ausente" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    res.json({
      message: "Usuário atualizado com sucesso",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error(err);
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

exports.updateLikes = async (req, res) => {
  const { likes } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { likes },
      { new: true }
    );

    res.json({ message: "Likes atualizados com sucesso", likes: user.likes });
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
