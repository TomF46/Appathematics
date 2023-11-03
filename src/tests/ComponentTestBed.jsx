import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '../redux/store';

const ComponentTestBed = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

ComponentTestBed.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ComponentTestBed;
