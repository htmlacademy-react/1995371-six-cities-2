import { ClassnameActionModeOption } from '../const/mode';
import { ClassnameActionMode } from '../types/common';

const roundToInteger = (number: number): number => Math.round(number);
const parseInteger = (value: string) => parseInt(value, 10);

const handleClassName = (element: HTMLElement | null, className: string, action: ClassnameActionMode = ClassnameActionModeOption.Remove) => {
  if (element === null) {
    return;
  }

  switch (action) {
    case ClassnameActionModeOption.Add:
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
      break;

    case ClassnameActionModeOption.Remove:
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
