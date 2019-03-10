<template>
	<div class="sideBar">
		<el-menu :unique-opened="true">
	    	<v-menuTree :menuData='menus'></v-menuTree>  
	  </el-menu>
	</div>
</template>

<script>
	import menuTree from 'components/menus/menuTree'
	export default {
		name: 'sideBar',
		data() {
			return {
				menus: [
					/* {
						label: '资源管理',
						id: 'resource',
						childs: [
							{
								label: '教练管理',
								name: 'coach',
								id: 'coach',
								path: '/coach'
							},
							{
								label: '教练认证',
								name: 'coachAuth',
								id: 'coachAuth',
								path: '/coachAuth'
							},
							{
								label: '考场管理',
								name: 'examroom',
								id: 'examroom',
								path: '/examroom'
							},
							{
								label: '车辆管理',
								name: 'cars',
								id: 'cars',
								path: '/cars'
							},
							{
								label: '车辆信息认证',
								name: 'carAuth',
								id: 'carAuth',
								path: '/carAuth'
							},
						]
					},
					{
						label: '排班管理',
						id: 'scheduling',
						childs: [
							{
								label: '已发布排班',
								name: 'published',
								id: 'published',
								path: '/published'
							},
							{
								label: '未发布排班',
								name: 'unpublished',
								id: 'unpublished',
								path: '/unpublished'
							},
							{
								label: '新增排班',
								name: 'addScheduling',
								id: 'addScheduling',
								path: '/addScheduling'
							}
						]
					},
					{
						label: '考场订单',
						id: 'examroomOrder',
						childs: [
							{
								label: '退费申请',
								name: 'refund',
								id: 'refund',
								path: '/refund'
							}
						]
					},
					{
						label: '社区管理',
						id: 'community',
						childs: [
							{
								label: '公告栏列表',
								name: 'notices',
								id: 'notices',
								path: '/notices'
							},{
								label: '黑名单',
								name: 'blackList',
								id: 'blackList',
								path: '/blackList'
							},{
								label: '爽约单',
								name: 'missList',
								id: 'missList',
								path: '/missList'
							}
						]
					},
					{
						label: 'app消息配置中心',
						id: 'appNews',
						childs: [
							{
								label: '消息中心',
								name: 'newsCenter',
								id: 'newsCenter',
								path: '/newsCenter'
							},
							{
								label: '新增消息',
								name: 'newsEdit',
								id: 'newsEdit',
								path: '/newsEdit'
							}
						]
					},
					{
						label: '账目管理',
						id: 'account',
						childs: [
							{
								label: '提现',
								name: 'cash',
								id: 'cash',
								path: '/cash'
							},
							{
								label: '充值',
								name: 'recharge',
								id: 'recharge',
								path: '/recharge'
							},
							{
								label: '银行卡',
								name: 'banks',
								id: 'banks',
								path: '/banks'
							}
						]
					},
					{
						label: '用户管理',
						id: 'roles',
						childs: [
							{
								label: '角色管理',
								name: 'roles',
								id: 'roles',
								path: '/roles'
							},
							{
								label: '个人设置',
								name: 'seting',
								id: 'seting',
								path: '/seting'
							}
						]
					}, */
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
							label: '树形菜单',
							name: 'menus',
							id: 'menus',
							path: '/menus'
						}]
					},
					{
						label: '表格',
						id: 'tables',
						childs: [{
							label: '表格',
							name: 'tables',
							id: 'tables-default',
							path: '/tables'
						}]
					},
					{
						label: '数字递增',
						id: 'CountTos',
						childs: [{
							label: 'CountTo',
							name: 'countTos',
							id: 'countTos',
							path: '/countTos'
						}]
					},
					{
						label: '日历备忘录',
						id: 'calendars',
						childs: [{
							label: '备忘录',
							name: 'calendars',
							id: 'calendars',
							path: '/calendars'
						}]
					}, {
						label: '富文本',
						id: 'editor',
						childs: [{
							label: 'editors',
							name: 'editors',
							id: 'editors',
							path: '/editors'
						}]
					}
				]
			}
		},
		components:{
			'v-menuTree':menuTree
		}
	}
</script>

<style scoped lang="scss">
	.sideBar {
		width: 200px;
		height: 100%;
		border-right: 1px solid #dedede;
		li {
			span {
				display: block;
			}
		}
	}
</style>