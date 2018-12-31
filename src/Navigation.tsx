import { Tree } from "@j.u.p.iter/react-tree";
import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

interface INavigationProps {
  config: any;
  activeClassName: string;
  containerClassName: string;
}

const noop = () => {};

export const Navigation: React.SFC<INavigationProps> = ({
  config,
  containerClassName,
  activeClassName
}: any) => {
  return (
    <Tree config={config}>
      {({ api: { getTree, toggleNode } }) => {
        const renderTree = (tree: any) =>
          tree.map(({ id: path, active, title, children }: any) => {
            const handleClick = children ? toggleNode : noop;
            const itemClassName = classNames({ [activeClassName]: active });

            return (
              <li key={path} onClick={handleClick} className={itemClassName}>
                <Link to={path}>{title}</Link>
                {children ? <ul>{renderTree(children)}</ul> : null}
              </li>
            );
          });

        return (
          <nav>
            <ul className={containerClassName}>{renderTree(getTree())}</ul>
          </nav>
        );
      }}
    </Tree>
  );
};
