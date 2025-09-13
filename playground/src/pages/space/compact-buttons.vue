<script lang="ts" setup>
import {
  CommentOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  StarOutlined,
} from '@ant-design/icons-vue'
</script>

<template>
  <div>
    <a-space-compact block>
      <!-- <a-tooltip title="Like"> -->
      <a-button>
        <LikeOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Comment"> -->
      <a-button>
        <CommentOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Star"> -->
      <a-button>
        <StarOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Heart"> -->
      <a-button>
        <HeartOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Share"> -->
      <a-button>
        <ShareAltOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Download"> -->
      <a-button>
        <DownloadOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-dropdown placement="bottomRight" :trigger="['click']"> -->
      <a-button>
        <EllipsisOutlined />
      </a-button>
      <!---->
      <!--   <template #overlay> -->
      <!--     <a-menu> -->
      <!--       <a-menu-item> -->
      <!--         <a href="javascript:;">1st menu item</a> -->
      <!--       </a-menu-item> -->
      <!--       <a-menu-item> -->
      <!--         <a href="javascript:;">2nd menu item</a> -->
      <!--       </a-menu-item> -->
      <!--       <a-menu-item> -->
      <!--         <a href="javascript:;">3rd menu item</a> -->
      <!--       </a-menu-item> -->
      <!--     </a-menu> -->
      <!--   </template> -->
      <!-- </a-dropdown> -->
    </a-space-compact>
    <br>
    <a-space-compact block>
      <a-button type="primary">
        Button 1
      </a-button>
      <a-button type="primary">
        Button 2
      </a-button>
      <a-button type="primary">
        Button 3
      </a-button>
      <a-button type="primary">
        Button 4
      </a-button>
      <!-- <a-tooltip title="Tooltip"> -->
      <a-button type="primary" disabled>
        <DownloadOutlined />
      </a-button>
      <!-- </a-tooltip> -->
      <!-- <a-tooltip title="Tooltip"> -->
      <a-button type="primary" disabled>
        <DownloadOutlined />
      </a-button>
      <!-- </a-tooltip> -->
    </a-space-compact>
    <br>
    <a-space-compact block>
      <a-button>Button 1</a-button>
      <a-button>Button 2</a-button>
      <a-button>Button 3</a-button>
      <a-tooltip title="Tooltip">
        <a-button disabled>
          <DownloadOutlined />
        </a-button>
      </a-tooltip>
      <a-tooltip title="Tooltip">
        <a-button>
          <DownloadOutlined />
        </a-button>
      </a-tooltip>
      <a-button type="primary">
        Button 4
      </a-button>
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <a-button type="primary">
          <EllipsisOutlined />
        </a-button>

        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space-compact>
  </div>
</template>
