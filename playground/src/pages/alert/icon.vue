<script setup lang="ts">

</script>

<template>
  <div>
    <a-alert message="Success Tips" type="success" show-icon />
    <br>
    <a-alert message="Informational Notes" type="info" show-icon />
    <br>
    <a-alert message="Warning" type="warning" show-icon closable />
    <br>
    <a-alert message="Error" type="error" show-icon />
    <br>
    <a-alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      show-icon
    />
    <br>
    <a-alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      show-icon
    />
    <br>
    <a-alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
      closable
    />
    <br>
    <a-alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    />
  </div>
</template>

<style scoped>

</style>
