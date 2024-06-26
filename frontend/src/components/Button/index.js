import Spinner from '../Spinner';
import './styles.css';

const Button = ({ children, onClick, disabled }) => {
    return (
      <div className="button" onClick={onClick}>
        {disabled ?  <Spinner/> : children}
      </div>
    );
  };
  
  export default Button;