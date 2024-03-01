import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function tableDetail(
	props: any,
	context?: any
): React.ReactElement<any, any> | null {
	// 获取动态路由的值
	const params = useParams();

	// 获取查询字符串的值
	const [searchParams, setSearchParams] = useSearchParams();

	// useEffect(() => {
	// 	// 一个对象，key 为动态字符串的 key
	// 	console.log(params); // {id: '123'}

	// 	// 一个对象，但是不可直接点出属性
	// 	console.log(typeof searchParams); // object

	// 	// 输入 http://localhost:3304/goods/123?name=nihao
	// 	console.log(searchParams.get("name")); // nihao
	// }, []);

	const handleAddParams = () => {
		// 修改 查询字符串 的数据
		setSearchParams({
			name: "xxx",
		});
	};

	return (
		<>
			<h2 onClick={handleAddParams}>GoodsDetail Page</h2>
		</>
	);
}
