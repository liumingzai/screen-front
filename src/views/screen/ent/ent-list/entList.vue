<template>
  <div class="data_manage">
    <div class="dtmg_title">
      <span>企业列表({{totalPageData}})</span>

      <router-link to="/inno/ent/edit">
        <el-button type='primary'>添加企业</el-button>
      </router-link>

    </div>

 <div>

      <el-table 
      ref="multipleTable" 
      :data="dataList" 
      style="width: 100%" 
      v-loading='loading'>

        <el-table-column prop="dataName" label="专利ID" width="">
        </el-table-column>

        <el-table-column prop="dataSourceType" label="专利名称" width="">

        </el-table-column>

        <el-table-column prop="projectName" label="申请人" width="">
        </el-table-column>

        <el-table-column prop="apiUrl" label="申请日期" width="">
        </el-table-column>

        <el-table-column prop="createTime" label="领域ID" width="">
        </el-table-column>

        <el-table-column prop="userName" label="上传人" width="">
        </el-table-column>

        <el-table-column label="操作" width="">
          <template slot-scope="scope">

            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type='text' size='small' @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination 
      background layout="prev, pager, next" 
      :total='totalPageData' 
      @current-change='handlePage' 
      :current-page.sync='searchParams.pageNum'>

      </el-pagination>

    </div>

  </div>

</template>

<script>
import EntService from "../EntService";
var _EntService = new EntService();

export default {
  name: "dataManage",
  data() {
    return {
      totalPageData: null,
      dataList: [],
      searchParams: {
        pageNum: 1,
        dataName: "",
        status: "",
        projectId: ""
      },
      loading: true,
      operationTpye: "",
      isAllchecked: false
    };
  },
  methods: {
    //加载数据列表
    getDataList() {
      _EntService
        .getDataList(this.searchParams)
        .then(data => {
          console.log(data);
          if (data.code == 2000) {
            this.totalPageData = data.size;
            this.dataList = data.data;
            this.loading = false;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch(err => {
          console.log(data);
          this.$message.error("网络错误");
        });
    },
    //按条件搜索相关数据
    handleSearch() {
      this.searchParams.pageNum = 1;
      this.getDataList();
    },
    //跳转至相应数据页面
    handleEdit(row) {
      this.$router.push({ name: "entEdit", params: { id: row.id } });
    },
    //删除该条数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _EntService
            .deleteData(row.id)
            .then(data => {
              console.log(data);
              if (data.code == 2000) {
                this.$message.success("删除数据成功");
                this.totalPageData -= 1;
                if (this.totalPageData / 10 <= 1) {
                  this.searchParams.pageNum = 1;
                } else if (
                  this.totalPageData / 10 ==
                  this.searchParams.pageNum - 1
                ) {
                  this.searchParams.pageNum--;
                } else {
                  this.searchParams.pageNum = this.searchParams.pageNum;
                }
                this.getDataList();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("网络错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页处理
    handlePage(num) {
      this.searchParams.pageNum = num;
      this.getDataList();
    }
  },
  created() {
    this.getDataList();
  }
};
</script>