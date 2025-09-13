<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-space>
    Space
    <a-button type="primary">
      Button
    </a-button>
    <a-upload>
      <a-button>
        <UploadOutlined />
        Click to Upload
      </a-button>
    </a-upload>
    <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
      <a-button>Confirm</a-button>
    </a-popconfirm>
  </a-space>
</template>
