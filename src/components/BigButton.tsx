import React, { HTMLProps, ReactElement } from "react";
import { RiLoader4Line } from "react-icons/ri";

interface IBigButton extends HTMLProps<HTMLElement> {
    buttonText: string;
    className?: string;
    children?: ReactElement;
    onClick?: (arg0: any) => any;
    isLoading?: boolean;
    activate?: boolean;
    color?: string;
    size?: number;
}
const BigButton: React.FC<IBigButton> = ({
    buttonText,
    className,
    children = null,
    onClick = () => {},
    style,
    isLoading,
    activate,
    color,
    size,
}) => {
    return (
        <button
            onClick={isLoading || activate ? () => {} : onClick}
            onSubmit={onClick}
            style={{
                ...style,
                cursor: activate ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.4 : activate ? 0.4 : 1,
                background: color,
            }}
            className={`big-button ${className ? className : ""}`}
        >
            {!isLoading && children}
            {!isLoading ? (
                buttonText
            ) : (
                <RiLoader4Line
                    size={size === null ? 25 : size}
                    className="button-loader"
                />
            )}
        </button>
    );
};

export default BigButton;
