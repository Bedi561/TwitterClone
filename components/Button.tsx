interface ButtonProps {
    label: string;
    secondary: boolean;
    fullWidth: boolean;
    large: boolean;
    onClick: () => void;
    disabled: boolean;
    outline: boolean;
}

const Button: React.FC<ButtonProps> = ({label,secondary,fullWidth,large,onClick,outline,disabled}) =>{
    return(
        <button disabled={disabled} onClick={onClick} 
        className={'disabled: opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2 '}>
        {label}
        </button>
    )
}

export default Button;