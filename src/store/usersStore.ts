import { defineStore } from 'pinia';
import listItem from '@/types/listItem';

export const useUsersStore = defineStore('UsersStore', {
  state: ()  => ({
    users: [
      {
        id: 1,
        login: 'Логин 1',
        password: null,
        type: 'LDAP',
        marks: ['mark1', 'mark2'],
      },
      {
        id: 2,
        login: 'Логин 2',
        password: 'Пароль',
        type: 'Локальная',
        marks: ['mark1', 'mark2', 'mark3'],
      },
    ] as listItem[],
  }),
  getters: {
    getUsers(): listItem[] {
      return this.users;
    },
  },
  actions: {
    //После перезагрузки достает список из localStorage
    setUsers() {
      this.users = JSON.parse(localStorage.getItem('users') || '');
    },
    //Возвращает элемент списка по id
    findElement(id: number) {
      return this.users.find((el: listItem) => el.id === id);
    },
    //Синхронизирует изменения списка с localStorage
    setLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    //Удаляет пользователя
    deleteUser(id: number) {
      this.users = this.users.filter((el) => el.id !== id);
      this.setLocalStorage();
    },
    //Устанавливает тип пользователя, в случае с LDAP заменяет пароль на null
    setUserType(id: number, type: string) {
      const element: any = this.findElement(id);

      element.type = type;
      if (type === 'LDAP') {
        element.password = null;
      }
      this.setLocalStorage();
    },
    //Здесь не совсем понял ТЗ, поэтому разбираю строку с метками в массив меток и убираю ";"
    editUserMarks(marks: string, id: number): void {
      const temp: string[] = Array.from(marks);
      const temMarks: string[] = [];
      temp.reduce((acc, value) => {
        if (value === ';') {
          temMarks.push(acc);
          acc = '';
        } else {
          return acc + value;
        }
        return acc;
      }, '');
      this.findElement(id)!.marks = temMarks;
      this.setLocalStorage();
    },
    //Редактирует пароль или логин пользователя, в зависимости от target
    editUser(id: number, target: string, value: string): void {
      const element: any = this.findElement(id);
      element[target] = value;

      this.setLocalStorage();
    },
    //Добавляет нового пользователя
    addUser(payload: listItem): void {
      this.users.push(payload);
      this.setLocalStorage();
    },
  },
});
