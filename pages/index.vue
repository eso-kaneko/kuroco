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
      <!-- 取得したデータが存在する場合に表示 -->
      <ul v-if="data.value && data.value.items">
        <li v-for="(item, index) in data.value.items" :key="index">
          <h2>{{ item.title }}</h2>
          <a :href="item.link" target="_blank">詳細はこちら</a>
          <p>{{ item.description }}</p>
        </li>
      </ul>
      <!-- データがない場合 -->
      <p v-else>データがありません。</p>
    </div>
  </div>
</template>

<script setup>
const feedUrl = 'https://kankeinai.blog.jp/index.rdf' // 使用するRSSフィードのURL

// useFetch を使って RSS フィードを取得
const { data, error, isFetching } = useFetch(feedUrl)

// dataがRef型で返ってきた場合、valueプロパティを使う
if (data.value) {
  console.log('データ:', data.value) // ここで実際に取得したデータを確認する
}

// エラーが発生した場合、コンソールにエラーメッセージを表示
if (error) {
  console.error('API エラー:', error)
}
</script>
