import './button.scss';

import { type FC, type PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  style?: React.CSSProperties;
  onClick: () => void;
}

export const Button: FC<IProps> = ({ style, children, onClick }) => {
  return (
    <button className="sk-btn" style={style} onClick={() => onClick()}>
      {children}
    </button>
  );
};
