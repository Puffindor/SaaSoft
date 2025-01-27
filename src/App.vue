<template>
  <section>
    <users-list-vue />
  </section>
</template>

<script lang="ts">
import UsersListVue from '@/components/UsersList.vue';

export default {
  name: 'App',
  components: { UsersListVue },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  flex-direction: column;
  display: flex;
  padding: 50px;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
input {
  border: 1px solid #cecfd0;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: 200ms;
}
input:hover {
  transition: 200ms;
  border: 1px solid #767d83;
}
.icon-container {
  width: fit-content;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  background-color: #f1f2f5;
  transition: 200ms;
}
.icon-container:hover {
  transition: 200ms;
  background-color: #d4dadf;
}
</style>
