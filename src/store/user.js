import { defineStore } from "pinia";
import { userLogin } from "@/api/user.js";

const useUserStore = defineStore(
  'user',
  {
    state: () => {
      return {
        username: '',
        token: ''
      }
    },
    actions: {
      login(data) {
        return new Promise((resolve, reject) => {
          userLogin(data).then(res => {
            this.username = res.data.data.username
            this.token = res.data.data.token
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      logout() {
        this.username = ''
        this.token = ''
      }
    },
    persist: {
      //这里存储默认使用的是session
      enabled: true,
      strategies: [
        {
          //key的名称
          key: 'user',
          //更改默认存储，我更改为localStorage
          storage: localStorage,
          // 可以选择哪些进入local存储，这样就不用全部都进去存储了
          // 默认是全部进去存储
        }
      ]
    }
  }
)

export default useUserStore
