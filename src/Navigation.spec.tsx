import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "react-testing-library";

import { Navigation } from "./.";

const config = [
  {
    id: "/path/1",
    title: "Title 1",
    children: [
      {
        id: "/path/2",
        title: "Title 2",
        children: [
          {
            id: "/path/3",
            title: "Title 3",
            children: [
              {
                id: "/path/4",
                title: "Title 4",
                children: [
                  {
                    id: "/path/5",
                    title: "Title 5"
                  },
                  {
                    id: "/path/6",
                    title: "Title 6"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "/path/7",
    title: "Title 7",
    children: [
      {
        id: "/path/8",
        title: "Title 8",
        children: [
          {
            id: "/path/9",
            title: "Title 9"
          }
        ]
      }
    ]
  }
];

describe("Navigation", () => {
  let getNavigationEl: any;

  beforeAll(() => {
    getNavigationEl = (props: any = {}) => (
      <MemoryRouter>
        <Navigation
          config={config}
          currentPath="/path/4"
          activeClassName="active-class-name"
          className="navigation-class-name"
          {...props}
        />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("renders correctly by default", () => {
    const { container } = render(getNavigationEl());
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with all props", () => {
    const { container } = render(
      getNavigationEl({ withChildrenClassName: "with-children-class-name" })
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("toggles items correctly", () => {
    const { container, getByText } = render(
      getNavigationEl({ withChildrenClassName: "with-children-class-name" })
    );

    fireEvent.click(getByText("Title 2"));

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText("Title 1"));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("doesn't toggle items without children", () => {
    const { container, getByText } = render(
      getNavigationEl({ withChildrenClassName: "with-children-class-name" })
    );

    fireEvent.click(getByText("Title 5"));

    expect(container.firstChild).toMatchSnapshot();
  });
});
