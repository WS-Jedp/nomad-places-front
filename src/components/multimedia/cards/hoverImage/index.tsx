export const MultimediaHoverCardImage: React.FC<{ url: string }> = ({ url }) => {
    return (
      <img className="w-full h-full hover:scale-110 transition-all ease-in-out duration-1000" style={{ objectFit: "cover" }} src={url}>
      </img>
    );
  };
  