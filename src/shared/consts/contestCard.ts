const mockData = {
  contests: [
    {
      id: "1",
      name: "Tickle Olympics: Where Laughter Takes the Gold!",
      category: "For fun",
      status: "ACTIVE",
      subcategory: "challenges",
      previewImage: "https://img.freepik.com/darmowe-wektory/ptak-kolorowe-logo-wektor-gradientu_343694-1365.jpg",
      participantAmount: "270",
      dateStart: "2024-04-01T09:00",
      dateEnd: "2024-04-01T09:00",
      prize: {
        prizeType: "MONEY",
        currency: "USD",
        prizeText: "",
      },
      user: {
        id: "1",
        name: "John Doe",
        organizatorRating: "4.5",
        participatiantRating: "4.5",
        verificationStatus: "blogger",
        profileImage: "https://img.freepik.com/darmowe-wektory/ptak-kolorowe-logo-wektor-gradientu_343694-1365.jpg",
      },
    },
    {
      id: "2",
      name: "Tech Challenge: Innovation in AI",
      category: "Tech",
      status: "ACTIVE",
      subcategory: "Tech challenges",
      previewImage: "https://img.freepik.com/darmowe-wektory/abstrakcyjny-wzor-w-polygonalnym-stylu_23-2148417370.jpg",
      participantAmount: "150",
      dateStart: "2024-05-15T10:00",
      dateEnd: "2024-05-16T17:00",
      prize: {
        prizeType: "MONEY",
        currency: "USD",
        prizeText: "",
      },
      user: {
        id: "2",
        name: "Jane Smith",
        organizatorRating: "4.7",
        participatiantRating: "4.2",
        verificationStatus: "developer",
        profileImage: "https://img.freepik.com/darmowe-wektory/czlowiek-ludzie-avatar-czlowiek-ludzie-avatar-w-stylu-kreskowym_24877-57276.jpg",
      },
    },
  ],
  page: 1,
  size: 10,
  totalPages: 5,
  totalItems: 45,
};

export default mockData;
