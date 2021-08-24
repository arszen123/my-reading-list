export type Book = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}
export type VolumeInfo = {
  title: string;
  subtitle: string;
  authors?: (string)[] | null;
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers?: (IndustryIdentifiersEntity)[] | null;
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories?: (string)[] | null;
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
export type IndustryIdentifiersEntity = {
  type: string;
  identifier: string;
}
export type ReadingModes = {
  text: boolean;
  image: boolean;
}
export type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
export type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
}
export type SaleInfo = {
  country: string;
  saleability: string;
  isEbook: boolean;
}
export type AccessInfo = {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubOrPdf;
  pdf: EpubOrPdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
export type EpubOrPdf = {
  isAvailable: boolean;
}
export type SearchInfo = {
  textSnippet: string;
}
