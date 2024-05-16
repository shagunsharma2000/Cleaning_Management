// Spherical Law of Cosines

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // console.log('lat1', 'lon1', lat1, lon1);
  const Radius = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  console.log('a', a);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  console.log('c', c);

  const distance = Radius * c;
  console.log('distance', distance);

  return distance;
}

//Law of Haversines
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371e3;
//   const p1 = lat1 * Math.PI/180;
//   const p2 = lat2 * Math.PI/180;
//   const deltaLon = lon2 - lon1;
//   const deltaLambda = (deltaLon * Math.PI) / 180;
//   const d = Math.acos(
//     Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
//   ) * R;
//   return d;
// }
