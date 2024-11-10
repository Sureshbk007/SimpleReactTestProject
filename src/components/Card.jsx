function Card({ image, title }) {
  return (
    <div className="border rounded-lg hover:shadow-xl cursor-pointer">
      <div className="w-full h-48">
        <img
          src={image}
          alt="blog image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="m-4 h-24">
        <h2 className="line-clamp-4">{title}</h2>
      </div>
    </div>
  );
}

export default Card;
