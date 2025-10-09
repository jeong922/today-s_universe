import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

export const ModalPortal = ({ children }: Props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.querySelector('.modal') as Element;

  return <>{createPortal(children, node)}</>;
};
