// 使用动态导入生成组件
// 枚举图标
enum MenuIcon {
	House = IEpHouse,
	PieChart = IEpPieChart,
	Postcard = IEpPostcard,
	Grid = IEpGrid,
	Pointer = IEpPointer,
	MagicStick = IEpMagicStick,
	Picture = IEpPicture,
}

export function getIcon(icon: string) {
	// console.log('icon是:', icon);
	return MenuIcon[icon];
}
