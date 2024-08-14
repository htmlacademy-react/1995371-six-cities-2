import { useCallback, useState } from 'react';

import { ReviewInitStateValue, ReviewLength } from '../../../const/review-const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postNewOfferReviewAction } from '../../../store/api-action';
import { isCommentsLengthValid } from '../../../utils/offers-utils';
import { getCurrentOffer, getIsFormDisabled } from '../../../store/data-process/data-process.selectors';
import RatingChooser from '../../rating-chooser/rating-chooser';

export default function ReviewForm(): React.JSX.Element {

  const [reviewData, setReviewData] = useState({...ReviewInitStateValue});

  const dispatch = useAppDispatch();
  const currentOfferId = useAppSelector(getCurrentOffer)?.id as string;
  const isFormDisabled = useAppSelector(getIsFormDisabled);
  const isDataValid = !!reviewData.rating && isCommentsLengthValid(reviewData.comment);

  const handleRatingChange = useCallback((newRatingValue: number) => {
    setReviewData({...reviewData, rating: newRatingValue});
  }, [reviewData]);

  const handleReviewTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({...reviewData, comment: evt.target.value});
  };

  const clearReviewForm = () => {
    setReviewData({...ReviewInitStateValue});
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isDataValid) {
      return;
    }

    dispatch(postNewOfferReviewAction({
      offerId: currentOfferId,
      reviewData,
      onSuccess: clearReviewForm
    }));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
      data-testid='review form element'
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingChooser
        currentRatingValue={reviewData.rating}
        onRatingChange={handleRatingChange}
        isDisabled={isFormDisabled}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={reviewData.comment}
        minLength={ReviewLength.MinLength}
        maxLength={ReviewLength.MaxLength}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewTextChange}
        disabled={isFormDisabled}
        data-testid='review text element'
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help" data-testid='help text element'>
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isFormDisabled || !isDataValid}>Submit</button>
      </div>
    </form>
  );
}
