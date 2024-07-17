<template>
  <div class="list">
    <header>
      <h1>Учетные записи</h1>
      <div class="icon-container">
        <img @click="addUser" src="@/assets/icons/plus.svg" alt="icon-add" />
      </div>
    </header>

    <ul>
      <div class="table-head">
        <p>Метки</p>
        <p>Тип записи</p>
        <p>Пароль</p>
        <p>Логин</p>
      </div>
      <li v-for="user in store.users" :key="user.id">
        <users-list-item :item="user" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import UsersListItem from '@/components/UsersListItem.vue';
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/usersStore';

export default {
  components: { UsersListItem },

  setup() {
    const store = useUsersStore();
    //Action для синхронизации списка с localStorage после перезагрузки
    onMounted(() => {
      store.setUsers();
    });
    //Добавляет пустую запись
    function addUser() {
      store.addUser({
        id: Date.now(),
        login: '',
        password: '',
        type: 'Локальная',
        marks: [],
      });
    }
    return {
      store,
      addUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  align-items: center;
  width: 1000px;
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  margin-bottom: 20px;
  grid-gap: 15px;
}
.table-head {
  width: 1000px;
  display: grid;
  grid-template-columns: 23% 23% 15% 20%;
  color: #767d83;
}
ul {
  // padding: 0px 20%;
  list-style: none;
  flex-direction: column;
  width: 100%;
  display: flex;
  grid-gap: 15px;
  li {
    width: 100%;
  }
}
</style>
