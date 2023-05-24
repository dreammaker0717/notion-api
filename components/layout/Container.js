import classNames from "classnames";

function Container({ children, ...props }) {
  return (
    <div
      className={classNames(
        "container mx-auto px-[28px] lg:px-6 md:max-w-[1167px] max-w-[970px]",
        props.className
      )}
    >
      {children}
    </div>
  );
}

Container.defaultProps = {};

export default Container;
