import React, { HTMLProps, ReactElement } from "react";

interface IInput extends HTMLProps<ReactElement> {
    placeholder: string;
    type: string;
    onChange?: (arg0: any) => any;
    onClick?: (arg0: any) => any;
    right?: React.ReactNode;
    value?: string;
    setRef?: any;
    inputError?: boolean;
    onBlur?: (arg0: any) => any;
    deactivate?: boolean;
}

const Input: React.FC<IInput> = (props) => {
    return (
        <div
            onClick={props.onClick}
            style={{ opacity: props.deactivate ? 0.6 : 1 }}
            className={`input-box ${props.inputError ? "error" : null}`}
        >
            {props.children}
            <input
                disabled={props.deactivate}
                onBlur={props.onBlur}
                onSubmit={props.onChange}
                ref={props.setRef}
                value={props.value}
                onChange={props.deactivate ? () => {} : props.onChange}
                placeholder={props.placeholder}
                type={props.type}
            />
            {props.right}
        </div>
    );
};

export default Input;
