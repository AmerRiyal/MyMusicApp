import LocalizedStrings from 'react-native-localization';

export default new LocalizedStrings({
  en: {
    //English
    TabBar: {
      Tracks: 'Tracks',
      Artists: 'Artists',
      Albums: 'Albums',
      Search: 'Search',
    },
    ErrorText:'Sorry, Something went wrong try again later !!',
    Reload:"Reload",
    ArtistTracks:"Artists Tracks",
    YouHaveToSelect:"You have to select",
    SearchPlaceholder:"Search for tracks...",
    EmptySearchText:"no track or data found",
    Lyrics:"Lyrics",
    noLyrics:"Sorry this track has no lyrics"
  },
  ar: {
    TabBar: {
      Tracks: 'الأغاني',
      Artists: 'الفنانين',
      Albums: 'ألبومات',
      Search: 'البحث',
    },
    ErrorText:'عذرا ، حدث خطأ ما حاول مرة أخرى في وقت لاحق!!',
    Reload:"إعادة تحميل",
    ArtistTracks:"الأغاني",
    YouHaveToSelect:"عليك أن تختار",
    SearchPlaceholder:"البحث عن أغاني ...",
    Lyrics:"كلمات",
    noLyrics:"آسف هذه الاغنية لا يوجد لديها كلمات"
  },
});
