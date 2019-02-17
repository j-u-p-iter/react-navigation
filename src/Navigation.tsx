import { Tree } from "@j.u.p.iter/react-tree";
import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

interface INavigationProps {
  config: any;
  currentPath: string;
  className?: string;
  activeClassName?: string;
  withChildrenClassName?: string;
}

const noop = () => {};

export const Navigation: React.SFC<INavigationProps> = ({
  config,
  currentPath,
  className,
  activeClassName,
  withChildrenClassName = ""
}: any) => {
  return (
    <Tree activeId={currentPath} config={config}>
      {({ api: { getTree, toggleNode } }) => {
        const renderTree = (tree: any) =>
          tree.map(({ id: path, active, title, children }: any) => {
            const withChildren = Boolean(children);
            const handleClick = withChildren ? toggleNode : noop;
            const itemClassName = classNames({
              [activeClassName]: active,
              [withChildrenClassName]: withChildren
            });

            return (
              <li
                key={path}
                id={path}
                onClick={event => {
                  event.stopPropagation();

                  handleClick(event);
                }}
                className={itemClassName}
              >
                <Link to={path}>{title}</Link>

                {children ? <ul>{renderTree(children)}</ul> : null}
              </li>
            );
          });

        return (
          <nav className={className}>
            <ul>{renderTree(getTree())}</ul>
          </nav>
        );
      }}
    </Tree>
  );
};
