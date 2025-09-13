<template>
  <div>
    <a-alert
      message="Success Tips"
      type="success"
      show-icon
      closable
    >
      <template #action>
        <a-button size="small" type="text">
          UNDO
        </a-button>
      </template>
    </a-alert>
    <br>
    <a-alert
      message="Error Text"
      show-icon
      description="Error Description Error Description Error Description Error Description"
      type="error"
    >
      <template #action>
        <a-button size="small" danger>
          Detail
        </a-button>
      </template>
    </a-alert>
    <br>
    <a-alert
      message="Warning Text"
      type="warning"
      closable
    >
      <template #action>
        <div class="flex gap-2">
          <a-button type="text" size="small">
            Done
          </a-button>
        </div>
      </template>
    </a-alert>
    <br>
    <a-alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      closable
    >
      <template #action>
        <div class="flex flex-col gap-2">
          <a-button size="small" type="primary">
            Accept
          </a-button>
          <a-button size="small" danger ghost>
            Decline
          </a-button>
        </div>
      </template>
    </a-alert>
  </div>
</template>
