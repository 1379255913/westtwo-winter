<template>
  <div class="navbar">
    <div class="navbar-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="changeIndex"
      >
        <el-menu-item index="0">音乐搜索</el-menu-item>
        <el-menu-item index="1">下载历史</el-menu-item>
        <div class="flex-grow" />
        <el-dropdown class="user">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
    </div>
  </div>
  <div class="search-box">
    <div class="search-title">{{ activeIndex==='0' ? '音乐下载' : '历史下载'}}</div>
    <div v-show="activeIndex==='0'">
      <el-input
        v-model="searchText"
        size="large"
        placeholder="请输入要搜索的歌曲和歌手"
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="searchRequest"></el-button>
        </template>
      </el-input>
      <el-divider></el-divider>
      <div class="table-top">
<!--        <el-button type="primary" @click="bulkDownloadRequest">批量下载</el-button>-->
      </div>
      <el-table :data="tableData" stripe style="width: 100%" ref="tableRef">
<!--        <el-table-column type="selection" width="55" align="center"/>-->
        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="name" label="歌曲" align="center"/>
        <el-table-column prop="artist" label="歌手" align="center"/>
        <el-table-column prop="album" label="专辑" align="center"/>
        <el-table-column prop="duration" label="时长" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" @click="downloadRequest(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="activeIndex==='1'">
      <div class="table-top">
<!--        <el-button type="primary" style="margin-left: 10px" >批量下载</el-button>-->
        <el-button type="danger" :disabled="historyTableData.length===0" @click="deleteHistoryRequest(1)">批量删除</el-button>
      </div>
      <el-table :data="historyTableData" stripe style="width: 100%" ref="historyTableRef" @selection-change="selectChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="name" label="歌曲" align="center"/>
        <el-table-column prop="artist" label="歌手" align="center"/>
        <el-table-column prop="album" label="专辑" align="center"/>
        <el-table-column prop="duration" label="时长" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" @click="downloadRequest(scope.row)">重下</el-button>
            <el-button type="danger" @click="deleteHistoryRequest(0,scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.fav===0" @click="favRequest(scope)">未收藏</el-button>
            <el-button v-else type="warning" @click="favRequest(scope)">已收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-bottom">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-count="pagination.pageCount"
          background
          layout="prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue"
import { Search,ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"
import useUserStore from "@/store/user";
import { getSearchList,downloadMusic } from "@/api/search.js";
import { getHistoryList,deleteHistory,putFavMusic } from "@/api/history.js";

//用户数据
const userStore = useUserStore()
const { username } = userStore
const Router = useRouter()

//退出登录
const logout = () => {
  Router.push('/login')
  userStore.token = ''
  userStore.username = ''
}

const activeIndex = ref('0')

const searchText = ref('')
const searchRequest = () => getSearchList({
  text: searchText.value
}).then(res => {
  console.log(res.data.data.list)
  tableData.value = res.data.data.list
})

const tableRef = ref()
const tableData = ref([])

const changeIndex = (index) => {
  activeIndex.value = index
  if (index==='1') {
    refreshHistory()
  }
}

const downloadRequest = (row) => {
  downloadMusic(row.rid).then(res => {
    const data = res.data
    const blob = new Blob([data], { type: 'audio/mpeg' }); //type这里表示默认的下载文件类型为xlsx类型
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${row.name}.mp3`; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href);
  })

}

// const bulkDownloadRequest = () => {
//   tableSelection.value.forEach(each => {
//     console.log(each.rid)
//     setTimeout(()=>{
//       downloadRequest(each.rid)
//     },1000*Math.random())
//   })
// }

const historyTableSelection = ref([])
const historyTableRef = ref()
const historyTableData = ref([])
const pagination = reactive({
  currentPage: 1,
  pageCount: 1
})

watch(()=>pagination.currentPage,(value, oldValue, onCleanup)=>{
  console.log(value,oldValue)
  refreshHistory(value)
})

const selectChange = (val)=> {
  historyTableSelection.value = val
}

const refreshHistory = (page = 1) => {
  console.log(page)
  const data = {
    page: page
  }
  getHistoryList(data).then(res => {
    historyTableData.value = res.data.data.list
    if (res.data.data.count){
      pagination.pageCount = res.data.data.count
    }
  })
}

const deleteHistoryRequest = (type, id=-1) => {
  const data = {
    type: type
  }
  if (type === 0 ) {
    data.id = id
  } else {
    data.list = historyTableSelection.value.map(each => each.id)
  }
  deleteHistory(data).then(_ => {
    refreshHistory()
  })
}

const favRequest = (scope) => {
  scope.row.fav = 1 -scope.row.fav
  putFavMusic({
    id: scope.row.id,
    fav: scope.row.fav
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  box-sizing: border-box;
}

.navbar-wrapper {
  position: relative;
  border-bottom: 1px solid var(--el-border-color);
  //height: var(--header-height);
  padding: 0 12px 0 24px;
  background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  box-sizing: border-box;
  top: 0;
}

.flex-grow {
  flex-grow: 1;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-box {
  margin: 100px 100px 0 100px
}

.search-title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 32px;
}
.search-bar {

}

.table-top {
  display: flex;
  flex-direction: row-reverse;
}

.table-bottom {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
