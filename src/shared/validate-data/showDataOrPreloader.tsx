import { Preloader } from '@/app/assets/Tempus-Ui';
import { ReactNode } from 'react';

const ShowDataOrPreloader = ({ data, children }: { data: unknown; children: ReactNode }) => {
  return data ? children : <Preloader />;
};

export default ShowDataOrPreloader;
