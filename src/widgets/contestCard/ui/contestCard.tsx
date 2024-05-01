import React from 'react';

interface Prize {
  prizeType: string;
  currency: string;
  prizeText: string;
}

interface User {
  id: string;
  name: string;
  organizatorRating: string;
  participatiantRating: string;
  verificationStatus: string;
  profileImage: string;
}

interface Contest {
  id: string;
  name: string;
  category: string;
  status: string;
  subcategory: string;
  previewImage: string;
  participantAmount: string;
  dateStart: string;
  dateEnd: string;
  prize: Prize;
  user: User;
}

interface ContestCardProps {
  contest: Contest;
}

export const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const {
    id,
    name,
    category,
    status,
    subcategory,
    previewImage,
    participantAmount,
    dateStart,
    dateEnd,
    prize,
    user,
  } = contest;

  return (
      <div className="contest-card" id={id}>
        <img src={previewImage} alt={name} style={{ width: '100%', height: 'auto' }} />
        <div className="card-content">
          <h3>{name}</h3>
          <p>Category: {category}</p>
          <p>Status: {status}</p>
          <p>Subcategory: {subcategory}</p>
          <p>Participants: {participantAmount}</p>
          <p>Dates: {new Date(dateStart).toLocaleDateString()} to {new Date(dateEnd).toLocaleDateString()}</p>
          <p>Prize: {prize.prizeType} - {prize.currency}</p>
          <p>Organizer: {user.name}</p>
          <img src={user.profileImage} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        </div>
      </div>
  );
};
