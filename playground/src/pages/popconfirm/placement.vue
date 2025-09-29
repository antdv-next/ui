<script setup lang="ts">
const title = 'Delete the task'
const description = 'Are you sure to delete this task?'
</script>

<template>
  <div class="popconfirm-placement-demo">
    <div class="row">
      <a-popconfirm
        placement="topLeft"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>TL</a-button>
      </a-popconfirm>
      <a-popconfirm
        placement="top"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>Top</a-button>
      </a-popconfirm>
      <a-popconfirm
        placement="topRight"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>TR</a-button>
      </a-popconfirm>
    </div>
    <div class="middle">
      <div class="column">
        <a-popconfirm
          placement="leftTop"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>LT</a-button>
        </a-popconfirm>
        <a-popconfirm
          placement="left"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>Left</a-button>
        </a-popconfirm>
        <a-popconfirm
          placement="leftBottom"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>LB</a-button>
        </a-popconfirm>
      </div>
      <div class="column">
        <a-popconfirm
          placement="rightTop"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>RT</a-button>
        </a-popconfirm>
        <a-popconfirm
          placement="right"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>Right</a-button>
        </a-popconfirm>
        <a-popconfirm
          placement="rightBottom"
          :title="title"
          :description="description"
          ok-text="Yes"
          cancel-text="No"
        >
          <a-button>RB</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="row">
      <a-popconfirm
        placement="bottomLeft"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>BL</a-button>
      </a-popconfirm>
      <a-popconfirm
        placement="bottom"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>Bottom</a-button>
      </a-popconfirm>
      <a-popconfirm
        placement="bottomRight"
        :title="title"
        :description="description"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button>BR</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.popconfirm-placement-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
}

.row {
  display: flex;
  gap: 16px;
  justify-content: center;
  white-space: nowrap;
}

.middle {
  display: flex;
  justify-content: space-between;
  width: 360px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

:deep(.ant-btn) {
  width: 80px;
}
</style>
