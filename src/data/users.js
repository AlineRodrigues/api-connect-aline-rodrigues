// Persistência provisória em memória
const users = [];
let nextId = 1;

function generateId() {
  return nextId++;
}

module.exports = { users, generateId };
