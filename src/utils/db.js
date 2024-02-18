import Dexie from "dexie";

const db = new Dexie("todoDB");
db.version(1).stores({
  todos: "++id, task",
});
export default db;
