import React from 'react';

const CustomFrame = ({children, onRemove, editable, title}) => {
  return (
    <div className="x_panel fixed_height_320">
      <div className="x_title">
          <h2>{title}</h2>
          <ul className="nav navbar-right panel_toolbox">
            {editable && 
              <li>
                <a href onClick={() => {onRemove();}} className="close-link">
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
              </li>}
          </ul>
          <div className="clearfix"></div>
      </div>
      <div className="x_content">
        {children}
      </div>
  </div>
);
};


export default CustomFrame;
