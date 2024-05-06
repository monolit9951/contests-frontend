import PrizeIcon from 'shared/assets/icons/Trophy.svg?react';

const mockData = {
  date: "2024-05-10",
  name: "John Doe",
  rating: "4.5",
  category: { des: "Programming", color: "#FF5733" },
  prize: {
    img: PrizeIcon,
    description: "Win $1000 and a trophy",
  },
  title: "Coding Challenge",
  tags: ["React", "JavaScript", "Web Development"],
  user: {
    name: "John Doe",
    avatar: "path/to/avatar/image.png",
    isVerified: true,
    isTop: "Top Performer",
    rate: "4.5",
  },
};

export default mockData;
