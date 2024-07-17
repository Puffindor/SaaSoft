<template>
  <div @click.stop="switchOpen" class="drop" :class="{ isActive: isOpen }">
    <p>{{ selectedOption }}</p>
    <img src="@/assets/icons/arrow.svg" />
    <ul v-if="isOpen">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<string[]>,
    },
    value: {
      type: String as PropType<string>,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const selectedOption = ref();
    const isOpen = ref(false);

    onMounted(() => (selectedOption.value = props.value));

    //Открывает/закрывает меню
    function switchOpen() {
      isOpen.value = !isOpen.value;
    }
    //Отправляет выбранную опцию и записывает ее локально
    function selectOption(option: string) {
      selectedOption.value = option;
      emit('select', selectedOption.value);
    }

    return {
      selectOption,
      switchOpen,
      selectedOption,
      isOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  z-index: 999;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  list-style: none;
  position: absolute;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cecfd0;
  top: 110%;
  left: 0;
  background-color: white;
  li {
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: 100ms;
  }
  li:hover {
    transition: 100ms;
    background-color: #cecfd0;
    padding: 8px;
    border-radius: 8px;
  }
}
.drop {
  width: 100%;
  cursor: pointer;
  position: relative;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cecfd0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 200ms;
  img {
    transform: rotate(90deg);
    transition: 200ms;
  }
}
.drop.isActive img {
  transition: 200ms;
  transform: rotate(270deg);
}
.drop:hover {
  transition: 200ms;
  border: 1px solid #767d83;
}
</style>
