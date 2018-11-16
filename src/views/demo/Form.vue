<template>
<el-row>
<el-col :span="12">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
	    <el-select v-model="form.region" placeholder="请选择活动区域">
			<el-option v-for="item in options" 
				:key="item.value"
      			:label="item.label"
      			:value="item.value">
    		</el-option>
  		</el-select>
  </el-form-item>
  <el-form-item label="活动时间">
	<el-date-picker	v-model="form.datetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="预定数量">
	<el-input-number v-model="form.num"  @change="handleChange" :min="1" :max="10"></el-input-number>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
		<el-checkbox v-for="item in options" 
			:key="item.value"
			:label="item.label"
      		:value="item.value">
		</el-checkbox>
      <el-checkbox label="1" name="type">美食/餐厅线上活动</el-checkbox>
      <el-checkbox label="2" name="type">地推活动</el-checkbox>
      <el-checkbox label="3" name="type">线下主题活动</el-checkbox>
      <el-checkbox label="4" name="type">单纯品牌曝光</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="1">线上品牌商赞助</el-radio>
      <el-radio label="2">线下场地免费</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          datetime: new Date(),
		  delivery: false,
		  num:1,
          type: [],
          resource: '',
          desc: ''
		},
		options: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }],
      }
    },
    methods: {
	  handleChange(value) {
        console.log(value);
      },
      onSubmit() {
		console.log('submit!',this.form.name,this.form.region,this.form.datetime,
		this.form.delivery,this.form.num,this.form.type,this.form.resource,this.form.desc);
	  }
    }
  }
</script>