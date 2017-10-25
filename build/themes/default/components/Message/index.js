'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    text: _propTypes2.default.string,
    origin: _propTypes2.default.oneOf(['local', 'remote']),
    images: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        url: _propTypes2.default.string.isRequired,
        text: _propTypes2.default.string
    }))
}), (0, _recompose.withProps)(function (_ref) {
    var origin = _ref.origin;
    return {
        isLocal: origin === 'local'
    };
}));

var Message = exports.Message = function Message(_ref2) {
    var text = _ref2.text,
        _ref2$images = _ref2.images,
        images = _ref2$images === undefined ? [] : _ref2$images,
        ImageComponent = _ref2.ImageComponent,
        isLocal = _ref2.isLocal;

    return _react2.default.createElement(
        'div',
        { className: 'Message' },
        _react2.default.createElement(
            'div',
            { className: 'Message--container ' + (!isLocal ? 'is-remote' : '') },
            _react2.default.createElement(
                'h1',
                null,
                text
            ),
            images.length && images.map(function (image, i) {
                return _react2.default.createElement(ImageComponent, _extends({ key: i }, image));
            })
        )
    );
};

exports.default = enhance(Message);