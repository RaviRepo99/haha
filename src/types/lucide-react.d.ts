// Type declarations for lucide-react direct imports
declare module 'lucide-react/dist/esm/icons/*' {
  import { FC, SVGProps } from 'react';

  export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  const Icon: FC<LucideProps>;
  export default Icon;
}
