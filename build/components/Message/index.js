'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    text: _propTypes2.default.string,
    images: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        url: _propTypes2.default.string.isRequired,
        text: _propTypes2.default.string
    }))
})); // @ts-check
var Message = exports.Message = function Message(_ref) {
    var text = _ref.text,
        images = _ref.images,
        ImageComponent = _ref.ImageComponent;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h1',
            null,
            text
        ),
        images.length && images.map(function (image) {
            return _react2.default.createElement(ImageComponent, image);
        })
    );
};

exports.default = enhance(Message);
//# sourceMappingURL=index.js.map