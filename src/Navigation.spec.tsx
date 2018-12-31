import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "react-testing-library";

import { Navigation } from "./.";

const config = [
  {
    id: "1",
    title: "Title 1",
    children: [
      {
        id: "2",
        title: "Title 2",
        children: [
          {
            id: "3",
            title: "Title 3",
            children: [
              {
                id: "4",
                title: "Title 4",
                children: [
                  {
                    id: "5",
                    title: "Title 5"
                  },
                  {
                    id: "6",
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
    id: "7",
    title: "Title 7",
    children: [
      {
        id: "8",
        title: "Title 8",
        children: [
          {
            id: "9",
            title: "Title 9"
          }
        ]
      }
    ]
  }
];

describe("Navigation", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation
          config={config}
          activeClassName="active-class-name"
          containerClassName="container-class-name"
        />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
