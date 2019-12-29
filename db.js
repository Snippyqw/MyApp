import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const init = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists users (
        id integer primary key not null,
        name text,
        password text
      );`,
      [],
    );
  });
}

const searchUser = (name, password, onReady) => {
  
  db.transaction((tx) => {
    tx.executeSql(
      'select * from users where name = ? and password = ?',
      [name, password],
      (_, {rows: {_array}}) => onReady(_array),
      //console.log,
       
    );
  });
}

const updatePasswod = (id, password) => {
  db.transaction((tx) => {
    tx.executeSql(
      `update users set password = ? where id = ?`,
      [password, id],
      (_, { rowsAffected }) => onReady(rowsAffected)
    );
  });
}

const saveUser= ({ name, password }, onReady) => {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into users (
        name,
        password
      ) values (
        ?, ?
      )`,
      [name, password],
      (_, { insertId }) => onReady(insertId),
      console.log,
    );
  });
}

const deleteUser = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      `delete from users where id = ?;`,
      [id]
    );
  })
}

export default {
  init,
  deleteUser,
  saveUser,
  updatePasswod,
  searchUser
};