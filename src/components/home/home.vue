<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-tree
        :props="defaultProps"
        accordion
        :load="loadNode"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {requestUserOfMenus} from '@/api/user'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518'
    }
    return {
      tableData: Array(20).fill(item),
      defaultProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      menuData: [],
      fristNodeMenu: []
    }
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.fristNodeMenu)
      }
      if (node.level > 1) {
        var childrenNode = []
        var flag = false
        this.menuData.forEach(menu => {
          if (menu.parentId === node.id) {
            this.menuData.forEach(item => {
              if (menu.id === item.parentId) {
                flag = true
              }
            })
            var nodeMenu
            if (flag) {
              nodeMenu = {
                name: this.menu.name,
                id: this.menu.id,
                leaf: true
              }
            } else {
              nodeMenu = {
                id: this.menu.id,
                name: this.menu.name
              }
            }
            childrenNode.push(nodeMenu)
          }
        })
        return resolve()
      }
    },
    handleNodeClick (data) {
      console.log(data)
    }
  },
  created () {
    requestUserOfMenus().then(res => {
      debugger
      if (res.data.code === 200) {
        this.menuData = res.data.data
        // 清空数据
        this.fristNodeMenu = []
        this.menuData.forEach(menu => {
          if (menu.parentId) {
            var flag = false
            this.menuData.forEach(item => {
              if (menu.id === item.parentId) {
                flag = true
              }
            })
            var nodeMenu
            if (flag) {
              nodeMenu = {
                name: this.menu.name,
                id: this.menu.id,
                leaf: true
              }
            } else {
              nodeMenu = {
                id: this.menu.id,
                name: this.menu.name
              }
            }
            this.fristNodeMenu.push(nodeMenu)
          }
        })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
