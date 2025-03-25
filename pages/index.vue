<template>
  <div>
    <h1>RSS フィード</h1>
    <div v-if="error">
      <p>データの取得に失敗しました。</p>
    </div>
    <div v-if="isFetching">
      <p>読み込み中...</p>
    </div>
    <div v-if="data && !isFetching">
      <ul>
        <li v-for="(item, index) in data.items" :key="index">
          <h2>{{ item.title }}</h2>
          <a :href="item.link" target="_blank">詳細はこちら</a>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { parseString } from 'xml2js'

// RSS フィードの URL
const feedUrl = 'https://kankeinai.blog.jp/index.rdf'

const { data, error, isFetching } = useFetch(feedUrl, {
  transform: (response) => {
    return new Promise((resolve, reject) => {
      const xml = response.body // XML フィードを取得
      parseString(xml, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rss.channel[0])
        }
      })
    })
  }
})
</script>