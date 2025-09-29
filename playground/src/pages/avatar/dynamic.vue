<script lang="ts" setup>
import { ref } from 'vue'

const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
const avatarValue = ref(UserList[0])
const color = ref(colorList[0])
function changeUser() {
  const index = UserList.indexOf(avatarValue.value)
  avatarValue.value = index < UserList.length - 1 ? UserList[index + 1] : UserList[0]
  color.value = index < colorList.length - 1 ? colorList[index + 1] : colorList[0]
}

const GapList = [4, 3, 2, 1]
const gap = ref(GapList[0])
function changeGap() {
  const index = GapList.indexOf(gap.value)
  gap.value = index < GapList.length - 1 ? GapList[index + 1] : GapList[0]
}
</script>

<template>
  <a-avatar size="large" :style="{ backgroundColor: color, verticalAlign: 'middle' }" :gap="gap">
    {{ avatarValue }}
  </a-avatar>
  <a-button size="small" :style="{ margin: '0 16px', verticalAlign: 'middle' }" @click="changeUser">
    ChangeUser
  </a-button>
  <a-button size="small" :style="{ verticalAlign: 'middle' }" @click="changeGap">
    ChangeGap
  </a-button>
</template>
