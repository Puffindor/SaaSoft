<template>
  <div class="item">
    <input class="marks" :value="marks" @input="editUserMarks($event)" placeholder="Метки" />

    <drop-menu :options="['Локальная', 'LDAP']" @select="selectType" :value="item.type" />
    <div class="login-container">
      <div class="password" v-if="item.type === 'Локальная'" :class="{ invalid: !validPassword }">
        <input
          @blur="editPassword"
          placeholder="Пароль"
          maxlength="100"
          :type="showPassword ? 'text' : 'password'"
          v-model="userLocal.password"
        />
        <div class="icon-container">
          <img
            src="@/assets/icons/visibility.svg"
            @click="switchPasswordVisibility"
            alt="icon-visibility"
          />
        </div>
      </div>
      <input
        @blur="editLogin"
        placeholder="Логин"
        v-model="userLocal.login"
        :class="{ invalid: !validLogin }"
        maxlength="100"
      />
    </div>
    <div class="icon-container">
      <img src="@/assets/icons/delete.svg" @click="deleteUser" alt="icon-delete" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, defineModel, reactive, onMounted } from 'vue';
import listItem from '@/types/listItem';
import { useUsersStore } from '@/store/usersStore';
import DropMenu from './UI/DropMenu.vue';

export default defineComponent({
  components: { DropMenu },
  props: {
    item: {
      required: true,
      type: Object as PropType<listItem>,
    },
  },
  setup(props) {
    const userLocal = reactive({
      login: defineModel(),
      password: defineModel(),
    });
    const store = useUsersStore();
    const validPassword = ref(true);
    const validLogin = ref(true);
    const showPassword = ref(false);

    onMounted(() => {
      syncUserData(true, true);
    });
    //Синхронизирует локальные логин и пароль с store
    function syncUserData(login: boolean, password: boolean) {
      if (login) userLocal.login = props.item.login;
      if (password) userLocal.password = props.item.password;
    }

    //Преобразует массив меток в строку и добавляет ";"
    const marks = computed(() => {
      return props.item.marks.reduce((acc, value) => acc + value + ';', '');
    });

    //Валидация логина, должен быть больше 3 символов
    function validateLogin(event: Event) {
      if ((event.target as HTMLInputElement).value.length > 3) {
        validLogin.value = true;
        return true;
      }
      validLogin.value = false;
      return false;
    }
    //Валидация пароля, пока такая же как у логина
    function validatePassword(event: Event) {
      if ((event.target as HTMLInputElement).value.length > 3) {
        validPassword.value = true;
        return true;
      }
      validPassword.value = false;
      return false;
    }
    //Переключает тип input для text/password
    function switchPasswordVisibility() {
      showPassword.value = !showPassword.value;
    }
    //Меняет тип записи пользователя LDAP/Локальная
    function selectType(type: string) {
      store.setUserType(props.item.id, type);
    }
    //Удаляет запись пользователя
    function deleteUser() {
      store.deleteUser(props.item.id);
    }
    //Редактирует метки пользователя
    function editUserMarks(event: Event) {
      store.editUserMarks((event.target as HTMLInputElement).value, props.item.id);
    }
    //Редактирует логин пользователя
    function editLogin(event: Event) {
      if (validateLogin(event)) {
        store.editUser(props.item.id, 'login', (event.target as HTMLInputElement).value);
        syncUserData(true, false);
      }
    }
    //Редактирует пароль пользователя
    function editPassword(event: Event) {
      if (validatePassword(event)) {
        store.editUser(props.item.id, 'password', (event.target as HTMLInputElement).value);
        syncUserData(false, true);
      }
    }

    return {
      editUserMarks,
      marks,
      deleteUser,
      selectType,
      showPassword,
      switchPasswordVisibility,
      validPassword,
      validLogin,
      editPassword,
      editLogin,
      userLocal,
    };
  },
});
</script>

<style lang="scss" scoped>
.password {
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid #cecfd0;
  padding: 0px 4px 0px 8px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: 200ms;
  input {
    border-style: hidden;
    padding: 0;
  }
}

.password.invalid {
  border-color: red;
}

.password:hover {
  transition: 200ms;
  border: 1px solid #767d83;
}

.login-container {
  grid-gap: 15px;
  display: flex;
  width: 100%;
  input {
    width: 100%;
  }
}
input.invalid {
  border-color: red;
}
.item {
  width: 100%;
  align-items: center;
  grid-gap: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 10%;
}
</style>
