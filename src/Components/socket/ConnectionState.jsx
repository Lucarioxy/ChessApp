export function ConnectionState({ isConnected }) {
    return <p>State: {isConnected ? 'Connected' : 'Disconnected'}</p>;
}

import PropTypes from 'prop-types';

ConnectionState.propTypes = {
    isConnected: PropTypes.bool.isRequired
};


