import React from 'react';
import PropTypes from 'prop-types';

class Color extends React.Component {
    handleColorClick = () => {
        const { onChangeColor, color } = this.props;
        onChangeColor(color);
    };

    render() {
        const { color } = this.props;
        const classNames = `option color ${color}`;
        return (
            <button
                type="button"
                className={classNames}
                onClick={this.handleColorClick}
            >
                {color}
            </button>
        );
    }
}

Color.propTypes = {
    onChangeColor: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

export default Color;
