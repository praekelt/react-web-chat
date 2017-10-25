'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    url: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string
}), (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount(props) {
        var myImage = new Image(100, 200);
        myImage.src = this.props.url;
        myImage.addEventListener('load', function () {
            console.log('LOADED!');
        });
    }
})); // @ts-check
var ImageComponent = exports.ImageComponent = function ImageComponent(_ref) {
    var url = _ref.url,
        text = _ref.text;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: url }),
        text && _react2.default.createElement(
            'h2',
            null,
            text
        )
    );
};

exports.default = enhance(ImageComponent);
//# sourceMappingURL=index.js.map