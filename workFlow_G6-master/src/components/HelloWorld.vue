<template>
	<div>
		<div class="toolbar">
			<Button type="primary" size="small" @click="addPolyLine">连线</Button>
			<Button type="primary" size="small" @click="drag">整体拖拽</Button>
			<Button type="primary" size="small" @click="auto">自动居中</Button>
			<Button type="primary" size="small" @click="save">保存</Button>
			<Button type="primary" size="small" @click="updo">撤消</Button>
			<Button type="primary" size="small" @click="del">删除</Button>
			<Button type="primary" size="small" @click="clear">清空</Button>
		</div>
		<div class="toolbar">
			<Button style="margin-right: 10px;" v-for="item in nodeTypes" :key="item" type="primary" size="small" @click="addNode(item)">{{item | formatBtnName}}</Button>

		</div>
		<!--<div id="img"></div>-->
		<div id="c1"></div>
		<Form label-position="left" :label-width="100">
			<FormItem label="当前节点名称">
				<Input v-model="cruNode.type"></Input>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	require('./g6.min.js')
	var net = null
	const Util = G6.Util
	export default {
		name: "index",
		components: {},
		mounted() {
			this.init()
		},
		data() {
			return {
				nodeTypes: ['start', 'rule', 'ruleset', 'card', 'stratyge', 'module', 'tree', 'table', 'decision', 'end'],
				curActiveDomId: null,
				cruNode: {
					type: ''
				},
				dragging: false,
				imgObj: null,
				sourceData: [],
				data: {
					nodes: [],
					edges: []
				}
			}
		},
		methods: {
			async init() {
				await this.initData()
				this.getimg()
			},
			initData() {
				this.sourceData.map(v => {
					this.data.nodes.push({
						x: v.x,
						y: v.y,
						id: v.id,
						label: this.formatName(v.type),
						type: v.type,
						shape: v.shape
					})
				})
				return true
			},
			getimg() {
				// 创建 Image对象
				this.imgObj = new Image();
				// 为 src 属性赋值
				this.imgObj.src = "../../static/myhead.png";
				// 当 imgObj 加载完毕后触发事件
				this.imgObj.onload = () => {
					// 控制台打印 Image对象的 宽 和 高
					this.initG6()
				}
			},
			initG6() {
				// 锚点样式
				G6.Global.anchorPointStyle = {
					fill: '#108EE9',
					lineWidth: 0.1,
					r: 4
				};
				//默认节点样式
				G6.Global.nodeStyle = {
					//					stroke: 'red',  //边色
					//					fill: '#fff',   //内部背景色
					lineWidth: 0, //边宽
					//					radius: 4,      //圆角
					//					fillOpacity: 0.10  //内部透明度
				};
				//节点控制点样式
				G6.Global.nodeControlPointStyle = {
					r: 0,
					fill: '#fff',
					shadowBlur: 0,
					shadowColor: '#666'
				};
				//节点激活框样式
				G6.Global.nodeAcitveBoxStyle = {
					show: false,
					stroke: 'red',
					lineDash: [0, 0],
					lineWidth: 0
				};
				//节点委托图形样式
				G6.Global.nodeDelegationStyle = {
					stroke: '#108EE9',
					lineDash: [3, 3]
				};
				//				G6.Global.edgeStyle = {
				//					lineWidth: 2,
				//					stroke: '#0b73af'
				//				};
				//边委托图形样式
//								G6.Global.edgeDelegationStyle = {
//									stroke: 'red',
//									lineDash: [3, 3],
//									lineWidth: 1,
//								};
				// 锚点激活样式
				G6.Global.anchorPointHoverStyle = {
					lineWidth: 6,
					stroke: '#108EE9',
					strokeOpacity: 0.2
				};

				//注册节点类型2
				G6.registNode('customHtml1', {

					cssSize: true, // 该配置项设置为 true 时，则节点不受 node size 控制
					getHtml: (cfg) => {
						var model = cfg.model;
						var dom = Util.createDOM(`<div class="node_wrap">
						<div class="delete_icon ${this.curActiveDomId == model.id ? 'show_delete':''}">一</div>
						<div class="customNode2 ${this.curActiveDomId == model.id ? 'node_active':''}">
						<div class="nodelabel">${cfg.label}</div>
						<i class="font_family icon-${model.type}"></i>
						</div></div>`);
						return dom;
					}
				}, 'html');
				G6.registNode('customHtml1', {
					// 常规锚点
					getAnchorPoints: function() {
						return [
							[0, 0.5], // 左边中点 索引为 0
							[1, 0.5], // 右边中点 索引为 1
							[0.5, 0], // 上边中点
							[0.5, 1] //下边中点
						];
					}
				});
				//注册节点类型 1
				G6.registNode('imgnode', {
					draw: (cfg, group) => {
						group.addShape('text', {
							attrs: {
								x: cfg.x,
								y: cfg.y + 70,
								fill: '#333',
								text: cfg.label

							}
						});
						return group.addShape('image', {
							attrs: {
								x: cfg.x,
								y: cfg.y,
								width: 50,
								height: 50,
								img: this.imgObj
								//								img: 'https://file.iviewui.com/icon/inmap.png'
							}
						});
					},
					getAnchorPoints: (cfg, group) => {
						return [
							[0.5, 1, {
								// 锚点图形属性
								style: {
									fill: 'red',
									fillOpacity: 0.7
								},
								// 悬浮锚点图形属性
								hoverStyle: {
									stroke: null
								},
								// 是否可以连接
								linkable: true
							}], // 上边的中点
							[1, 0.5], // 右边的中点
							[0.5, 0], // 下边的中点
							[0, 0.5] // 左边的中点
						]
					}
				});
				//注册节点类型 1
				G6.registNode('mynode', {
					draw: function(cfg, group) {
						group.addShape('text', {
							attrs: {
								x: cfg.x - 15,
								y: cfg.y + 40,
								fill: '#333',
								text: cfg.label

							}
						});
						return group.addShape('circle', {
							attrs: {
								x: cfg.x,
								y: cfg.y,
								r: 20,
								fill: '#0B73AF',
								stroke: '#0B73AF'
							}
						});
					}
				});
				//配置G6画布
				net = new G6.Net({
					id: 'c1', // 容器ID
					renderer: 'svg',
					grid: {
						forceAlign: true,
						cell: 10
					},
					mode: 'edit',
					//					width: 1000, // 画布宽
					height: 500, // 画布高
					fitView: 'cc'
				});

				G6.track(false)
				//载入数据
				net.source(this.data.nodes, this.data.edges);
				net.render()
				//当前有激活结点，点击画布空白时刷新上个节点选中状态
				net.on('click', (ev) => {
					if(!ev.item && this.curActiveDomId) {
						let lastActiveId = JSON.parse(JSON.stringify(this.curActiveDomId))
						this.curActiveDomId = null
						net.update(lastActiveId)
					}
				});
				//鼠标点击事件
				net.on('itemclick', (ev) => {
					console.log(ev) //获取节点信息
					let node = ev.item.getModel()

					/*——————————————此外判断是否点击了删除按钮，若为删除则在删除后不做后续操作——————————————————————*/
					//点击位置和节点中心位置的x轴偏移量
					let xDev = ev.domX - node.x
					//点击位置和节点中心位置的y轴偏移量
					let yDev = node.y - ev.domY
					if(xDev > 8 && xDev < 22 && yDev > 16 && yDev < 30) {
						console.log('删除')
						this.del()
						this.curActiveDomId = null //删除后，将当前激活结点Id置空
					} else {   //更新当前结点和上一结点的选中状态
						let lastActiveId = null
						if(this.curActiveDomId) {
							lastActiveId = JSON.parse(JSON.stringify(this.curActiveDomId))

						}
						this.curActiveDomId = node.id
						if(lastActiveId) {
							net.update(lastActiveId)
						} //更新上一个节点状态
						net.update(node.id) //更新选中节点状态
					}
					if(Util.isNode(ev.item)) {
						this.getCurSelect()
					}
				})
				net.on('dragstart', (ev) => {
					this.dragging = true;
				})
				net.on('dragend', (ev) => {
					this.dragging = false;
				})
				// 拖拽边结束后重置锚点
				net.on('dragedgeend', (ev) => {
						if(ev.edge._attrs.id) {
							let edge = ev.edge.getModel()
							let node = ev.item.getModel()
							let relateEdges = ev.item.getEdges().filter(v => {
								return v.getModel().id != edge.id
							})
							//将关联线的起止id首尾相加，判断是否两节点间已有连线
							let compareStr = []
							let curStr = edge.source + edge.target
							relateEdges.map(v => {
								let edgeInfo = v.getModel()
								compareStr.push(edgeInfo.source + edgeInfo.target)
								compareStr.push(edgeInfo.target + edgeInfo.source)
							})
							if(compareStr.indexOf(curStr) != -1) {
								net.remove(ev.edge)
								return
							}
							//若起止节点为同一节点，则取消连线
							if(edge.source == edge.target) {
								net.remove(ev.edge)
								return
							}
						}
					}),
					net.on('itemadd', (ev) => {
						if(Util.isNode(ev.item)) {
							let node = ev.model
							this.sourceData.push({
								"x": node.x,
								"y": node.y,
								"id": node.id,
								type: node.type
							})
							this.curActiveDomId = node.id
							this.getCurSelect()
						}
					})
				net.on('mouseenter', (ev) => {
						var shape = ev.shape;
						if(shape && shape.hasClass('anchor-point') && !this.dragging) {
							net.beginAdd('edge', {
								shape: 'polyLineFlow'
							});
						}
					})
			},
			addNode(item) {
				let canadd = true
				if(item == 'start' || item == 'end') {
					canadd = this.checkStarOrEndRepeat(item)
				}
				if(canadd) {
					net.beginAdd('node', {
						shape: 'customHtml1',
						label: this.formatName(item),
						type: item
					})
					net.refresh();
				} else {
					this.$Message.warning(`不能重复添加${item=='start'?'开始':'结束'}节点！`)
				}
			},
			addLine() {
				net.beginAdd('edge', {
					shape: 'line'
				});
			}, //添加直线
			addSmooth() {
				net.beginAdd('edge', {
					shape: 'smooth'
				})
			}, //添加曲线
			addArrowSmooth() {
				net.beginAdd('edge', {
					shape: 'smoothArrow'
				})
			}, //添加箭头曲线
			addArrowLine() {
				net.beginAdd('edge', {
					shape: 'arrow'
				});
			}, //添加箭头直线
			addPolyLine() {
				net.beginAdd('edge', {
					shape: 'polyLineFlow',
					color: '#0B73AF'
				});
			}, //添加折线
			drag() {
				net.changeMode('drag');
			},
			//保存
			save() {
				let data = net.save()
				console.log(data)
			},
			//撤消
			updo() {
				net.updo()
			},
			//删除
			del() {
				if(!this.curActiveDomId) {
					this.$Message.warning("请选择要删除的元素！")
					return
				}
				let node = net.find(this.curActiveDomId)
				if(Util.isNode(node)) {
					this.deleteSourceNode(this.curActiveDomId)
				}
				net.remove(node)
			},
			auto() {
				net.autoZoom()
			},
			//清空
			clear() {
				net.changeData()
				this.sourceData = []
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
			//获取当前选中节点信息
			getCurSelect() {
				if(this.curActiveDomId) {
					let nodes = this.sourceData.filter(v => {
						return v.id == this.curActiveDomId
					})
					this.cruNode.type = nodes[0].type
				} else {
					this.cruNode.type = ''
				}
			},
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
			//删除画布节点时同时删除源数据对应节点
			deleteSourceNode(nodeId) {
				this.sourceData.forEach((item, index) => {
					if(item.id === nodeId) {
						this.sourceData.splice(index, 1)
						index--
					}
				})
			}
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

<style rel="stylesheet/scss" lang="scss" scoped>
	.toolbar {
		padding: 0 10px;
		height: 50px;
		line-height: 50px;
	}
</style>

<style type="text/css">
	.node_wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 70px;
		height: 70px;
	}
	
	.customNode2 {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		background-color: #0B73AF;
		text-align: center;
		line-height: 50px;
		color: #fff;
		/*border: 10px solid #DBDBDB;*/
	}
	.node_active{
		background-color: #56A0CB;
	}
	
	.node_wrap .delete_icon {
		display: none;
		position: absolute;
		width: 18px;
		height: 18px;
		top: 5px;
		right: 10px;
		text-align: center;
		line-height: 18px;
		color: #0B73AF;
		background-color: #fff;
		cursor: pointer;
		font-size: 12px;
		/*border-radius: 10px;*/
		border: 1px solid #0B73AF;
		/*z-index: 999;*/
	}
	
	.node_wrap .show_delete {
		display: block;
	}
	
	.customNode2 .nodelabel {
		position: absolute;
		width: 100%;
		text-align: center;
		font-size: 12px;
		left: 0;
		top: 60px;
		color: #666;
		white-space: nowrap;
	}
</style>