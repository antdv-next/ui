<script setup lang="ts">
const text = 'prompt text'
const buttonWidth = 80
</script>

<template>
  <div class="demo mt-100px flex flex-col justify-center items-center">
    <!-- Top row -->
    <div class="flex justify-center items-center whitespace-nowrap">
      <a-tooltip placement="topLeft" :title="text">
        <a-button class="w-20 m-1">
          TL
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="text">
        <a-button class="w-20 m-1">
          Top
        </a-button>
      </a-tooltip>
      <a-tooltip placement="topRight" :title="text">
        <a-button class="w-20 m-1">
          TR
        </a-button>
      </a-tooltip>
    </div>

    <!-- Middle row -->
    <div class="flex justify-between items-center" :style="{ width: `${buttonWidth * 5 + 32}px` }">
      <!-- Left column -->
      <div class="flex flex-col items-center">
        <a-tooltip placement="leftTop" :title="text">
          <a-button class="w-20 m-1">
            LT
          </a-button>
        </a-tooltip>
        <a-tooltip placement="left" :title="text">
          <a-button class="w-20 m-1">
            Left
          </a-button>
        </a-tooltip>
        <a-tooltip placement="leftBottom" :title="text">
          <a-button class="w-20 m-1">
            LB
          </a-button>
        </a-tooltip>
      </div>

      <!-- Right column -->
      <div class="flex flex-col items-center">
        <a-tooltip placement="rightTop" :title="text">
          <a-button class="w-20 m-1">
            RT
          </a-button>
        </a-tooltip>
        <a-tooltip placement="right" :title="text">
          <a-button class="w-20 m-1">
            Right
          </a-button>
        </a-tooltip>
        <a-tooltip placement="rightBottom" :title="text">
          <a-button class="w-20 m-1">
            RB
          </a-button>
        </a-tooltip>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="flex justify-center items-center whitespace-nowrap">
      <a-tooltip placement="bottomLeft" :title="text">
        <a-button class="w-20 m-1">
          BL
        </a-button>
      </a-tooltip>
      <a-tooltip placement="bottom" :title="text">
        <a-button class="w-20 m-1">
          Bottom
        </a-button>
      </a-tooltip>
      <a-tooltip placement="bottomRight" :title="text">
        <a-button class="w-20 m-1">
          BR
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<style scoped>

</style>
