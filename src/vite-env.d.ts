/// <reference types="vite/client" />

declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }
  
  export const ShoppingCart: ComponentType<IconProps>;
  export const ChevronLeft: ComponentType<IconProps>;
  export const ChevronRight: ComponentType<IconProps>;
  export const Star: ComponentType<IconProps>;
  export const Truck: ComponentType<IconProps>;
  export const Shield: ComponentType<IconProps>;
  export const ArrowLeft: ComponentType<IconProps>;
  export const Plus: ComponentType<IconProps>;
  export const Minus: ComponentType<IconProps>;
  export const Search: ComponentType<IconProps>;
  export const Filter: ComponentType<IconProps>;
  export const Play: ComponentType<IconProps>;
  export const Info: ComponentType<IconProps>;
  export const Camera: ComponentType<IconProps>;
  export const Mic: ComponentType<IconProps>;
  export const FlaskRound: ComponentType<IconProps>;
  export const Mail: ComponentType<IconProps>;
  export const MessageCircle: ComponentType<IconProps>;
}
