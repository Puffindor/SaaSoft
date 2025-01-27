<template>
  <div class="list">
    <header>
      <h1>Учетные записи</h1>
      <div class="icon-container">
        <img 
          @click="addUser" 
          src="@/assets/icons/plus.svg" 
          alt="icon-add" 
        />
      </div>
    </header>
    <div class="hint">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" viewBox="0 -960 960 960" 
        width="24px" fill="#8d9092"
      >
        <path 
          d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
        />
      </svg>
      <p>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель;
      </p>
    </div>
    <ul>
      <div class="table-head">
        <p>Метки</p>
        <p>Тип записи</p>
        <p>Пароль</p>
        <p>Логин</p>
      </div>
      <li 
        v-for="user in store.users" 
        :key="user.id"
      >
        <users-list-item 
          :item="user" 
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import UsersListItem from '@/components/UsersListItem.vue';
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/usersStore';

export default {
  name: "UsersList",
  components: { UsersListItem },
  setup() {
    const store = useUsersStore();
    //Добавляет пустую запись
    function addUser(): void {
      store.addUser({
        id: Date.now(),
        login: '',
        password: '',
        type: 'Локальная',
        marks: [],
      });
    }
    //Action для синхронизации списка с localStorage после перезагрузки
    onMounted((): void => {
      store.setUsers();
    });
    return {
      store,
      addUser,
    };
  },
};
</script>

<style lang="scss" scoped>

.hint {
  display: flex;
  gap: 5px;
  margin: 0 0 20px 0;
  padding: 5px;
  width: 100%;
  background: #eef4fa;
  border-radius: 5px;
}

.list {
  align-items: flex-start;
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
  grid-template-columns: 24% 25% 17% 20%;
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
