const { users, generateId } = require('../data/users');

function createUser(req, res) {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: 'Os campos nome e email são obrigatórios.' });
  }
  const user = { id: generateId(), nome, email };
  users.push(user);
  return res.status(201).json({ data: user });
}

function getUsers(req, res) {
  return res.status(200).json({ data: users });
}

function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  return res.status(200).json({ data: user });
}

function updateUser(req, res) {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });

  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: 'Os campos nome e email são obrigatórios.' });
  }

  users[index] = { ...users[index], nome, email };
  return res.status(200).json({ data: users[index] });
}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });
  users.splice(index, 1);
  return res.status(204).send();
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
