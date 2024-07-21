import { ClassnameActionMode } from '../const/mode';
import { TClassnameActionMode } from '../types/common';

const roundToInteger = (number: number): number => Math.round(number);
const parseInteger = (value: string) => parseInt(value, 10);

const handleClassName = (element: HTMLElement | null, className: string, action: TClassnameActionMode = ClassnameActionMode.Remove) => {
  if (element === null) {
    return;
  }

  switch (action) {
    case ClassnameActionMode.Add:
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
      break;

    case ClassnameActionMode.Remove:
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
      break;
  }
};

export {
  handleClassName,
  roundToInteger,
  parseInteger
};
