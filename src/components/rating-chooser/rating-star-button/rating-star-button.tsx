import { parseInteger } from '../../../utils/utils';

type RatingStarButtonProps = {
  title: string;
  value: number;
  isChecked: boolean;
  onRatingChange: (newValue: number) => void;
  isDisabled?: boolean;
}

export default function RatingStarButton({
  title,
  value,
  isChecked,
  onRatingChange,
  isDisabled
}: RatingStarButtonProps): React.JSX.Element {
  const idValue = `${value}-star${value === 1 ? '' : 's'}`;

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onRatingChange(parseInteger(evt.target.value));
  };

  return (
    <>
      <input
        className='form__rating-input visually-hidden'
        name='rating'
        value={value}
        id={idValue}
        checked={isChecked}
        onChange={handleRatingChange}
        type='radio'
        disabled={isDisabled}
        data-testid='starButton input'
      />
      <label
        htmlFor={idValue}
        className='reviews__rating-label form__rating-label'
        title={title}
        data-testid='starButton label'
      >
        <svg className='form__star-image' width='37' height='33' data-testid='starButton img'>
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </>
  );
}
