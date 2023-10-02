import { ArcaneBaseEvent } from "arcanepad-web-sdk";

export class LanternGetLanternPointEvent extends ArcaneBaseEvent {
  x: number
  y: number
  constructor(x: number, y: number) {
    super(MyEventNames.LanternGetPoint)
    this.x = x
    this.y = y
  }
}

export class LanternChangeLightIntensityEvent extends ArcaneBaseEvent {
  intensity: number
  constructor(intensity: number) {
    super(MyEventNames.LanternChangeIntensity)
    this.intensity = intensity
  }
}

export class LanternToggleOnOffEvent extends ArcaneBaseEvent { constructor() { super(MyEventNames.LanternToggleOnOff) } }

export enum MyEventNames {
  LanternGetPoint = 'LanternGetPoint',
  LanternChangeIntensity = 'LanternChangeIntensity',
  LanternToggleOnOff = 'LanternToggleOnOff',
}
