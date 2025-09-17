<script setup lang="ts">
const text = 'prompt text'
const buttonWidth = 80
</script>

<template>
  <div class="demo mt-200px flex flex-col justify-center items-center">
    <!-- Top row -->
    <div class="flex justify-center items-center whitespace-nowrap">
      <a-popover placement="topLeft" :title="text" trigger="click">
        <a-button class="w-20 m-1">
          TL
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
      <a-popover placement="top" :title="text">
        <a-button class="w-20 m-1">
          Top
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
      <a-popover placement="topRight" :title="text">
        <a-button class="w-20 m-1">
          TR
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
    </div>

    <!-- Middle row -->
    <div class="flex justify-between items-center" :style="{ width: `${buttonWidth * 5 + 32}px` }">
      <!-- Left column -->
      <div class="flex flex-col items-center">
        <a-popover placement="leftTop" :title="text">
          <a-button class="w-20 m-1">
            LT
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
        <a-popover placement="left" :title="text">
          <a-button class="w-20 m-1">
            Left
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
        <a-popover placement="leftBottom" :title="text">
          <a-button class="w-20 m-1">
            LB
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
      </div>

      <!-- Right column -->
      <div class="flex flex-col items-center">
        <a-popover placement="rightTop" :title="text">
          <a-button class="w-20 m-1">
            RT
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
        <a-popover placement="right" :title="text">
          <a-button class="w-20 m-1">
            Right
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
        <a-popover placement="rightBottom" :title="text">
          <a-button class="w-20 m-1">
            RB
          </a-button>
          <template #content>
            <div>
              <p>Content1</p>
              <p>Content2</p>
            </div>
          </template>
        </a-popover>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="flex justify-center items-center whitespace-nowrap">
      <a-popover placement="bottomLeft" :title="text">
        <a-button class="w-20 m-1">
          BL
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
      <a-popover placement="bottom" :title="text">
        <a-button class="w-20 m-1">
          Bottom
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
      <a-popover placement="bottomRight" :title="text">
        <a-button class="w-20 m-1">
          BR
        </a-button>
        <template #content>
          <div>
            <p>Content1</p>
            <p>Content2</p>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<style scoped>

</style>
