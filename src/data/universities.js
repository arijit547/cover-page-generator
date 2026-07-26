export const universities = [
  {
    id: 'sust',
    name: 'Shahjalal University of Science and Technology',
    shortName: 'SUST',
    logoUrl: '/logos/sust.svg',
    colors: {
      primary: '#C9A227',
      accent: '#E6007E',
      text: '#111111',
    },
  },
];

export function getUniversityById(id) {
  return universities.find((u) => u.id === id) ?? universities[0];
}
