export const randomPics = [
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic.png?alt=media&token=683ab6b2-dba5-41ae-b695-b70451d4e400",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic10.jpeg?alt=media&token=97cd4dcf-e11e-488c-b91b-09cafc4ed879",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic11.jpeg?alt=media&token=3862f51e-f9b7-438f-979a-43d851040bdb",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic12.jpeg?alt=media&token=bf456ad3-2269-4976-b324-98b759e4810c",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic2.jpeg?alt=media&token=562f16c2-3751-453e-9951-a5554f49247f",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic3.jpeg?alt=media&token=2613e24b-d9dc-479d-95fe-36fb165cde42",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic4.jpeg?alt=media&token=20cab154-f7bb-45a9-8852-6207befb0d59",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic5.jpeg?alt=media&token=05bbc1f3-06f3-4844-b541-17e54a4238d0",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic6.jpeg?alt=media&token=5833637d-c239-45b0-8cb1-86a01df4ce83",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic7.jpeg?alt=media&token=2325de91-bb79-4010-ad36-b1ab06a9abcd",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic8.jpeg?alt=media&token=05ca526e-f5d0-4470-a0ec-b480db8b7bf1",
  "https://firebasestorage.googleapis.com/v0/b/addonis---dev.appspot.com/o/images%2FrandomProfilePics%2FrandomProfilePic9.jpeg?alt=media&token=c24d9edf-00a7-4d1e-a55a-1f44aa861d43",
];

export const getRandomProfilePicture = () => {
  const randomIndex = Math.floor(
    Math.random() * randomPics.length
  );
  return randomPics[randomIndex];
};
