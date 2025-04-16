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
          return "bg-[#bd88c9] text-black";
          case "outlined":
            return " w-full bg-transparent text-black border border-2 border-[#bd88c9] hover:bg-[#bd88c9]";
        default:
          return "bg-blue-500 text-white";
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
  