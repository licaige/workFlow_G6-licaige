import { HTMLAttributeAnchorTarget } from 'react';
import { useNavigate, useLocation, useHref, useLinkClickHandler, To } from 'react-router-dom';

export default function HistoryRule() {
	const HistoryNav = useNavigate();
	const HrefTo = (to: To) => useHref(to);
	let Location = useLocation();

	const LinkNav = ({
		to,
		target,
		replace,
		state,
	}: {
		to: To;
		target?: HTMLAttributeAnchorTarget | undefined;
		replace?: boolean | undefined;
		state?: any;
	}) =>
		useLinkClickHandler(to, {
			target,
			replace,
			state,
		});

	const LinkTo = (to: any, action: any = { replace: true }) => {
		return HistoryNav(to, action); // history 的 replace 模式
	};

	return {
		HistoryNav,
		LinkTo,
		Location,
		HrefTo,
		LinkNav,
	};
}
