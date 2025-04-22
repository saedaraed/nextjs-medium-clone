interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outlined";
    disabled?: boolean;
    type?: "button" | "submit";
  }
  
  const Button = ({ text, onClick, variant = "primary", disabled = false, type = "button" }: ButtonProps) => {
    const getButtonStyle = () => {
      switch (variant) {
        case "secondary":
          return "bg-[#2b5773] text-white";
          case "outlined":
            return " w-full bg-transparent text-[#24242b] border border-1 border-[#2b5773] hover:bg-[#2b5773] hover:text-white";
        default:
          return " text-white";
      }
    };
  
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`px-4 py-2 rounded ${getButtonStyle()} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  