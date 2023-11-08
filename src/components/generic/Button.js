import "./button.css";

const Button = ({ value, onClick, id }) => {
    const buttonClass = value.toLowerCase();

    return (
        <div id={id}>
            <button
                onClick={onClick}
                className={buttonClass}
            >
                {value}
            </button>
        </div>
    );
};

export default Button;
