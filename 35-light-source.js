let applyChanges = false;
new Dialog({
  title: `Token Vision Configuration`,
  content: `
    <form>
      <div class="form-group">
        <label>Vision Type:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">No Change</option>
          <option value="dim0">Self</option>
          <option value="dim60">Darkvision</option>
          <option value="dim120">Darkvision (Drow)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Light Source:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">No Change</option>
          <option value="none">None</option>
          <option value="candle">Candle</option>
          <option value="lamp">Lamp</option>
          <option value="lantern-bullseye">Lantern (Bullseye)</option>
          <option value="lantern-hooded">Lantern (Hooded)</option>
          <option value="sunrod">Sunrod</option>
          <option value="torch">Torch</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Change`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Change`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        // Get Vision Type Values
        switch (visionType) {
          case "dim0":
            dimSight = 0;
            brightSight = 0;
            break;
          case "dim60":
            dimSight = 0;
            brightSight = 60;
            break;
          case "dim120":
            dimSight = 0;
            brightSight = 120;
            break;
          case "nochange":
          default:
            dimSight = token.data.dimSight;
            brightSight = token.data.brightSight;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            break;
          case "candle":
            dimLight = 5;
            brightLight = 0;
            break;
          case "everburning-torch":
            dimLight = 40;
            brightLight = 20;
            break;
          case "lamp":
            dimLight = 30;
            brightLight = 15;
            break;
          case "lantern-bullseye":
            dimLight = 120;
            brightLight = 60;
            lockRotation = false;
            lightAngle = 52.5;
            break;
          case "lantern-hooded":
            dimLight = 60;
            brightLight = 30;
            break;
          case "sunrod":
            dimLight = 60;
            brightLight = 30;
            break;
          case "torch":
            dimLight = 40;
            brightLight = 20;
            break;
          case "nochange":
          default:
            dimLight = token.data.dimLight;
            brightLight = token.data.brightLight;
            lightAngle = token.data.lightAngle;
            lockRotation = token.data.lockRotation;
        }
        // Update Token
        console.debug(token);
        token.update({
          vision: true,
          dimSight: dimSight,
          brightSight: brightSight,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation
        });
      }
    }
  }
}).render(true);
