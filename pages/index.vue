<script setup>
import { ref, onMounted } from 'vue';
import { parseStringPromise } from 'xml2js';

const feedUrl = 'https://kankeinai.blog.jp/index.rdf';
const items = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(feedUrl);
    const xmlText = await response.text();
    const parsed = await parseStringPromise(xmlText, { explicitArray: false });

    // RDF形式のRSSは、データが `rdf:RDF` の中に `item` として存在
    const feedItems = parsed['rdf:RDF']?.['item'];

    // `feedItems` がオブジェクトの場合は配列化
    items.value = Array.isArray(feedItems) ? feedItems : [feedItems];

    console.log("パース後のデータ:", items.value);
  } catch (error) {
    console.error("RSS取得エラー:", error);
  }
});
</script>

<template>
  <div>
    <h2>RSS フィード</h2>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.link">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </li>
    </ul>
    <p v-else>データがありません。</p>
  </div>
</template>
