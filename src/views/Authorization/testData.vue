<template>
  <div>
    <h1>Data from Axios</h1>
    <table>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.name }}</td>
        <td>{{ post.type }}</td>
        <td>{{ post.brand }}</td>
        <td>{{ post.price }}</td>
        <td>{{ post.manufacturer }}</td>
        <td>{{ post.supplier_id }}</td>
        <td>{{ post.notes }}</td>
        <td>{{ post.quantity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const posts = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('/api/products/P0003')
        console.log('response', response.data)
        posts.value = response.data
        console.log('post.value', posts.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    return {
      posts
    }
  }
}
</script>
