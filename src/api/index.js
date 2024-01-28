import axios from 'axios'
import base from './base'
import { ref } from 'vue'

const api = {
  getProductP0001() {
    return axios.get(base.productP0001)
  },

  getProductP0002() {
    return axios.get(base.productP0002)
  },

  getProductP0003() {
    return axios.get(base.productP0004)
  },

  getProductP0004() {
    return axios.get(base.productP0004)
  },

  getProductList() {
    const productList = ref([])
    productList.value.push(this.getProductP0001()),
      productList.value.push(this.getProductP0002()),
      productList.value.push(this.getProductP0003()),
      productList.value.push(this.getProductP0004()),
      console.log('product list', productList.value)

    return productList
  },

  getSupplierABCD() {
    return axios.get(base.supplierABCD)
  },

  getSupplierCDEF() {
    return axios.get(base.supplierCDEF)
  }
}

export default api
