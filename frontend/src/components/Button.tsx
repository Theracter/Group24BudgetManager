import React, { ReactNode, MouseEvent } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'] as const;
const SIZES = ['btn--medium', 'btn--large'] as const;

type ButtonProps = {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    buttonStyle?: (typeof STYLES)[number];
    buttonSize?: (typeof SIZES)[number];
};

export const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    onClick,
    buttonStyle,
    buttonSize,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle!) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize!) ? buttonSize : SIZES[0];

    return (
        <Link to="/sign-up" className="btn-mobile">
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};
