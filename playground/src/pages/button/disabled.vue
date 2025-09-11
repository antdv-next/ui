<template>
  <div class="flex flex-col gap-2 p-3 items-start">
    <div class="flex gap-2">
      <a-button type="primary">
        Primary
      </a-button>
      <a-button type="primary" disabled>
        Primary(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button>Default</a-button>
      <a-button disabled>
        Default(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="dashed" disabled>
        Dashed(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button type="text">
        Text
      </a-button>
      <a-button type="text" disabled>
        Text(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button type="link">
        Link
      </a-button>
      <a-button type="link" disabled>
        Link(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button type="primary" href="https://ant.design/index-cn">
        Href Primary
      </a-button>
      <a-button type="primary" href="https://ant.design/index-cn" disabled>
        Href Primary(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button danger>
        Danger Default
      </a-button>
      <a-button danger disabled>
        Danger Default(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button danger type="text">
        Danger Text
      </a-button>
      <a-button danger type="text" disabled>
        Danger Text(disabled)
      </a-button>
    </div>
    <div class="flex gap-2">
      <a-button type="link" danger>
        Danger Link
      </a-button>
      <a-button type="link" danger disabled>
        Danger Link(disabled)
      </a-button>
    </div>
    <div class="flex gap-2 site-button-ghost-wrapper">
      <a-button ghost>
        Ghost
      </a-button>
      <a-button ghost disabled>
        Ghost(disabled)
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.site-button-ghost-wrapper {
  background: rgb(190, 200, 200);
  padding: 16px;
}
</style>
