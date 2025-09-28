<script setup lang="ts">
import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue'

const items = [
  {
    key: '1',
    label: '1st menu item',
    href: 'https://www.antgroup.com',
  },
  {
    key: '2',
    label: '2nd menu item (disabled)',
    href: 'https://www.aliyun.com',
    icon: SmileOutlined,
    disabled: true,
  },
  {
    key: '3',
    label: '3rd menu item (disabled)',
    href: 'https://www.luohanacademy.com',
    disabled: true,
  },
  {
    key: '4',
    label: 'Danger item',
    danger: true,
    extra: 'New',
  },
]
</script>

<template>
  <div class="dropdown-basic">
    <a-dropdown>
      <template #overlay>
        <a-dropdown-item
          v-for="item in items"
          :key="item.key"
          :event-key="item.key"
          :danger="item.danger"
          :disabled="item.disabled"
        >
          <template v-if="item.icon" #icon>
            <component :is="item.icon" />
          </template>
          <template #default>
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              @click.prevent
            >
              {{ item.label }}
            </a>
            <span v-else>
              {{ item.label }}
            </span>
          </template>
          <template v-if="item.extra" #extra>
            <span class="dropdown-extra">{{ item.extra }}</span>
          </template>
        </a-dropdown-item>
      </template>

      <a class="dropdown-link" @click.prevent>
        <a-space>
          Hover me
          <DownOutlined />
        </a-space>
      </a>
    </a-dropdown>
  </div>
</template>

<style scoped>
.dropdown-basic {
  padding: 24px;
}

.dropdown-link {
  color: var(--ant-color-primary);
  cursor: pointer;
}

.dropdown-extra {
  color: var(--ant-color-text-tertiary);
  font-size: 12px;
}
</style>
