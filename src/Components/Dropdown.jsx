import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  
  const {dropdownTitle, cities, chooseCity} = props;
  
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {dropdownTitle}
      </DropdownToggle>
      <DropdownMenu>
        {cities.map((city, index) => {
          return (<DropdownItem key={`sub-${index}`} onClick={chooseCity}>{Object.keys(city)}</DropdownItem>)
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;