'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputArea = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
    var messages = _ref.messages;
    return {
        latestMessageResponseType: (0, _helpers.getLatestRemote)(messages.messages).responseType
    };
}; // @ts-check


var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    messages: _propTypes2.default.object
}), (0, _reactRedux.connect)(mapStateToProps));

var InputArea = exports.InputArea = function InputArea(props) {
    return _react2.default.createElement(
        'div',
        null,
        props.children
    );
};

exports.default = enhance(InputArea);
//# sourceMappingURL=index.js.map