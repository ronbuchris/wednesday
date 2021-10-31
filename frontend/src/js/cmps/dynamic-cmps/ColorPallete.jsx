import React from "react";

export class ColorPallete extends React.Component {
    state = {
      colors: ['#037f4c', '#00c875', '#9cd326', '#cab641','#ffcb00','#784bd1','#a25ddc','#0086c0','#579bfc','#66ccff','#bb3354','#e2445c','#ff158a','#ff5ac4','#ff642e','#fdab3d','#c4c4c4','#808080'],
    };
  
    render() {
      const { changeGroupColor,colorPicker,toggleMenus,toggleMenu} = this.props;
      const { colors } = this.state;
      return (
          <div className="colors">
              {colors.map((color)=>(
                  <div key={color} className="group-color-item btn" style={{ backgroundColor: color}} onClick={(ev)=>{
                      ev.stopPropagation();
                      changeGroupColor(color)
                      colorPicker();
                      toggleMenu(toggleMenus)
                  }}></div>
              ))}
          </div>
          
      );
    }
  }
  