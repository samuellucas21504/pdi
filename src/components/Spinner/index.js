import { ReactComponent as SpinnerIcon } from '../../assets/loader.svg';
import './styles.css';

const Spinner = () => {
    return (
      <div className="spinner-container">
        <SpinnerIcon className="spinner" />
      </div>
    );
  };
  
  export default Spinner;