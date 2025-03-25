<script setup>
import { parseStringPromise } from 'xml2js';

const feedUrl = 'https://kankeinai.blog.jp/index.rdf'; // RSSのURL
const { data, error } = await useFetch(feedUrl, {
  transform: async (xml) => {
    if (!xml) return null;
    return await parseStringPromise(xml, { explicitArray: false });
  }
});

const items = data.value?.rdf?.RDF?.item || []; // RSSのアイテムを取得

console.log("パース後のデータ:", items);
</script>

<template>
  <div>
    <h2>RSS フィード</h2>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.link">
        <a :href="item.link">{{ item.title }}</a>
      </li>
    </ul>
    <p v-else>データがありません。</p>
  </div>
</template>
