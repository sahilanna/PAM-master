// Navbar Dropdown Items
import React from "react";
import { Dropdown } from "semantic-ui-react";

const NavbarDropdown = ({ title, items }) => {
    return (
        <Dropdown item text={title}>
          <Dropdown.Menu>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Dropdown.Item>{item}</Dropdown.Item>
                {index < items.length - 1 && <Dropdown.Divider />}
              </React.Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
};

export default NavbarDropdown;
