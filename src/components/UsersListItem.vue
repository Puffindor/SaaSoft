<template>
  <div class="item">
    <input 
      :value="marks" 
      @input="editUserMarks($event)" 
      class="marks" 
      placeholder="Метки" 
    />
    <drop-menu 
      :options="['Локальная', 'LDAP']" 
      :value="item.type" 
      @select="selectType" 
    />
    <div class="login-container">
      <div 
        v-if="item.type === 'Локальная'" 
        :class="{ invalid: !validPassword }"
        class="password" 
      >
        <input
          :type="showPassword ? 'text' : 'password'"
          @blur="editPassword"
          v-model="userLocal.password"
          placeholder="Пароль"
          maxlength="100"
        />
        <div class="icon-container">
          <img
            @click="switchPasswordVisibility"
            src="@/assets/icons/visibility.svg"
            alt="icon-visibility"
          />
        </div>
      </div>
      <input
        :class="{ invalid: !validLogin }"
        @blur="editLogin"
        placeholder="Логин"
        v-model="userLocal.login"
        maxlength="100"
      />
    </div>
    <div class="icon-container">
      <img 
        @click="deleteUser" 
        src="@/assets/icons/delete.svg" 
        alt="icon-delete" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, defineModel, reactive, onMounted } from 'vue';
import type { Ref } from 'vue'
import listItem from '@/types/listItem';
import { useUsersStore } from '@/store/usersStore';
import DropMenu from './UI/DropMenu.vue';

export default defineComponent({
  name: "UsersListItem",
  components: { DropMenu },
  props: {
    item: {
      type: Object as PropType<listItem>,
      required: true,
    },
  },
  setup(props) {
    const userLocal = reactive({
      login: defineModel(),
      password: defineModel(),
    });
    const store = useUsersStore();
    const validPassword = ref(true) as Ref<boolean>;
    const validLogin = ref(true) as Ref<boolean>;
    const showPassword = ref(false) as Ref<boolean>;
    //Синхронизирует локальные логин и пароль с store
    function syncUserData(login: boolean, password: boolean): void {
      if (login) userLocal.login = props.item.login;
      if (password) userLocal.password = props.item.password;
    }
    //Преобразует массив меток в строку и добавляет ";"
    const marks = computed(() => {
      return props.item.marks.reduce((acc, value) => acc + value + ';', '');
    });
    //Валидация логина, должен быть больше 3 символов
    function validateLogin(event: Event): boolean {
      if ((event.target as HTMLInputElement).value.length > 3) {
        validLogin.value = true;
        return true;
      }
      validLogin.value = false;
      return false;
    }
    //Валидация пароля, пока такая же как у логина
    function validatePassword(event: Event): boolean {
      if ((event.target as HTMLInputElement).value.length > 3) {
        validPassword.value = true;
        return true;
      }
      validPassword.value = false;
      return false;
    }
    //Переключает тип input для text/password
    function switchPasswordVisibility(): void {
      showPassword.value = !showPassword.value;
    }
    //Меняет тип записи пользователя LDAP/Локальная
    function selectType(type: string): void {
      store.setUserType(props.item.id, type);
    }
    //Удаляет запись пользователя
    function deleteUser(): void {
      store.deleteUser(props.item.id);
    }
    //Редактирует метки пользователя
    function editUserMarks(event: Event): void {
      store.editUserMarks((event.target as HTMLInputElement).value, props.item.id);
    }
    //Редактирует логин пользователя
    function editLogin(event: Event): void {
      if (validateLogin(event)) {
        store.editUser(props.item.id, 'login', (event.target as HTMLInputElement).value);
        syncUserData(true, false);
      }
    }
    //Редактирует пароль пользователя
    function editPassword(event: Event): void {
      if (validatePassword(event)) {
        store.editUser(props.item.id, 'password', (event.target as HTMLInputElement).value);
        syncUserData(false, true);
      }
    }
    onMounted((): void => {
      syncUserData(true, true);
    });
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
  grid-template-columns: 1fr 1fr 2fr 4%;
}

@media screen and (max-width : 1000px) {
  .item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
