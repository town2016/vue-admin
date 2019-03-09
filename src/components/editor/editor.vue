<template>
<div class="editor" :class="{error:err}">
  <!-- 图片上传组件辅助-->
  <div class="label" :style="{width:labelWidth+'px'}">
  	<label :class="{required:required}">
  		<slot name="label" class="12"></slot>
  	</label>
  </div>
  <div class="editor-wrapper" :style="{margin:'0 0 0 '+labelWidth+'px'}">
  	<el-upload
  		style="display: none;"
      class="uploader"
      :action="serverUrl"
      name="img"
      :data="params"
      :headers="header"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload">
    </el-upload>
    <!--富文本编辑器组件-->
    <el-row v-loading="quillUpdateImg" style="position: relative;">
      <quill-editor class="editor"
        v-model="detailContent"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="_blur"
        @change="onEditorChange($event)">
      </quill-editor>
      <p class="tips" v-if="tips.length>0">{{tips}}</p>
    </el-row>
  </div>
</div>
</template>
<script>
	const toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	  ['blockquote', 'code-block'],
	
	  [{'header': 1}, {'header': 2}],               // custom button values
	  [{'list': 'ordered'}, {'list': 'bullet'}],
	  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
	  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
	  [{'direction': 'rtl'}],                         // text direction
	
	  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
	  [{'header': [1, 2, 3, 4, 5, 6, false]}],
	
	  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
	  [{'font': []}],
	  [{'align': []}],
	  ['link', 'image', 'video'],
	  ['clean']                                         // remove formatting button
	]

export default {
	name:'editor',
  data() {
      return {
      	tips:'',
      	err:false,
      	isInit:true,
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: '',  // 这里写你要上传的图片服务器地址
        header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
        detailContent: '', // 富文本内容
        editorOption: {
        	placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector(".uploader input").click()
                  } else {
                    this.quill.format('image', false)
                  }
                }
              }
            }
          }
        }  // 富文本编辑器配置
      }
  },
  props:{
  	params:{
  		type:Object,
  		default(){
  			return {}
  		}
  	},
  	labelWidth:{
		type:Number,
  		default(){
  			return 100
  		}
  	},
  	initContent:{
  		type:String,
  		default(){
  			return ''
  		}
  	},
  	required:{
  		type:[Boolean,String],
  		default(){
  			return undefined;
  		}
  	}
  },
  watch:{
  	isInit:function(val,oval){
  		if(val){
  			this.tips = '';
  			this.err = false;
  		}
  	}
  },
  created(){
  	this.detailContent = this.initContent;
  },
  mounted(){
  	this.$nextTick(() =>{
			this.$on('resetForm',function(){
				this.resetForm();
			});
		})
  },
  methods: {
    beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code === '200' && res.info !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.info)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.$message.error('图片插入失败')
    },
    /*当编辑器内容发生变化时触发*/
    onEditorChange ($event) {
    	this.$emit('on-change', $event)
    	this.isInit = false
    	this.valiDate()
    },
    /*设置编辑器的内容*/
    resetForm () {
    	this.detailContent = ''
    	this.isInit = true
    },
    /*设置报错*/
    valiDate (msg='请编辑内容') {
      this.isInit = false
    	if (this.detailContent.length == 0) {
    		if (!this.isInit) {
    			this.tips = msg
    			this.err = true
    		}
    		return false
    	}else{
    		this.tips = ''
    		this.err = false
    		return true
    	}
    },
    _blur(){
    	this.valiDate()
    }
  }
}
</script>

<style  lang="scss">
	.editor{
		position: relative;
		padding-bottom: 20px;
		.ql-container.ql-snow{
			.ql-editor{
				min-height: 200px;
			}
		}
		.label{
			float: left;
			text-align: right;
			padding-right: 12px;
			box-sizing: border-box;
			line-height: 40px;
			label{
				span{
					color: #606266;
					font-size: 14px;
				}
			}
		}
		.tips{
			bottom: 0;
		}
		
	}
	.editor.error{
		.ql-container.ql-snow,.ql-toolbar.ql-snow{
			border-color: #FF0000;
		}
	}
</style>