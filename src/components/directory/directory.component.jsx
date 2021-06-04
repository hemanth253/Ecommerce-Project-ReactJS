import React from "react";

import MenuItem from "../menu-item/menu-item.component.jsx";
import "./directory.styles.scss";
import sections from "./directory.data.js";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: sections,
    };
  }
  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSectionProps }) => {
          return <MenuItem key={id} {...otherSectionProps} />;
        })}
      </div>
    );
  }
}

export default Directory;
