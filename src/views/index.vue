<template>
  <div class="app-container home">
    <el-divider />
    <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div>
            <h1>TRX兑换测试地址 </br>目前兑换比例：1USDT = 14TRX </br>到账时间预计2-3分钟 </br>超过5分钟未到账,出现问题请联系DN
            </h1>
          </div>
          <div class="body">
            <el-image :src="url"></el-image>
            <h1>TGFiz12fTp8MrZnJaRSoHmpu6hhP7Tkdrf</h1>
            <!-- <el-button type="success" round>刷新</el-button> -->
          </div>
        </el-card>
      </el-col>
      <el-col :xs="36" :sm="36" :md="18" :lg="12">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <h1>TRX预支测试地址 </br>目前预支仅提供给本网站会员用户! </br>到账时间预计2-3分钟 </br>超过5分钟未到账,出现问题请联系DN
            </h1>
          </div>
          <div class="body">
            <el-form ref="form"  label-width="80px">
              <el-form-item label="预支TRX">
                <el-input placeholder="请输入您的钱包地址，单次预支20TRX" v-model="advanceAddress" clearable></el-input>
              </el-form-item>
              <el-button type="success" round>预支</el-button>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
    
  </div>
</template>

<script>
import inputPieChart from './echart/inputPieChart.vue';

export default {
  name: "Index",
  components: { inputPieChart },
  data() {
    return {
      // 版本号
      version: "3.8.5",
      url: "http://jnmsakura.oss-us-west-1.aliyuncs.com/2023/05/16/47af744561c8467796bc067d03e82cadTGFiz12fTp8MrZnJaRSoHmpu6hhP7Tkdrf.png",
      advanceAddress: ""
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}</style>

