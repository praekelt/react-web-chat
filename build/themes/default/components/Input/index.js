'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    submitHandler: _propTypes2.default.func
}), (0, _recompose.withState)('value', 'setValue', '')); // @ts-check
var Input = exports.Input = function Input(_ref) {
    var submitHandler = _ref.submitHandler,
        value = _ref.value,
        setValue = _ref.setValue;
    return _react2.default.createElement(
        'div',
        { className: 'Input' },
        _react2.default.createElement('input', { type: 'text', value: value, onChange: function onChange(_ref2) {
                var value = _ref2.target.value;
                return setValue(value);
            } }),
        _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                    return submitHandler(value);
                } },
            'SUBMIT'
        )
    );
};

exports.default = enhance(Input);