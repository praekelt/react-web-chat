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

var _messages = require('../../actions/messages');

var messageActions = _interopRequireWildcard(_messages);

var _helpers = require('../../utils/helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var mapStateToProps = function mapStateToProps(_ref) {
    var messages = _ref.messages;
    return {
        latestMessageResponseType: (0, _helpers.getLatestRemote)(messages.messages).responseType
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        submitHandler: function submitHandler(text) {
            dispatch(messageActions.messageSend({
                text: text
            }));
        }
    };
};

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    messages: _propTypes2.default.object
}), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps));

var InputArea = exports.InputArea = function InputArea(_ref2) {
    var InputComponent = _ref2.InputComponent,
        submitHandler = _ref2.submitHandler;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(InputComponent, { submitHandler: submitHandler })
    );
};

exports.default = enhance(InputArea);
//# sourceMappingURL=index.js.map