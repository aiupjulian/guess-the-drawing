import React from 'react';
import PropTypes from 'prop-types';

class Color extends React.Component {
    handleColorClick = () => {
        const { onChangeColor, color } = this.props;
        onChangeColor(color);
    };

    render() {
        const { className, color } = this.props;
        return (
            <button
                className={className}
                type="button"
                onClick={this.handleColorClick}
                style={{ 'background-color': color }}
            />
        );
    }
}

Color.propTypes = {
    className: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onChangeColor: PropTypes.func.isRequired,
};

export default Color;
