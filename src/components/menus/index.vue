<template>
	<div class="menus">
		<div class="content">
			<el-menu>
				<v-menuTree :menuData="menus"></v-menuTree>
			</el-menu>
		</div>
	</div>
</template>

<script>
	import menuTree from './menuTree'
	export default {
		name: 'menus',
		data () {
			return {
				menus: [
					{
						label: '表单',
						id: 'forms',
						childs: [{
							label: 'form组件',
							name: 'forms',
							id: 'forms',
							path: '/forms'
						}]
					},
					{
						label: '导航菜单',
						id: 'menus',
						childs: [{
							label: '树形导航菜单',
							name: 'menus',
							id: 'menus',
							path: '/menus'
						}]
					}
				]
			}
		},
		components: {
			'v-menuTree': menuTree
		}
	}
</script>

<style scoped lang="scss">
	.menus{
		.content{
			width: 200px;
		}
	}
</style>