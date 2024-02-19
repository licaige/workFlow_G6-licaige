<template>
	<div>
		<div class="toolbar">
			<Button style="margin-right: 10px;" v-for="item in nodeTypes" :key="item" type="primary" size="small" @click="addNode(item)">{{item | formatBtnName}}</Button>
		</div>
		<div id="mountNode">

		</div>
	</div>
</template>

<script>
	import G6 from '@antv/g6';
	var graph = null
	const Util = G6.Util
	export default {
		name: 'workFlow',
		data() {
			return {
				nodeTypes: ['start', 'rule', 'ruleset', 'card', 'stratyge', 'module', 'tree', 'table', 'decision', 'end'],
				sourceData: [],
			}
		},
		mounted() {
			// 关闭 G6 的体验改进计划打点请求
			G6.track(false)
			this.initG6()
		},
		methods: {
			initG6() {
				const data = {
					nodes: [{
						id: 'node1',
						x: 100,
						y: 200,
						label: '时间调用规则',
						type: 'rule',
						label: '规则',
						shape: 'htmlNode'
					}, {
						id: 'node2',
						x: 300,
						y: 200
					}],
					edges: [{
						id: 'edge1',
						target: 'node2',
						source: 'node1',
						shape: 'arrow',
					}]
				}

				G6.registerNode('htmlNode', {
					draw(item) {
						const group = item.getGraphicGroup();
						const html = G6.Util.createDOM(`<div class="customNode2">
						<div class="delete_icon" data-id="${item.model.id}">一</div>
						<i class="font_family icon-${item.model.type}"></i>
						<div class="nodelabel">${item.model.label}</div>
						</div>`);
						return group.addShape('dom', {
							attrs: {
								x: 0,
								y: 0,
								width: 100,
								height: 24,
								html
							}
						});
					}
				})

				graph = new G6.Graph({
					container: 'mountNode',
					renderer: 'svg',
					width: 500,
					height: 500,
					mode: 'edit'
				});
				graph.on('node:click', ev => {
					const {
						domEvent,
						item
					} = ev;
					const {
						target
					} = domEvent;
					if(target && target.className == 'delete_icon') {
						alert('删除该节点' + target.dataset.id);
					}
				});
				graph.read(data);
			},
			addNode(item) {
//				graph.add('node', {
//					x: 50,
//					y: 50,
//					shape: 'htmlNode',
//					label: this.formatName(item),
//					type: item
//				})
								let canadd = true
								if(item == 'start' || item == 'end') {
									canadd = this.checkStarOrEndRepeat(item)
								}
								if(canadd) {
									graph.beginAdd('node', {
										shape: 'htmlNode',
										label: this.formatName(item),
										type: item
									})
									graph.refresh();
								} else {
									this.$Message.warning(`不能重复添加${item=='start'?'开始':'结束'}节点！`)
								}
			},
			addPolyLine() {
				graph.beginAdd('edge', {
					shape: 'polyLineFlow'
				});
			}, //添加折线

			//开始和结束节点重复检查
			checkStarOrEndRepeat(type) {
				let result = true
				let res = this.sourceData.filter(v => {
					if(v.type == type) {
						return v
					}
				})
				if(res.length > 0) result = false
				return result
			},
			//格式化类型描述
			formatName(item) {
				switch(item) {
					case 'start':
						return '开始哈哈哈合'
						break;
					case 'rule':
						return '规则'
						break;
					case 'ruleset':
						return '规则集'
						break;
					case 'card':
						return '评分卡'
						break;
					case 'stratyge':
						return '规则策略'
						break;
					case 'module':
						return '模型'
						break;
					case 'table':
						return '决策表'
						break;
					case 'tree':
						return '决策树'
						break;
					case 'decision':
						return '决策'
						break;
					case 'end':
						return '结束'
						break;
					default:
						return '无定义节点'
						break;
				}
			},
		},
		filters: {
			formatBtnName(item) {
				switch(item) {
					case 'start':
						return '开始'
						break;
					case 'rule':
						return '规则'
						break;
					case 'ruleset':
						return '规则集'
						break;
					case 'card':
						return '评分卡'
						break;
					case 'stratyge':
						return '规则策略'
						break;
					case 'module':
						return '模型'
						break;
					case 'table':
						return '决策表'
						break;
					case 'tree':
						return '决策树'
						break;
					case 'decision':
						return '决策'
						break;
					case 'end':
						return '结束'
						break;
					default:
						return '无定义节点'
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
<style>
	.customNode2 {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 25px;
		background-color: #0B73AF;
		text-align: center;
		line-height: 50px;
		color: #fff;
		/*border: 10px solid #DBDBDB;*/
	}
	
	.customNode2 .delete_icon {
		position: absolute;
		width: 18px;
		height: 18px;
		top: -5px;
		right: -5px;
		text-align: center;
		line-height: 18px;
		color: #0B73AF;
		background-color: #fff;
		cursor: pointer;
		font-size: 12px;
		border-radius: 10px;
		border: 1px solid #0B73AF;
		z-index: 999;
	}
	
	.customNode2 .nodelabel {
		position: absolute;
		width: 100%;
		text-align: center;
		font-size: 12px;
		left: 0;
		top: 40px;
		color: #666;
		white-space: nowrap;
	}
</style>