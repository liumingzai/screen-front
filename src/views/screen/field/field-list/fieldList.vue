<template>
  <div class="data_manage">
    <div class="dtmg_title">
      <span>领域列表({{totalPageData}})</span>
      <router-link to="/inno/field/edit">
        <el-button type='primary'>添加领域</el-button>
      </router-link>
    </div>
    <div>

    <el-table 
      ref="multipleTable" 
      :data="dataList" 
      style="width: 100%" 
      v-loading='loading'>

        <el-table-column prop="id" label="领域ID" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="name" label="领域名称" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentOwner" label="专利申请人" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentCateOwner" label="专利类型分析" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentTypeOwner" label="专利类型" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentType" label="专利类型分布" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentProvince" label="专利区域分布" width="">
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" prop="patentTypeProvince" label="各省专利" width="">
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
import FieldService from "../FieldService";
var _FieldService = new FieldService();

export default {
  name: "fieldList",
  data() {
    return {
      totalPageData: null,
      dataList: [],
      searchParams: {
        pageNum: 1
      },
      loading: true,
      operationTpye: "",
      isAllchecked: false
    };
  },
  methods: {
    //加载数据列表
    getDataList() {
      _FieldService
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
      this.$router.push({ name: "fieldEdit", params: { id: row.id } });
    },
    //更新数据状态
    handleUpdateState(row) {
      console.log(row);
      _FieldService
        .updateDataState(row.id, row.status)
        .then(data => {
          console.log(data);
          if (data.code == 2000) {
            this.$message.success("更新数据状态成功");
          } else {
            this.$message.error(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("网络错误");
        });
    },
    //删除该条数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _FieldService
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