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

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomArrayItems = <T>(array: T[], itemsAmount: number): T[] => {
  const arrayShallowCopy = array.slice();
  shuffleArray(arrayShallowCopy);
  return arrayShallowCopy.slice(0, itemsAmount);
};

export {
  handleClassName,
  roundToInteger,
  parseInteger,
  shuffleArray,
  getRandomArrayItems
};
