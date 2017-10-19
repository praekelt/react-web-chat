'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

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
}));

var Message = exports.Message = function Message(_ref) {
    var text = _ref.text,
        _ref$images = _ref.images,
        images = _ref$images === undefined ? [] : _ref$images,
        ImageComponent = _ref.ImageComponent;

    return _react2.default.createElement(
        'div',
        {
            className: 'jsx-1305410062'
        },
        _react2.default.createElement(
            'h1',
            {
                className: 'jsx-1305410062'
            },
            text
        ),
        images.length && images.map(function (image, i) {
            return _react2.default.createElement(ImageComponent, _extends({ key: i }, image));
        }),
        _react2.default.createElement(_style2.default, {
            styleId: '1305410062',
            css: 'h1.jsx-1305410062{color:red;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90aGVtZXMvZGVmYXVsdC9jb21wb25lbnRzL01lc3NhZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0J3QixBQUcrQixVQUNkIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy90aGVtZXMvZGVmYXVsdC9jb21wb25lbnRzL01lc3NhZ2UvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtY2hlY2tcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29tcG9zZSwgc2V0UHJvcFR5cGVzIH0gZnJvbSAncmVjb21wb3NlJztcblxuY29uc3QgZW5oYW5jZSA9IGNvbXBvc2UoXG4gICAgc2V0UHJvcFR5cGVzKHtcbiAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgTWVzc2FnZSA9ICh7IHRleHQsIGltYWdlcyA9IFtdLCBJbWFnZUNvbXBvbmVudCB9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMT57dGV4dH08L2gxPlxuICAgICAgICAgICAge2ltYWdlcy5sZW5ndGggJiYgaW1hZ2VzLm1hcCgoaW1hZ2UsIGkpID0+IDxJbWFnZUNvbXBvbmVudCBrZXk9e2l9IHsuLi5pbWFnZX0gLz4pfVxuICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgICAgICAgIGgxIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlbmhhbmNlKE1lc3NhZ2UpO1xuIl19 */\n/*@ sourceURL=../../../../../src/themes/default/components/Message/index.js */'
        })
    );
};

exports.default = enhance(Message);
//# sourceMappingURL=index.js.map