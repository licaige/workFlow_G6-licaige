import { h, render } from 'vue';
// import { getIcon } from './enumIcon';

// defineProps<{ iconTag: string }>()
interface IconProps {
	itag: string;
}

// 该方法不可行
// export default function renderIcon(props: IconProps) {
// 	const { itag } = props;
// 	// 创建一个新节点容器
// 	const node = document.createElement('div');
// 	// 使用 `render` 将虚拟节点添加到 DOM 树里
// 	return render(h('el-icon', [h(getIcon(itag))]), node);
// }

export default {
	name: 'RenderIcon',
	props: ['itag'],
	setup(props: IconProps) {
		const { itag } = props;
		return () => h(itag); // h('el-icon', [h(getIcon(itag))]);
	},
};

// const RenderIconFn = (props: IconProps) => {
// 	const { itag } = props;
// 	return h('el-icon', [h(getIcon(itag))]);
// };

// RenderIconFn.props = {
// 	itag: {
// 		type: String,
// 		required: true,
// 	},
// };

// export default RenderIconFn;
