const React = require("react");

const NextLink = ({ children, ...props }) =>
  React.createElement("a", props, children);

module.exports = NextLink;
module.exports.default = NextLink;
