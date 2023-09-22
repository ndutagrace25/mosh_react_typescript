interface ButtonProps {
  children: string;
  color?: "primary" | "secondary" | "danger" | "success";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "secondary" }: ButtonProps) => {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
