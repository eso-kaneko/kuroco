<template>
  <div>
    <h1>RSS フィード</h1>
    <ul>
      <li v-for="item in rssItems" :key="item.link">
        <h2><a :href="item.link" target="_blank">{{ item.title }}</a></h2>
        <p><strong>日時:</strong> {{ item.date }}</p>
        <p><strong>カテゴリ:</strong> {{ item.subject }}</p>
        <div v-html="item.content"></div>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRss } from "~/composables/useRss";  // RSS取得関数をインポート

const rssItems = ref([]);

onMounted(async () => {
  rssItems.value = await useRss();
});
</script>
