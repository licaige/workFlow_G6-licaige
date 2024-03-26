import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { NavBar,Icon } from 'zarm';

import s from './style.module.less';

const Header = ({ title = '' }) => {
    const navigate = useNavigate()
    return (
        <div className={s.headerWrap}>
            <div className={s.block}>
                <NavBar className={s.header} title={title} left={<Icon type='arrow-left' theme='primary' onClick={() => navigate(-1)}></Icon>}></NavBar>
            </div>
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header;