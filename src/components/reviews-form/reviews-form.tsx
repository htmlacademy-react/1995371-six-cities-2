import { useState } from 'react';

import RatingChooser from '../rating-chooser/rating-chooser';

type ReviewFormProps = {
  offerId: string;
}

export default function ReviewForm({offerId}: ReviewFormProps): React.JSX.Element {
  const getInitState = () => ({
    offerId: offerId,
    rating: 0,
    reviewText: '',
  });

  const [reviewsData, setReviewData] = useState(getInitState());

  if (offerId !== reviewsData.offerId) {
    setReviewData(getInitState());
  }

  const handleRatingChange = (newRatingValue: number) => {
    setReviewData({...reviewsData, rating: newRatingValue});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingChooser
        currentRatingValue={reviewsData.rating}
        onRatingChange={handleRatingChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={reviewsData.reviewText}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
          setReviewData({...reviewsData, reviewText: evt.target.value});
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
