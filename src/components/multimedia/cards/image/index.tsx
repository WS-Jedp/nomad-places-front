export const MultimediaCardImage: React.FC<{ url: string }> = ({ url }) => {
  return (
    <img className="w-full h-full" style={{ objectFit: "cover" }} src={url}>
    </img>
  );
};
