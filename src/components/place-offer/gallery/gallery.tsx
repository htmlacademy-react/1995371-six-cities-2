type GalleryProps = {
  imageUrls: string[];
}

export default function Gallery({imageUrls}: GalleryProps): React.JSX.Element {
  return (
    <div className="offer__gallery">
      {imageUrls.map((url) => (
        <div className="offer__image-wrapper" key={url}>
          <img className="offer__image" src={url} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}
